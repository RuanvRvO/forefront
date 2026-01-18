import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

// Query to get all upcoming meetings, ordered by date
export const listMeetings = query({
  args: {},
  handler: async (ctx) => {
    const meetings = await ctx.db
      .query("meetings")
      .order("desc")
      .collect();

    return meetings;
  },
});

// Mutation to add a new meeting
export const addMeeting = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    type: v.union(v.literal("Online"), v.literal("In-Person")),
    codaId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const meetingId = await ctx.db.insert("meetings", {
      title: args.title,
      description: args.description,
      date: args.date,
      time: args.time,
      location: args.location,
      type: args.type,
      codaId: args.codaId,
    });
    return meetingId;
  },
});

// Mutation to update an existing meeting
export const updateMeeting = mutation({
  args: {
    id: v.id("meetings"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    date: v.optional(v.string()),
    time: v.optional(v.string()),
    location: v.optional(v.string()),
    type: v.optional(v.union(v.literal("Online"), v.literal("In-Person"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Mutation to delete a meeting
export const deleteMeeting = mutation({
  args: {
    id: v.id("meetings"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Internal mutation to sync meetings from Coda (bulk upsert)
// This can only be called by cron jobs or internal actions
export const syncMeetingsFromCoda = internalMutation({
  args: {
    meetings: v.array(
      v.object({
        codaId: v.string(),
        title: v.string(),
        description: v.string(),
        date: v.string(),
        time: v.string(),
        location: v.string(),
        type: v.union(v.literal("Online"), v.literal("In-Person")),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Get all existing meetings with Coda IDs
    const existingMeetings = await ctx.db.query("meetings").collect();

    const codaIds = new Set(args.meetings.map((m) => m.codaId));

    // Delete meetings that are no longer in Coda
    for (const meeting of existingMeetings) {
      if (meeting.codaId && !codaIds.has(meeting.codaId)) {
        await ctx.db.delete(meeting._id);
      }
    }

    // Add or update meetings from Coda
    for (const meeting of args.meetings) {
      const existing = existingMeetings.find((m) => m.codaId === meeting.codaId);

      if (existing) {
        // Update existing meeting
        await ctx.db.patch(existing._id, {
          title: meeting.title,
          description: meeting.description,
          date: meeting.date,
          time: meeting.time,
          location: meeting.location,
          type: meeting.type,
        });
      } else {
        // Insert new meeting
        await ctx.db.insert("meetings", {
          title: meeting.title,
          description: meeting.description,
          date: meeting.date,
          time: meeting.time,
          location: meeting.location,
          type: meeting.type,
          codaId: meeting.codaId,
        });
      }
    }

    return { synced: args.meetings.length };
  },
});
