import {
  a as u
} from "./_deps/MIBXW62M.js";
import {
  d as o
} from "./_deps/HCQKE6P2.js";
import {
  a as i,
  b as m,
  d
} from "./_deps/TRX5I57W.js";
import {
  a as s,
  e as t
} from "./_deps/Q5VBJYR5.js";

// convex/myFunctions.ts
var g = i({
  // Validators for arguments.
  args: {
    count: t.number()
  },
  // Query implementation.
  handler: /* @__PURE__ */ s(async (e, r) => {
    let n = await e.db.query("numbers").order("desc").take(r.count), a = await o(e);
    return {
      viewer: (a === null ? null : await e.db.get("users", a))?.email ?? null,
      numbers: n.reverse().map((l) => l.value)
    };
  }, "handler")
}), v = m({
  // Validators for arguments.
  args: {
    value: t.number()
  },
  // Mutation implementation.
  handler: /* @__PURE__ */ s(async (e, r) => {
    let n = await e.db.insert("numbers", { value: r.value });
    console.log("Added new document with id:", n);
  }, "handler")
}), f = d({
  // Validators for arguments.
  args: {
    first: t.number(),
    second: t.string()
  },
  // Action implementation.
  handler: /* @__PURE__ */ s(async (e, r) => {
    let n = await e.runQuery(u.myFunctions.listNumbers, {
      count: 10
    });
    console.log(n), await e.runMutation(u.myFunctions.addNumber, {
      value: r.first
    });
  }, "handler")
});
export {
  v as addNumber,
  g as listNumbers,
  f as myAction
};
//# sourceMappingURL=myFunctions.js.map
