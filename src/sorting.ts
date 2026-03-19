/**
 * Sorting preset — import ordering + package.json field sorting.
 *
 * Import groups are mapped from the existing eslint-plugin-simple-import-sort
 * configuration used across the @finografic / @workspace ecosystem.
 *
 * Group order:
 *   1. Node builtins           — `node:fs`, `node:path`, etc.
 *   2. Workspace packages      — `@finografic/*`, `@workspace/*`
 *   3. Side-effect imports     — `import './setup'` (no specifiers)
 *   4. Third-party packages    — `react`, `hono`, `drizzle-orm`, etc.
 *   5. Type-only imports       — `import type { ... } from '...'`
 *   ── newline ──
 *   6. Internal / relative     — `../`, `./`, `lib/`, `utils/`, `types/`, etc.
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
    ],
    groups: [
      // 1. Node builtins
      'value-builtin',
      // 2. Workspace packages
      'workspace',
      // 3. Side-effect imports (no specifiers)
      'side-effect',
      // 4. Third-party packages
      'value-external',
      // 5. Type-only imports
      'type-import',
      // ── visual separator ──
      { newlinesBetween: true },
      // 6. Internal / relative (parent, sibling, index)
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
    ],
  },

  sortPackageJson: {
    /**
     * Keep scripts in manual order — we use decorative separators
     * ("·· ICONS ···") that would be destroyed by alphabetical sorting.
     */
    sortScripts: false,
  },
} as const satisfies Partial<OxfmtConfig>;
