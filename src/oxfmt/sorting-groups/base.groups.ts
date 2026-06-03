import type { CustomGroupItemConfig } from 'oxfmt/types/sorting.types';

// ── Universal groups (all project types) ──────────────

export const SORTING_GROUP_WORKSPACE = {
  groupName: 'workspace',
  elementNamePattern: ['@finografic/**', '@workspace/**'],
} satisfies CustomGroupItemConfig;

/** Tsconfig / Vite `@/` path alias (e.g. `@/components/**`, `@/lib/utils`). */
export const SORTING_GROUP_PATH_ALIAS = {
  groupName: 'path-alias',
  elementNamePattern: ['@/**'],
} satisfies CustomGroupItemConfig;

export const SORTING_GROUP_LIB_UTILS = {
  groupName: 'lib-utils',
  elementNamePattern: ['lib/**', 'utils/**', './lib/**', './utils/**'],
} satisfies CustomGroupItemConfig;

export const SORTING_GROUP_TYPES_CONSTANTS = {
  groupName: 'types-constants',
  elementNamePattern: [
    'types/**',
    'constants/**',
    'config/**',
    './types/**',
    './constants/**',
    './config/**',
  ],
} satisfies CustomGroupItemConfig;

export const SORTING_GROUP_STYLES = {
  groupName: 'styles',
  elementNamePattern: ['styles/**', './styles/**', '*.css', '*.scss', '*.styles'],
} satisfies CustomGroupItemConfig;

export const SORTING_GROUP_TESTS = {
  groupName: 'tests',
  elementNamePattern: ['__tests__/**', '*.test.*', '*.spec.*', 'test-utils/**', './test-utils/**'],
} satisfies CustomGroupItemConfig;
