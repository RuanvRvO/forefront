import {
  a as b,
  b as t
} from "./_deps/TRX5I57W.js";
import {
  a as i,
  e as s
} from "./_deps/Q5VBJYR5.js";

// convex/emailSubscribers.ts
var m = t({
  args: {
    email: s.string(),
    source: s.optional(s.string())
  },
  handler: /* @__PURE__ */ i(async (e, r) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email))
      throw new Error("Invalid email address");
    if (await e.db.query("emailSubscribers").withIndex("by_email", (c) => c.eq("email", r.email)).first())
      throw new Error("This email is already subscribed");
    return { success: !0, subscriberId: await e.db.insert("emailSubscribers", {
      email: r.email,
      subscribedAt: Date.now(),
      source: r.source || "landing_page"
    }) };
  }, "handler")
}), d = b({
  args: {},
  handler: /* @__PURE__ */ i(async (e) => await e.db.query("emailSubscribers").order("desc").collect(), "handler")
}), w = t({
  args: {
    email: s.string()
  },
  handler: /* @__PURE__ */ i(async (e, r) => {
    let a = await e.db.query("emailSubscribers").withIndex("by_email", (n) => n.eq("email", r.email)).first();
    if (!a)
      throw new Error("Email not found");
    return await e.db.delete(a._id), { success: !0 };
  }, "handler")
});
export {
  d as listSubscribers,
  m as subscribe,
  w as unsubscribe
};
//# sourceMappingURL=emailSubscribers.js.map
