import {
  b as a
} from "./_deps/MIBXW62M.js";
import {
  d as l,
  e as d
} from "./_deps/TRX5I57W.js";
import {
  a as o
} from "./_deps/Q5VBJYR5.js";

// convex/codaSync.ts
var C = d({
  args: {},
  handler: /* @__PURE__ */ o(async (n) => {
    let r = process.env.CODA_API_TOKEN, c = process.env.CODA_DOC_ID, i = process.env.CODA_TABLE_ID;
    if (!r || !c || !i)
      return console.error("Coda credentials not configured"), { success: !1, error: "Coda credentials not configured" };
    try {
      let s = await fetch(
        `https://coda.io/apis/v1/docs/${c}/tables/${i}/rows`,
        {
          headers: {
            Authorization: `Bearer ${r}`
          }
        }
      );
      if (!s.ok)
        throw new Error(`Coda API error: ${s.statusText}`);
      let t = (await s.json()).items.map((e) => ({
        codaId: e.id,
        title: e.values["c-title"] || e.values.Title || "",
        description: e.values["c-description"] || e.values.Description || "",
        date: e.values["c-date"] || e.values.Date || "",
        time: e.values["c-time"] || e.values.Time || "",
        location: e.values["c-location"] || e.values.Location || "",
        type: e.values["c-type"] || e.values.Type || "Online"
      }));
      return await n.runMutation(a.meetings.syncMeetingsFromCoda, {
        meetings: t
      }), console.log(`Successfully synced ${t.length} meetings from Coda`), { success: !0, synced: t.length };
    } catch (s) {
      return console.error("Error syncing from Coda:", s), { success: !1, error: String(s) };
    }
  }, "handler")
}), p = l({
  args: {},
  handler: /* @__PURE__ */ o(async (n) => await n.runAction(a.codaSync.syncMeetingsFromCodaAction, {}), "handler")
});
export {
  p as manualSyncFromCoda,
  C as syncMeetingsFromCodaAction
};
//# sourceMappingURL=codaSync.js.map
