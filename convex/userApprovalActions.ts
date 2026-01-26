"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Resend } from "resend";

const ADMIN_EMAIL = "ruanvanoudtshoorn@gmail.com";

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
      await ctx.runAction(internal.userApprovalActions.sendApprovalEmail, {
        email: args.email,
        approvalToken: pendingUser.approvalToken,
      });
    }

    return null;
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
  handler: async (ctx, args): Promise<{ success: boolean; message: string; email?: string }> => {
    // Get the pending user by token
    type PendingUser = {
      _id: string;
      userId: string;
      email: string;
      status: "pending" | "approved" | "declined";
      requestedAt: number;
      reviewedAt?: number;
      approvalToken: string;
    } | null;
    
    const pendingUser: PendingUser = await ctx.runQuery(internal.userApproval.getPendingUserByToken, {
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
    const newStatus: "approved" | "declined" = args.action === "approve" ? "approved" : "declined";
    await ctx.runMutation(internal.userApproval.updateApprovalStatus, {
      pendingUserId: pendingUser._id as any,
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
