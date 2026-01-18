/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as codaSync from "../codaSync.js";
import type * as cron from "../cron.js";
import type * as emailSubscribers from "../emailSubscribers.js";
import type * as http from "../http.js";
import type * as meetings from "../meetings.js";
import type * as myFunctions from "../myFunctions.js";
import type * as seedMeetings from "../seedMeetings.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  codaSync: typeof codaSync;
  cron: typeof cron;
  emailSubscribers: typeof emailSubscribers;
  http: typeof http;
  meetings: typeof meetings;
  myFunctions: typeof myFunctions;
  seedMeetings: typeof seedMeetings;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
