import type { SortImportsConfig } from '../types/sorting.types';

import {
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_PATH_ALIAS,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_WORKSPACE,
} from './base.groups';

/** Shared `sortImports` options for the base sorting preset and consumer examples. */
export const SORT_IMPORTS_SHARED_OPTIONS = {
  newlinesBetween: false,
  partitionByComment: true,
} as const;

/** Default `customGroups` for `sorting.config.ts` (universal groups only). */
export const SORT_CUSTOM_GROUPS_BASE = [
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_PATH_ALIAS,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_STYLES,
] satisfies SortImportsConfig['customGroups'];

/** Default `groups` ordering paired with {@link SORT_CUSTOM_GROUPS_BASE}. */
export const SORT_GROUPS_BASE = [
  'value-builtin',
  SORTING_GROUP_WORKSPACE.groupName,
  'value-external',
  'type-import',

  { newlinesBetween: true },

  SORTING_GROUP_PATH_ALIAS.groupName,

  { newlinesBetween: true },

  SORTING_GROUP_LIB_UTILS.groupName,

  { newlinesBetween: true },

  SORTING_GROUP_TYPES_CONSTANTS.groupName,

  { newlinesBetween: true },

  ['value-internal', 'value-parent', 'value-sibling', 'value-index'],

  { newlinesBetween: true },

  SORTING_GROUP_STYLES.groupName,
  'unknown',
] satisfies SortImportsConfig['groups'];
