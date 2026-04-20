import {
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TESTS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_WORKSPACE,
} from './base.groups';
import {
  SORTING_GROUP_CLIENT_ROUTES,
  SORTING_GROUP_HOOKS,
  SORTING_GROUP_PAGES_COMPONENTS,
} from './client.groups';
import { SORTING_GROUP_REACT } from './react.groups';
import { SORTING_GROUP_API, SORTING_GROUP_SERVER_LAYERS, SORTING_GROUP_SERVER_ROUTES } from './server.groups';

// ── Presets: customGroups arrays ──────────────────────
// Use with `sortImports.customGroups` — each preset defines which
// groups are recognized. Pair with a matching `groups` ordering array.

/** React + Vite/Next.js client app */
export const SORT_PRESET_CLIENT = [
  SORTING_GROUP_REACT,
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_PAGES_COMPONENTS,
  SORTING_GROUP_HOOKS,
  SORTING_GROUP_CLIENT_ROUTES,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TESTS,
] as const;

/** Node.js server (Express, Hono, Fastify, etc.) */
export const SORT_PRESET_SERVER = [
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_SERVER_ROUTES,
  SORTING_GROUP_SERVER_LAYERS,
  SORTING_GROUP_API,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_TESTS,
] as const;

/** CLI tool (Citty, Commander, etc.) */
export const SORT_PRESET_CLI = [
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_TESTS,
] as const;

/** Library / shared package (minimal groups) */
export const SORT_PRESET_LIBRARY = [
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_TESTS,
] as const;
