Good idea. The base sorting config should include folder patterns that are genuinely universal — things every project tends to have. Then the exportable constants let consumers compose project-specific groups without writing regex from scratch.

However, there's a limitation to check first. Oxfmt's `sortImports` uses `elementNamePattern` which matches against the import path string. The `simple-import-sort` patterns like `^(lib|utils)` match bare directory names because those are relative imports. In oxfmt's format, these would need to be patterns like `lib/**`, `utils/**`, `./lib/**`, `./utils/**`, etc.

Let me map what would work as a base sorting config, plus the exported constants:

**For `src/sorting.ts` — the base preset:**

```ts
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
```

**For `src/sorting.groups.ts` — exported constants for consumer composition:**

```ts
/**
 * Custom group definitions for oxfmt sortImports.
 * Import individually and add to your sorting config's customGroups array.
 */

/** React and React-related packages */
export const GROUP_REACT = {
  groupName: 'react',
  elementNamePattern: ['react', 'react-dom', 'react/**', '@react/**'],
} as const;

/** Workspace / monorepo packages */
export const GROUP_WORKSPACE = {
  groupName: 'workspace',
  elementNamePattern: ['@finografic/**', '@workspace/**'],
} as const;

/** Utility and helper modules */
export const GROUP_LIB_UTILS = {
  groupName: 'lib-utils',
  elementNamePattern: ['lib/**', 'utils/**', './lib/**', './utils/**'],
} as const;

/** Type definitions and constants */
export const GROUP_TYPES_CONSTANTS = {
  groupName: 'types-constants',
  elementNamePattern: [
    'types/**',
    'constants/**',
    'config/**',
    './types/**',
    './constants/**',
    './config/**',
  ],
} as const;

/** Stylesheets and style modules */
export const GROUP_STYLES = {
  groupName: 'styles',
  elementNamePattern: ['styles/**', './styles/**', '*.css', '*.scss', '*.styles'],
} as const;

// ── Client-specific ──

/** Pages and components (client apps) */
export const GROUP_PAGES_COMPONENTS = {
  groupName: 'pages-components',
  elementNamePattern: ['pages/**', 'components/**', './pages/**', './components/**'],
} as const;

/** Hooks, routes, providers (client apps) */
export const GROUP_HOOKS_ROUTES = {
  groupName: 'hooks-routes',
  elementNamePattern: [
    'hooks/**',
    'routes/**',
    'providers/**',
    'queries/**',
    './hooks/**',
    './routes/**',
    './providers/**',
    './queries/**',
  ],
} as const;

// ── Server-specific ──

/** Server layers (routes, middleware, db) */
export const GROUP_SERVER_LAYERS = {
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
} as const;

/** API / OpenAPI modules */
export const GROUP_API = {
  groupName: 'api',
  elementNamePattern: ['openapi/**', 'i18n/**', './openapi/**', './i18n/**'],
} as const;
```

Then update `src/index.ts` to export everything:

```ts
export { base } from './base';
export { css } from './css';
export { json } from './json';
export { markdown } from './markdown';
export { sorting } from './sorting';
export { typescript } from './typescript';

// Composable sorting group constants
export {
  GROUP_API,
  GROUP_HOOKS_ROUTES,
  GROUP_LIB_UTILS,
  GROUP_PAGES_COMPONENTS,
  GROUP_REACT,
  GROUP_SERVER_LAYERS,
  GROUP_STYLES,
  GROUP_TYPES_CONSTANTS,
  GROUP_WORKSPACE,
} from './sorting.groups';
```

**Consumer usage for a client project:**

```ts
import { defineConfig } from 'oxfmt';
import {
  base,
  sorting,
  markdown,
  css,
  GROUP_REACT,
  GROUP_HOOKS_ROUTES,
  GROUP_PAGES_COMPONENTS,
} from '@finografic/oxfmt-config';

export default defineConfig({
  ...base,
  sortImports: {
    ...sorting.sortImports,
    customGroups: [
      ...sorting.sortImports.customGroups,
      GROUP_REACT,
      GROUP_HOOKS_ROUTES,
      GROUP_PAGES_COMPONENTS,
    ],
    groups: [
      'value-builtin',
      'react',
      'workspace',
      'value-external',
      'type-import',
      { newlinesBetween: true },
      'pages-components',
      'hooks-routes',
      'lib-utils',
      'types-constants',
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      { newlinesBetween: true },
      'styles',
      'unknown',
    ],
  },
  overrides: [
    { files: ['*.md', '*.mdx'], options: { ...markdown } },
    { files: ['*.css', '*.scss'], options: { ...css } },
  ],
});
```

The big caveat: **verify the `elementNamePattern` syntax against oxfmt's actual implementation.** The glob patterns for matching relative imports (`./lib/**`) may behave differently from `simple-import-sort`'s regex. Test with a real file that has these import patterns and confirm the groups resolve correctly before publishing.
