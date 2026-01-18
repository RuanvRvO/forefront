import {
  a as l,
  b as d,
  c
} from "./_deps/TRX5I57W.js";
import {
  a as o,
  e as t
} from "./_deps/Q5VBJYR5.js";

// convex/meetings.ts
var y = l({
  args: {},
  handler: /* @__PURE__ */ o(async (n) => await n.db.query("meetings").order("desc").collect(), "handler")
}), I = d({
  args: {
    title: t.string(),
    description: t.string(),
    date: t.string(),
    time: t.string(),
    location: t.string(),
    type: t.union(t.literal("Online"), t.literal("In-Person")),
    codaId: t.optional(t.string())
  },
  handler: /* @__PURE__ */ o(async (n, i) => await n.db.insert("meetings", {
    title: i.title,
    description: i.description,
    date: i.date,
    time: i.time,
    location: i.location,
    type: i.type,
    codaId: i.codaId
  }), "handler")
}), u = d({
  args: {
    id: t.id("meetings"),
    title: t.optional(t.string()),
    description: t.optional(t.string()),
    date: t.optional(t.string()),
    time: t.optional(t.string()),
    location: t.optional(t.string()),
    type: t.optional(t.union(t.literal("Online"), t.literal("In-Person")))
  },
  handler: /* @__PURE__ */ o(async (n, i) => {
    let { id: a, ...s } = i;
    await n.db.patch(a, s);
  }, "handler")
}), b = d({
  args: {
    id: t.id("meetings")
  },
  handler: /* @__PURE__ */ o(async (n, i) => {
    await n.db.delete(i.id);
  }, "handler")
}), f = c({
  args: {
    meetings: t.array(
      t.object({
        codaId: t.string(),
        title: t.string(),
        description: t.string(),
        date: t.string(),
        time: t.string(),
        location: t.string(),
        type: t.union(t.literal("Online"), t.literal("In-Person"))
      })
    )
  },
  handler: /* @__PURE__ */ o(async (n, i) => {
    let a = await n.db.query("meetings").collect(), s = new Set(i.meetings.map((e) => e.codaId));
    for (let e of a)
      e.codaId && !s.has(e.codaId) && await n.db.delete(e._id);
    for (let e of i.meetings) {
      let r = a.find((g) => g.codaId === e.codaId);
      r ? await n.db.patch(r._id, {
        title: e.title,
        description: e.description,
        date: e.date,
        time: e.time,
        location: e.location,
        type: e.type
      }) : await n.db.insert("meetings", {
        title: e.title,
        description: e.description,
        date: e.date,
        time: e.time,
        location: e.location,
        type: e.type,
        codaId: e.codaId
      });
    }
    return { synced: i.meetings.length };
  }, "handler")
});
export {
  I as addMeeting,
  b as deleteMeeting,
  y as listMeetings,
  f as syncMeetingsFromCoda,
  u as updateMeeting
};
//# sourceMappingURL=meetings.js.map
