import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Sync meetings from Coda every day at 6 AM
crons.daily(
  "sync meetings from Coda",
  { hourUTC: 6, minuteUTC: 0 }, // 6 AM UTC
  internal.codaSync.syncMeetingsFromCodaAction
);

export default crons;
