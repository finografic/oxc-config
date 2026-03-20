import type { CustomGroupItemConfig } from 'src/types/sorting.types';

export const SORTING_GROUP_SERVER_LAYERS = {
  groupName: 'server-layers',
  elementNamePattern: [
    'routes/**',
    'middlewares/**',
    'db/**',
    'schemas/**',
    './routes/**',
    './middlewares/**',
    './db/**',
    './schemas/**',
  ],
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_API = {
  groupName: 'api',
  elementNamePattern: ['openapi/**', 'i18n/**', './openapi/**', './i18n/**'],
} as const satisfies CustomGroupItemConfig;
