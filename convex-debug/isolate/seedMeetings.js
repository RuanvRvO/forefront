import {
  b as n
} from "./_deps/TRX5I57W.js";
import {
  a as t
} from "./_deps/Q5VBJYR5.js";

// convex/seedMeetings.ts
var a = n({
  args: {},
  handler: /* @__PURE__ */ t(async (i) => {
    let e = [
      {
        title: "Monday Mindset Session",
        description: "Start your week with intention. Goal-setting, positive mindset, and weekly planning.",
        date: "January 13, 2026",
        time: "7:00 PM - 8:30 PM",
        location: "Online (Zoom)",
        type: "Online"
      },
      {
        title: "Wednesday Wellness Check-In",
        description: "Mid-week focus on mental health, stress management, and self-care practices.",
        date: "January 15, 2026",
        time: "6:30 PM - 8:00 PM",
        location: "Community Center, Room 204",
        type: "In-Person"
      },
      {
        title: "Friday Wins & Reflections",
        description: "Celebrate the week&apos;s achievements and reflect on lessons learned.",
        date: "January 17, 2026",
        time: "5:00 PM - 6:30 PM",
        location: "Online (Zoom)",
        type: "Online"
      },
      {
        title: "Saturday Workshop: Building Resilience",
        description: "Extended workshop with guest speaker Dr. Sarah Mitchell on developing mental resilience.",
        date: "January 18, 2026",
        time: "10:00 AM - 1:00 PM",
        location: "Community Center, Main Hall",
        type: "In-Person"
      },
      {
        title: "Monday Mindset Session",
        description: "Weekly session on goal-setting and positive mindset.",
        date: "January 20, 2026",
        time: "7:00 PM - 8:30 PM",
        location: "Online (Zoom)",
        type: "Online"
      },
      {
        title: "Book Club: Atomic Habits Discussion",
        description: "Join us to discuss key takeaways from Atomic Habits by James Clear.",
        date: "January 22, 2026",
        time: "7:00 PM - 8:30 PM",
        location: "Online (Zoom)",
        type: "Online"
      },
      {
        title: "Monthly Deep Dive: Leadership Skills",
        description: "Extended session exploring leadership principles and personal accountability.",
        date: "February 1, 2026",
        time: "10:00 AM - 2:00 PM",
        location: "Community Center, Main Hall",
        type: "In-Person"
      },
      {
        title: "Evening Reflection Circle",
        description: "Guided reflection and gratitude practice to close out the week.",
        date: "February 7, 2026",
        time: "7:00 PM - 8:30 PM",
        location: "Online (Zoom)",
        type: "Online"
      }
    ];
    for (let o of e)
      await i.db.insert("meetings", o);
    return { success: !0, count: e.length };
  }, "handler")
});
export {
  a as seedInitialMeetings
};
//# sourceMappingURL=seedMeetings.js.map
