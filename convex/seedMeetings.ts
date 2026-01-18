import { mutation } from "./_generated/server";

// Utility function to seed initial meetings for testing
// Run this once from the Convex dashboard to populate initial data
export const seedInitialMeetings = mutation({
  args: {},
  handler: async (ctx) => {
    const initialMeetings = [
      {
        title: 'Monday Mindset Session',
        description: 'Start your week with intention. Goal-setting, positive mindset, and weekly planning.',
        date: 'January 13, 2026',
        time: '7:00 PM - 8:30 PM',
        location: 'Online (Zoom)',
        type: 'Online' as const,
      },
      {
        title: 'Wednesday Wellness Check-In',
        description: 'Mid-week focus on mental health, stress management, and self-care practices.',
        date: 'January 15, 2026',
        time: '6:30 PM - 8:00 PM',
        location: 'Community Center, Room 204',
        type: 'In-Person' as const,
      },
      {
        title: 'Friday Wins & Reflections',
        description: 'Celebrate the week&apos;s achievements and reflect on lessons learned.',
        date: 'January 17, 2026',
        time: '5:00 PM - 6:30 PM',
        location: 'Online (Zoom)',
        type: 'Online' as const,
      },
      {
        title: 'Saturday Workshop: Building Resilience',
        description: 'Extended workshop with guest speaker Dr. Sarah Mitchell on developing mental resilience.',
        date: 'January 18, 2026',
        time: '10:00 AM - 1:00 PM',
        location: 'Community Center, Main Hall',
        type: 'In-Person' as const,
      },
      {
        title: 'Monday Mindset Session',
        description: 'Weekly session on goal-setting and positive mindset.',
        date: 'January 20, 2026',
        time: '7:00 PM - 8:30 PM',
        location: 'Online (Zoom)',
        type: 'Online' as const,
      },
      {
        title: 'Book Club: Atomic Habits Discussion',
        description: 'Join us to discuss key takeaways from Atomic Habits by James Clear.',
        date: 'January 22, 2026',
        time: '7:00 PM - 8:30 PM',
        location: 'Online (Zoom)',
        type: 'Online' as const,
      },
      {
        title: 'Monthly Deep Dive: Leadership Skills',
        description: 'Extended session exploring leadership principles and personal accountability.',
        date: 'February 1, 2026',
        time: '10:00 AM - 2:00 PM',
        location: 'Community Center, Main Hall',
        type: 'In-Person' as const,
      },
      {
        title: 'Evening Reflection Circle',
        description: 'Guided reflection and gratitude practice to close out the week.',
        date: 'February 7, 2026',
        time: '7:00 PM - 8:30 PM',
        location: 'Online (Zoom)',
        type: 'Online' as const,
      },
    ];

    for (const meeting of initialMeetings) {
      await ctx.db.insert("meetings", meeting);
    }

    return { success: true, count: initialMeetings.length };
  },
});
