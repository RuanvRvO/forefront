import {
  b as n
} from "./_deps/MIBXW62M.js";
import {
  n as o
} from "./_deps/Q5VBJYR5.js";

// convex/cron.ts
var r = o();
r.daily(
  "sync meetings from Coda",
  { hourUTC: 6, minuteUTC: 0 },
  // 6 AM UTC
  n.codaSync.syncMeetingsFromCodaAction
);
var e = r;
export {
  e as default
};
//# sourceMappingURL=cron.js.map
