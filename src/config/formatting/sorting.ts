/**
 * Sorting preset — import ordering + package.json field sorting.
 *
 * Import groups are mapped from the existing eslint-plugin-simple-import-sort
 * configuration used across the @finografic / @workspace ecosystem.
 *
 * @see https://oxc.rs/docs/guide/usage/formatter/sorting.html
 */
import type { OxfmtConfig } from 'oxfmt';

export const sorting = {
  sortImports: {
    newlinesBetween: false,
    customGroups: [
      {
        groupName: 'workspace',
        elementNamePattern: ['@finografic/**', '@workspace/**'],
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
      'types-constants',
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      { newlinesBetween: true },
      'styles',
      'unknown',
    ],
  },
  rules: {
    'typescript/no-import-type-side-effects': 'error',
  },
  sortPackageJson: {
    sortScripts: false,
  },
} as const satisfies Partial<OxfmtConfig>;
