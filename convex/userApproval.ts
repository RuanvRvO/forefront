import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";

// Helper function to get user's email from authAccounts table
async function getUserEmailFromAuth(ctx: any, userId: any): Promise<string | null> {
  // Look up the user's email from the authAccounts table
  // Password provider stores email as providerAccountId
  const authAccount = await ctx.db
    .query("authAccounts")
    .filter((q: any) => q.eq(q.field("userId"), userId))
    .first();

  if (authAccount?.providerAccountId) {
    return authAccount.providerAccountId;
  }
  return null;
}

// Query to check if a user is approved for admin access
export const getUserApprovalStatus = query({
  args: {},
  returns: v.union(
    v.object({
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
      email: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    try {
      // Get the authenticated user ID
      const userId = await getAuthUserId(ctx);
      if (!userId) {
        return null;
      }

      // Get the user's email from authAccounts
      const email = await getUserEmailFromAuth(ctx, userId);
      if (!email) {
        return null;
      }

      // Check if there's a pending user record by email
      const pendingUser = await ctx.db
        .query("pendingUsers")
        .withIndex("by_email", (q) => q.eq("email", email))
        .unique();

      if (!pendingUser) {
        return null;
      }

      return {
        status: pendingUser.status,
        email: pendingUser.email,
      };
    } catch (error) {
      console.error("Error in getUserApprovalStatus:", error);
      return null;
    }
  },
});

// Internal mutation to create a pending user record
// Auto-approves the first user if no approved users exist
export const createPendingUser = internalMutation({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  returns: v.object({
    pendingUserId: v.id("pendingUsers"),
    isFirstUser: v.boolean(),
  }),
  handler: async (ctx, args) => {
    // Check if this user already has a pending record
    const existing = await ctx.db
      .query("pendingUsers")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existing) {
      return { pendingUserId: existing._id, isFirstUser: false };
    }

    // Check if there are any existing approved users
    const approvedUsers = await ctx.db
      .query("pendingUsers")
      .withIndex("by_status", (q) => q.eq("status", "approved"))
      .take(1);

    const isFirstUser = approvedUsers.length === 0;

    // Generate a secure approval token
    const approvalToken = crypto.randomUUID();

    const pendingUserId = await ctx.db.insert("pendingUsers", {
      userId: args.userId,
      email: args.email,
      // Auto-approve if this is the first user, otherwise pending
      status: isFirstUser ? "approved" : "pending",
      requestedAt: Date.now(),
      reviewedAt: isFirstUser ? Date.now() : undefined,
      approvalToken,
    });

    return { pendingUserId, isFirstUser };
  },
});

// Internal query to get pending user by token
export const getPendingUserByToken = internalQuery({
  args: {
    token: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("pendingUsers"),
      userId: v.id("users"),
      email: v.string(),
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
      requestedAt: v.number(),
      reviewedAt: v.optional(v.number()),
      approvalToken: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const pendingUser = await ctx.db
      .query("pendingUsers")
      .withIndex("by_approvalToken", (q) => q.eq("approvalToken", args.token))
      .unique();

    return pendingUser;
  },
});

// Internal mutation to update user approval status
export const updateApprovalStatus = internalMutation({
  args: {
    pendingUserId: v.id("pendingUsers"),
    status: v.union(v.literal("approved"), v.literal("declined")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.pendingUserId, {
      status: args.status,
      reviewedAt: Date.now(),
    });
    return null;
  },
});

// Internal query to get pending user by email
export const getPendingUserByEmail = internalQuery({
  args: {
    email: v.string(),
  },
  returns: v.union(
    v.object({
      _id: v.id("pendingUsers"),
      userId: v.id("users"),
      email: v.string(),
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
      requestedAt: v.number(),
      reviewedAt: v.optional(v.number()),
      approvalToken: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const pendingUser = await ctx.db
      .query("pendingUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    return pendingUser;
  },
});

// ============================================
// PUBLIC QUERIES AND MUTATIONS FOR ADMIN PANEL
// ============================================

// Query to list all pending users (for admin approval)
export const listPendingUsers = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("pendingUsers"),
      email: v.string(),
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
      requestedAt: v.number(),
      reviewedAt: v.optional(v.number()),
    })
  ),
  handler: async (ctx) => {
    // Check if the current user is approved
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const userEmail = await getUserEmailFromAuth(ctx, userId);
    if (!userEmail) {
      return [];
    }

    const currentUser = await ctx.db
      .query("pendingUsers")
      .withIndex("by_email", (q) => q.eq("email", userEmail))
      .unique();

    // Only approved users can see the list
    if (!currentUser || currentUser.status !== "approved") {
      return [];
    }

    // Get all pending users
    const pendingUsers = await ctx.db
      .query("pendingUsers")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();

    return pendingUsers.map((user) => ({
      _id: user._id,
      email: user.email,
      status: user.status,
      requestedAt: user.requestedAt,
      reviewedAt: user.reviewedAt,
    }));
  },
});

// Query to list all users (for admin to see all users)
export const listAllUsers = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("pendingUsers"),
      email: v.string(),
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
      requestedAt: v.number(),
      reviewedAt: v.optional(v.number()),
    })
  ),
  handler: async (ctx) => {
    // Check if the current user is approved
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const userEmail = await getUserEmailFromAuth(ctx, userId);
    if (!userEmail) {
      return [];
    }

    const currentUser = await ctx.db
      .query("pendingUsers")
      .withIndex("by_email", (q) => q.eq("email", userEmail))
      .unique();

    // Only approved users can see the list
    if (!currentUser || currentUser.status !== "approved") {
      return [];
    }

    // Get all users
    const allUsers = await ctx.db
      .query("pendingUsers")
      .order("desc")
      .collect();

    return allUsers.map((user) => ({
      _id: user._id,
      email: user.email,
      status: user.status,
      requestedAt: user.requestedAt,
      reviewedAt: user.reviewedAt,
    }));
  },
});

// Mutation to approve a user (called by admins from the admin panel)
export const approveUserFromAdmin = mutation({
  args: {
    pendingUserId: v.id("pendingUsers"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Check if the current user is approved
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const userEmail = await getUserEmailFromAuth(ctx, userId);
    if (!userEmail) {
      throw new Error("Not authenticated");
    }

    const currentUser = await ctx.db
      .query("pendingUsers")
      .withIndex("by_email", (q) => q.eq("email", userEmail))
      .unique();

    if (!currentUser || currentUser.status !== "approved") {
      throw new Error("Not authorized to approve users");
    }

    // Update the user's status
    await ctx.db.patch(args.pendingUserId, {
      status: "approved",
      reviewedAt: Date.now(),
    });

    return null;
  },
});

// Mutation to decline a user (called by admins from the admin panel)
export const declineUserFromAdmin = mutation({
  args: {
    pendingUserId: v.id("pendingUsers"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Check if the current user is approved
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const userEmail = await getUserEmailFromAuth(ctx, userId);
    if (!userEmail) {
      throw new Error("Not authenticated");
    }

    const currentUser = await ctx.db
      .query("pendingUsers")
      .withIndex("by_email", (q) => q.eq("email", userEmail))
      .unique();

    if (!currentUser || currentUser.status !== "approved") {
      throw new Error("Not authorized to decline users");
    }

    // Update the user's status
    await ctx.db.patch(args.pendingUserId, {
      status: "declined",
      reviewedAt: Date.now(),
    });

    return null;
  },
});

// Mutation to ensure a pending user record exists for the current user
// This serves as a fallback if the auth callback didn't run properly
// Auto-approves if this is the first user (no existing users)
export const ensurePendingUserRecord = mutation({
  args: {},
  returns: v.union(
    v.object({
      status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
      email: v.string(),
      isNewRecord: v.boolean(),
    }),
    v.null()
  ),
  handler: async (ctx) => {
    // Get the authenticated user ID
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    // Get the user's email from authAccounts table
    const email = await getUserEmailFromAuth(ctx, userId);
    if (!email) {
      return null;
    }

    // Check if a record already exists
    const existing = await ctx.db
      .query("pendingUsers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      return {
        status: existing.status,
        email: existing.email,
        isNewRecord: false,
      };
    }

    // No existing record - need to create one
    // Check if there are any existing users in the pendingUsers table
    const existingUsers = await ctx.db
      .query("pendingUsers")
      .take(1);

    const isFirstUser = existingUsers.length === 0;

    // Generate a secure approval token
    const approvalToken = crypto.randomUUID();

    // Create the pending user record
    // Auto-approve if this is the first user
    await ctx.db.insert("pendingUsers", {
      userId: userId,
      email: email,
      status: isFirstUser ? "approved" : "pending",
      requestedAt: Date.now(),
      reviewedAt: isFirstUser ? Date.now() : undefined,
      approvalToken,
    });

    // If not the first user, send approval email to admin
    if (!isFirstUser) {
      await ctx.scheduler.runAfter(0, internal.userApprovalActions.sendApprovalEmail, {
        email: email,
        approvalToken: approvalToken,
      });
    }

    const status: "approved" | "pending" = isFirstUser ? "approved" : "pending";
    return {
      status,
      email: email,
      isNewRecord: true,
    };
  },
});
