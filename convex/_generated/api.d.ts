/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as documents from "../documents.js";
import type * as events from "../events.js";
import type * as expense from "../expense.js";
import type * as financial from "../financial.js";
import type * as household from "../household.js";
import type * as target from "../target.js";
import type * as task from "../task.js";
import type * as todo from "../todo.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  documents: typeof documents;
  events: typeof events;
  expense: typeof expense;
  financial: typeof financial;
  household: typeof household;
  target: typeof target;
  task: typeof task;
  todo: typeof todo;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
