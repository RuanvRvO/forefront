import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    // The identity email is available directly
    const email = identity.email;
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
  },
});

// Internal mutation to create a pending user record
export const createPendingUser = internalMutation({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  returns: v.id("pendingUsers"),
  handler: async (ctx, args) => {
    // Check if this user already has a pending record
    const existing = await ctx.db
      .query("pendingUsers")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existing) {
      return existing._id;
    }

    // Generate a secure approval token
    const approvalToken = crypto.randomUUID();

    const pendingUserId = await ctx.db.insert("pendingUsers", {
      userId: args.userId,
      email: args.email,
      status: "pending",
      requestedAt: Date.now(),
      approvalToken,
    });

    return pendingUserId;
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
