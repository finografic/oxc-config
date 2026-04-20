import type { CustomGroupItemConfig } from 'oxfmt/types/sorting.types';

// ── Server / backend groups ───────────────────────────

export const SORTING_GROUP_SERVER_LAYERS = {
  groupName: 'server-layers',
  elementNamePattern: [
    'middlewares/**',
    'db/**',
    'schemas/**',
    './middlewares/**',
    './db/**',
    './schemas/**',
  ],
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_SERVER_ROUTES = {
  groupName: 'server-routes',
  elementNamePattern: ['routes/**', './routes/**'],
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_API = {
  groupName: 'api',
  elementNamePattern: ['openapi/**', 'i18n/**', './openapi/**', './i18n/**'],
} as const satisfies CustomGroupItemConfig;
