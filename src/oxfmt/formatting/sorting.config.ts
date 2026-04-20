/**
 * Sorting preset — import ordering + package.json field sorting.
 *
 * @see https://oxc.rs/docs/guide/usage/formatter/sorting.html
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html#sortimports
 * @see https://perfectionist.dev/rules/sort-imports  (Oxfmt sorting based on this)
 */
import type { OxfmtConfig } from 'oxfmt';
import type { SortImportsConfig } from 'oxfmt/types/sorting.types';

export const sorting = {
  sortImports: {
    newlinesBetween: false,
    partitionByComment: true,
    customGroups: [
      {
        groupName: 'workspace',
        elementNamePattern: ['@workspace/**', '@finografic/**'],
      },
      {
        groupName: 'lib-utils',
        elementNamePattern: ['lib/**', 'utils/**', './lib/**', './utils/**'],
      },
      {
        groupName: 'types-constants',
        elementNamePattern: [
          'types/**',
          'constants/**',
          'config/**',
          './types/**',
          './constants/**',
          './config/**',
        ],
      },
      {
        groupName: 'styles',
        elementNamePattern: ['styles/**', './styles/**', '*.css', '*.scss', '*.styles'],
      },
    ],
    groups: [
      'value-builtin',
      'workspace',
      'value-external',
      'type-import',

      { newlinesBetween: true },

      'lib-utils',

      { newlinesBetween: true },

      'types-constants',

      { newlinesBetween: true },

      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],

      { newlinesBetween: true },

      'styles',
      'unknown',
    ],
  } as const satisfies SortImportsConfig,
  rules: {
    'typescript/no-import-type-side-effects': 'error',
  },
} as const satisfies Partial<OxfmtConfig>;
