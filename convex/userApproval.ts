"use node";

import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { Resend } from "resend";

const ADMIN_EMAIL = "ruanvanoudtshoorn@gmail.com";

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

    // Get the user from the users table
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .take(1);

    if (users.length === 0) {
      return null;
    }

    const user = users[0];

    // Check if there's a pending user record
    const pendingUser = await ctx.db
      .query("pendingUsers")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
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

// Internal action to send approval email
export const sendApprovalEmail = internalAction({
  args: {
    email: v.string(),
    approvalToken: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get the site URL from environment or use default
    const siteUrl = process.env.CONVEX_SITE_URL || process.env.NEXT_PUBLIC_CONVEX_URL?.replace(".convex.cloud", ".convex.site") || "http://localhost:3000";

    const approveUrl = `${siteUrl}/approve-user?token=${args.approvalToken}&action=approve`;
    const declineUrl = `${siteUrl}/approve-user?token=${args.approvalToken}&action=decline`;

    await resend.emails.send({
      from: "Forefront Ministries <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: "New User Access Request - Forefront Ministries",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">New User Access Request</h2>
          <p>A new user has requested access to the Forefront Ministries admin panel:</p>
          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Email:</strong> ${args.email}</p>
          </div>
          <p>Please review this request:</p>
          <div style="margin: 20px 0;">
            <a href="${approveUrl}" style="display: inline-block; background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px;">
              ✓ Approve Access
            </a>
            <a href="${declineUrl}" style="display: inline-block; background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              ✗ Decline Access
            </a>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            This link will expire when a decision is made.
          </p>
        </div>
      `,
    });

    return null;
  },
});

// Action to handle new user sign-up (called from auth callback)
export const handleNewUserSignUp = internalAction({
  args: {
    userId: v.id("users"),
    email: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Create the pending user record
    await ctx.runMutation(internal.userApproval.createPendingUser, {
      userId: args.userId,
      email: args.email,
    });

    // Get the approval token
    const pendingUser = await ctx.runQuery(internal.userApproval.getPendingUserByEmail, {
      email: args.email,
    });

    if (pendingUser) {
      // Send the approval email
      await ctx.runAction(internal.userApproval.sendApprovalEmail, {
        email: args.email,
        approvalToken: pendingUser.approvalToken,
      });
    }

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

// Action to approve or decline a user via HTTP endpoint
export const processApproval = internalAction({
  args: {
    token: v.string(),
    action: v.union(v.literal("approve"), v.literal("decline")),
  },
  returns: v.object({
    success: v.boolean(),
    message: v.string(),
    email: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    // Get the pending user by token
    const pendingUser = await ctx.runQuery(internal.userApproval.getPendingUserByToken, {
      token: args.token,
    });

    if (!pendingUser) {
      return {
        success: false,
        message: "Invalid or expired approval link.",
      };
    }

    if (pendingUser.status !== "pending") {
      return {
        success: false,
        message: `This user has already been ${pendingUser.status}.`,
      };
    }

    // Update the status
    const newStatus = args.action === "approve" ? "approved" : "declined";
    await ctx.runMutation(internal.userApproval.updateApprovalStatus, {
      pendingUserId: pendingUser._id,
      status: newStatus,
    });

    return {
      success: true,
      message: args.action === "approve" 
        ? `User ${pendingUser.email} has been approved for admin access.`
        : `User ${pendingUser.email} has been declined.`,
      email: pendingUser.email,
    };
  },
});
