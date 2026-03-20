import type { CustomGroupItemConfig } from 'src/types/sorting.types';

export const SORTING_GROUP_WORKSPACE = {
  groupName: 'workspace',
  elementNamePattern: ['@finografic/**', '@workspace/**'],
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_LIB_UTILS = {
  groupName: 'lib-utils',
  elementNamePattern: ['lib/**', 'utils/**', './lib/**', './utils/**'],
} as const satisfies CustomGroupItemConfig;

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
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_STYLES = {
  groupName: 'styles',
  elementNamePattern: ['styles/**', './styles/**', '*.css', '*.scss', '*.styles'],
} as const satisfies CustomGroupItemConfig;
