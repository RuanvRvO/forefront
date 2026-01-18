import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Subscribe a new email to the mailing list
export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email address");
    }

    // Check if email already exists
    const existing = await ctx.db
      .query("emailSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("This email is already subscribed");
    }

    // Subscribe the email
    const subscriberId = await ctx.db.insert("emailSubscribers", {
      email: args.email,
      subscribedAt: Date.now(),
      source: args.source || "landing_page",
    });

    return { success: true, subscriberId };
  },
});

// Get all email subscribers (for admin use)
export const listSubscribers = query({
  args: {},
  handler: async (ctx) => {
    const subscribers = await ctx.db
      .query("emailSubscribers")
      .order("desc")
      .collect();

    return subscribers;
  },
});

// Unsubscribe an email
export const unsubscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("emailSubscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!subscriber) {
      throw new Error("Email not found");
    }

    await ctx.db.delete(subscriber._id);
    return { success: true };
  },
});
