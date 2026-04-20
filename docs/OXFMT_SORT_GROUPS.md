# Oxfmt import sorting — group constants and presets

This package exposes `SORTING_GROUP_*` constants and `SORT_PRESET_*` arrays so consumers can configure [oxfmt `sortImports`](https://oxc.rs/docs/guide/usage/formatter/sorting.html) without duplicating glob patterns.

---

## Where the code lives

| Module           | File                                        | Contents                                                                             |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------------------------ |
| Universal groups | `src/oxfmt/sorting-groups/base.groups.ts`   | workspace, lib-utils, types-constants, styles, **tests**                             |
| Client           | `src/oxfmt/sorting-groups/client.groups.ts` | pages-components, hooks, client-routes                                               |
| React            | `src/oxfmt/sorting-groups/react.groups.ts`  | react                                                                                |
| Server           | `src/oxfmt/sorting-groups/server.groups.ts` | server-layers, server-routes, api                                                    |
| Presets          | `src/oxfmt/sorting-groups/presets.ts`       | `SORT_PRESET_CLIENT`, `SORT_PRESET_SERVER`, `SORT_PRESET_CLI`, `SORT_PRESET_LIBRARY` |
| Base preset      | `src/oxfmt/formatting/sorting.config.ts`    | Default `sorting` spread (workspace + lib-utils + types-constants + styles only)     |

Barrel: `src/oxfmt/sorting-groups/index.ts`. Public re-exports: `src/index.ts`.

---

## Why hooks/routes were split

Previously a single group (`hooks-routes` / `SORTING_GROUP_HOOKS_ROUTES`) matched both client hooks and `routes/**`. Server configs also used `routes/**` inside `server-layers`, so **the same import path could match multiple custom groups** and ordering became ambiguous.

Current layout:

- **`SORTING_GROUP_HOOKS`** + **`'hooks'`** — `hooks/**`, `providers/**`, `queries/**`
- **`SORTING_GROUP_CLIENT_ROUTES`** + **`'client-routes'`** — `routes/**` for front-end apps
- **`SORTING_GROUP_SERVER_ROUTES`** + **`'server-routes'`** — `routes/**` for Node servers
- **`SORTING_GROUP_SERVER_LAYERS`** — `middlewares/**`, `db/**`, `schemas/**` (no `routes/**`)

---

## Using presets

Presets are ordered arrays you can spread into `sortImports.customGroups`. Pair them with a `groups` array that lists the same `groupName` strings in the order you want.

```ts
import { defineConfig } from 'oxfmt';
import type { OxfmtConfig } from '@finografic/oxc-config';
import { SORT_PRESET_CLIENT, base, ignorePatterns, sorting } from '@finografic/oxc-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  sortImports: {
    ...sorting.sortImports,
    customGroups: [...sorting.sortImports.customGroups, ...SORT_PRESET_CLIENT],
    groups: [
      'value-builtin',
      'react',
      'workspace',
      'value-external',
      'type-import',
      { newlinesBetween: true },
      'pages-components',
      'hooks',
      'client-routes',
      'lib-utils',
      'types-constants',
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      { newlinesBetween: true },
      'styles',
      'tests',
      'unknown',
    ],
  },
} satisfies OxfmtConfig);
```

Adjust the `groups` list if you omit some preset entries.

---

## `elementNamePattern` caveat

Oxfmt matches `elementNamePattern` globs against **import source strings**. Relative imports may appear as `./lib/foo` or `lib/foo` depending on the project; the group definitions include common `./` variants where needed. **Verify ordering on real files** after changing groups.

---

## Consumer migration (breaking rename)

```diff
- import { SORTING_GROUP_HOOKS_ROUTES } from '@finografic/oxc-config';
+ import { SORTING_GROUP_HOOKS, SORTING_GROUP_CLIENT_ROUTES } from '@finografic/oxc-config';
```

```diff
- 'hooks-routes',
+ 'hooks',
+ 'client-routes',
```

New exports (`SORTING_GROUP_TESTS`, `SORT_PRESET_*`, `AGENT_DOC_PATHS`, …) are additive for consumers who did not use the old combined group.
