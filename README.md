# @finografic/oxc-config

> Shareable oxfmt formatter and oxlint linter configuration for the finografic ecosystem

One install for both [**oxfmt**](https://oxc.rs/docs/guide/usage/formatter) and [**oxlint**](https://oxc.rs/docs/guide/usage/linter) — the Rust-powered **Oxc/VoidZero** toolchain. Composable presets spread directly into your config files.

## Installation

```bash
pnpm add -D oxfmt oxlint @finografic/oxc-config
```

---

## oxfmt — Formatter

### Minimal `oxfmt.config.ts`

```ts
import { defineConfig } from 'oxfmt';
import type { OxfmtConfig, OxfmtOverrideConfig } from '@finografic/oxc-config';
import {
  AGENT_DOC_MARKDOWN_PATHS,
  agentMarkdown,
  base,
  css,
  ignorePatterns,
  json,
  markdown,
  sorting,
} from '@finografic/oxc-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [...AGENT_DOC_MARKDOWN_PATHS], options: { ...markdown } },
    { files: [...AGENT_DOC_MARKDOWN_PATHS], excludeFiles: [], options: { ...agentMarkdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ] satisfies OxfmtOverrideConfig[],
} satisfies OxfmtConfig);
```

> **`$schema` gotcha:** Never spread `$schema` inside a preset object — it silently resets all formatting to oxfmt defaults. Always set it directly in `defineConfig()`. See [docs/SETUP_OXFMT_CONFIG.md](./docs/SETUP_OXFMT_CONFIG.md) for details.
>
> **`satisfies OxfmtConfig`** uses our index-signature-stripped type (via `OmitIndexSignature` from type-fest), giving strict excess-property checking on the config object. **`satisfies OxfmtOverrideConfig[]`** on the overrides array does the same per override. These are stricter than `satisfies ReturnType<typeof defineConfig>` from oxfmt's own type.

### Presets

| Preset       | Description                        | Key options                                       |
| ------------ | ---------------------------------- | ------------------------------------------------- |
| `base`       | Foundation defaults (spread first) | `printWidth: 110`, `singleQuote`, `semi`          |
| `typescript` | TS/TSX-specific overrides          | `quoteProps: 'consistent'`                        |
| `markdown`   | Prose formatting                   | `proseWrap: 'preserve'`, `printWidth: 110`        |
| `json`       | JSON/JSONC files                   | `trailingComma: 'none'`                           |
| `css`        | CSS/SCSS files                     | `printWidth: 110`, `singleQuote: false`           |
| `html`       | HTML files                         | `bracketSameLine: false`, `singleQuote: false`    |
| `react`      | JSX/React files                    | `bracketSameLine: false`, `jsxSingleQuote: false` |
| `sorting`    | Import + package.json sorting      | `sortImports`, `sortPackageJson: false`           |
| `jsdoc`      | JSDoc comment formatting           | Already spread inside `base`                      |

### Sorting groups

Composable import-sort constants — use in `sortImports.customGroups` and `sortImports.groups`. Source: `src/oxfmt/sorting-groups/`.

| Constant                         | Group name         | Matches                                                                       |
| -------------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| `SORTING_GROUP_WORKSPACE`        | `workspace`        | `@finografic/**`, `@workspace/**`                                             |
| `SORTING_GROUP_LIB_UTILS`        | `lib-utils`        | `lib/**`, `utils/**` (with `./` variants)                                     |
| `SORTING_GROUP_TYPES_CONSTANTS`  | `types-constants`  | `types/**`, `constants/**`, `config/**` (with `./` variants)                  |
| `SORTING_GROUP_STYLES`           | `styles`           | `styles/**`, `*.css`, `*.scss`, `*.styles`                                    |
| `SORTING_GROUP_TESTS`            | `tests`            | `__tests__/**`, `*.test.*`, `*.spec.*`, `test-utils/**`                       |
| `SORTING_GROUP_REACT`            | `react`            | `react`, `react-dom`, `react/**`, `@react/**`                                 |
| `SORTING_GROUP_PAGES_COMPONENTS` | `pages-components` | `pages/**`, `components/**`                                                   |
| `SORTING_GROUP_HOOKS`            | `hooks`            | `hooks/**`, `providers/**`, `queries/**`                                      |
| `SORTING_GROUP_CLIENT_ROUTES`    | `client-routes`    | `routes/**` (client; separate from server routes)                             |
| `SORTING_GROUP_SERVER_ROUTES`    | `server-routes`    | `routes/**` (server apps)                                                     |
| `SORTING_GROUP_SERVER_LAYERS`    | `server-layers`    | `middlewares/**`, `db/**`, `schemas/**` (no `routes/**`; use `server-routes`) |
| `SORTING_GROUP_API`              | `api`              | `openapi/**`, `i18n/**`                                                       |

#### Sort presets

Ready-made `customGroups` arrays. Spread into `sortImports.customGroups` and mirror the group names in `sortImports.groups`.

| Export                | Typical use        |
| --------------------- | ------------------ |
| `SORT_PRESET_CLIENT`  | React / Vite / SPA |
| `SORT_PRESET_SERVER`  | Node HTTP APIs     |
| `SORT_PRESET_CLI`     | CLI tools          |
| `SORT_PRESET_LIBRARY` | Shared packages    |

When overriding `sortImports`, spread the base config first so `sorting.rules` and `sorting.sortPackageJson` are still inherited:

```ts
sortImports: {
  ...sorting.sortImports,
  customGroups: [...SORT_PRESET_CLIENT],
  groups: ['value-builtin', 'react', 'workspace', /* ... */],
},
```

See [docs/OXFMT_SORT_GROUPS.md](./docs/OXFMT_SORT_GROUPS.md) for the full groups reference.

`AGENT_DOC_PATHS` and `AGENT_DOC_MARKDOWN_PATHS` cover all known AI instruction file paths across tools (GitHub Copilot, Cursor, Windsurf, Claude, Cline, etc.). The two-path markdown override pattern is shown in all examples above.

### Monorepo examples

#### Client — Vite + React + TypeScript

```ts
import { defineConfig } from 'oxfmt';
import type { OxfmtConfig, OxfmtOverrideConfig } from '@finografic/oxc-config';
import {
  AGENT_DOC_MARKDOWN_PATHS,
  SORT_PRESET_CLIENT,
  SORTING_GROUP_CLIENT_ROUTES,
  SORTING_GROUP_HOOKS,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_PAGES_COMPONENTS,
  SORTING_GROUP_REACT,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TESTS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_WORKSPACE,
  agentMarkdown,
  base,
  css,
  ignorePatterns,
  json,
  markdown,
  sorting,
  typescript,
} from '@finografic/oxc-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  sortImports: {
    newlinesBetween: false,
    customGroups: [...SORT_PRESET_CLIENT],
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
  overrides: [
    { files: ['*.ts', '*.tsx'], excludeFiles: [], options: { ...typescript } },
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [...AGENT_DOC_MARKDOWN_PATHS], options: { ...markdown } },
    { files: [...AGENT_DOC_MARKDOWN_PATHS], excludeFiles: [], options: { ...agentMarkdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ] satisfies OxfmtOverrideConfig[],
} satisfies OxfmtConfig);
```

#### Server — Node.js

```ts
import { defineConfig } from 'oxfmt';
import type { OxfmtConfig, OxfmtOverrideConfig } from '@finografic/oxc-config';
import {
  AGENT_DOC_MARKDOWN_PATHS,
  SORT_PRESET_SERVER,
  SORTING_GROUP_API,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_SERVER_LAYERS,
  SORTING_GROUP_SERVER_ROUTES,
  SORTING_GROUP_TESTS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_WORKSPACE,
  agentMarkdown,
  base,
  ignorePatterns,
  json,
  markdown,
  sorting,
  typescript,
} from '@finografic/oxc-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  sortImports: {
    newlinesBetween: false,
    customGroups: [...SORT_PRESET_SERVER],
    groups: [
      'value-builtin',
      'workspace',
      'value-external',
      'type-import',
      { newlinesBetween: true },
      'server-routes',
      'server-layers',
      'api',
      'lib-utils',
      'types-constants',
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      'tests',
      'unknown',
    ],
  },
  overrides: [
    { files: ['*.ts'], excludeFiles: [], options: { ...typescript } },
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [...AGENT_DOC_MARKDOWN_PATHS], options: { ...markdown } },
    { files: [...AGENT_DOC_MARKDOWN_PATHS], excludeFiles: [], options: { ...agentMarkdown } },
  ] satisfies OxfmtOverrideConfig[],
} satisfies OxfmtConfig);
```

---

## oxlint — Linter

### Minimal `oxlint.config.ts`

```ts
import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';
import {
  baseRules,
  configOverrides,
  lintCategories,
  lintIgnorePatterns,
  lintOptions,
  lintPlugins,
  testOverrides,
} from '@finografic/oxc-config';

export default defineConfig({
  plugins: [...lintPlugins],
  ...lintOptions,
  rules: { ...baseRules },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...lintIgnorePatterns],
} satisfies OxlintConfig);
```

### Exported pieces

| Export               | Type             | Purpose                                                   |
| -------------------- | ---------------- | --------------------------------------------------------- |
| `lintPlugins`        | `string[]`       | Plugin list (eslint, typescript, unicorn, react, …)       |
| `lintOptions`        | Config fragment  | Spreads `env` (builtin, node) + `options` (typeCheck, …)  |
| `lintCategories`     | Config fragment  | `{ correctness: 'error', perf: 'error' }`                 |
| `lintIgnorePatterns` | `string[]`       | Ignore globs: `*.d.ts`, `.astro/**`, `.claude/**`, …      |
| `baseRules`          | `DummyRuleMap`   | Core TypeScript + import + ESLint rule set (~60 rules)    |
| `testOverrides`      | `OxlintOverride` | Relaxed rules for `*.spec.ts` / `*.test.ts` files         |
| `configOverrides`    | `OxlintOverride` | Allows default exports in `oxlint/oxfmt/vitest.config.ts` |

`lintOptions` spreads two top-level keys: `env: { builtin: true, node: true }` and `options: { typeCheck: true, typeAware: true, reportUnusedDisableDirectives: 'error' }`.

### Composition patterns

**Add rules without losing the base set:**

```ts
rules: {
  ...baseRules,
  'unicorn/no-array-for-each': 'error',
},
```

**Extend ignore patterns:**

```ts
ignorePatterns: [...lintIgnorePatterns, '**/generated/**'],
```

**Add a custom override:**

```ts
import type { OxlintOverride } from 'oxlint';

const storybookOverrides: OxlintOverride = {
  files: ['**/*.stories.ts', '**/*.stories.tsx'],
  rules: { 'import/no-default-export': 'off' },
};

overrides: [testOverrides, configOverrides, storybookOverrides],
```

**Override env for browser projects:**

```ts
export default defineConfig({
  ...lintOptions,
  env: { builtin: true, browser: true }, // replaces node: true
  // ...
});
```

**Disable type-aware rules (faster CI, no tsconfig required):**

```ts
export default defineConfig({
  plugins: [...lintPlugins],
  env: { ...lintOptions.env },
  options: { typeCheck: false, typeAware: false, reportUnusedDisableDirectives: 'error' },
  rules: { ...baseRules },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...lintIgnorePatterns],
} satisfies OxlintConfig);
```

### Type-aware linting

Some rules in `baseRules` (e.g. `typescript/await-thenable`) require type information. Install `oxlint-tsgolint` and ensure `tsconfig.json` is at the project root:

```bash
pnpm add -D oxlint-tsgolint
```

See [docs/SETUP_OXLINT_CONFIG.md](./docs/SETUP_OXLINT_CONFIG.md) for the full composition reference.

---

## Source layout

| Area                              | Path                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Formatting presets                | `src/oxfmt/formatting/` (`base`, `css`, `html`, `json`, `markdown`, `react`, …) |
| Sorting groups + presets          | `src/oxfmt/sorting-groups/` (`*.groups.ts`, `presets.ts`)                       |
| Types                             | `src/oxfmt/types/` (`oxfmt.types.ts`, `sorting.types.ts`)                       |
| Linting pieces                    | `src/oxlint/` (`plugins.ts`, `categories.ts`, `options.ts`, `rules/`, …)        |
| Shared ignore globs + agent paths | `src/patterns/` (`ignore.patterns.ts`, `agent-docs.patterns.ts`)                |
| Public API                        | `src/index.ts` → `dist/index.mjs`                                               |

Both `oxfmt.config.ts` and `oxlint.config.ts` import from `./dist/index.mjs`. Rebuild with `pnpm build` after editing `src/`.

## lint-staged

This repo runs oxlint then oxfmt on code and markdown, oxfmt-only on JSON/YAML/TOML:

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,mjs,cjs}": [
      "oxfmt --no-error-on-unmatched-pattern",
      "oxlint -c oxlint.config.ts --fix --no-error-on-unmatched-pattern"
    ],
    "*.md": ["oxfmt --no-error-on-unmatched-pattern", "md-lint --fix"],
    "*.{json,jsonc,yml,yaml,toml}": ["oxfmt --no-error-on-unmatched-pattern"]
  }
}
```

The pre-commit hook runs `lint-staged` then `oxfmt` on the whole tree. After cloning or changing hook config, run `pnpm install` (or `npx simple-git-hooks`) to re-register hooks.

## Editor setup

Install the **Oxc** VS Code extension (`oxc.oxc-vscode`). It provides both oxfmt formatting and oxlint diagnostics. Set oxfmt as the default formatter:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file"
}
```

oxfmt picks up `oxfmt.config.ts` at the project root automatically. If you set `oxc.fmt.configPath`, use a real path — `${workspaceFolder}` is not expanded by the formatter binary.

## Further reading

- [docs/SETUP_OXFMT_CONFIG.md](./docs/SETUP_OXFMT_CONFIG.md) — formatter gotchas, workflow, config object reference
- [docs/SETUP_OXLINT_CONFIG.md](./docs/SETUP_OXLINT_CONFIG.md) — linter composition patterns, full pieces reference
- [docs/OXFMT_SORT_GROUPS.md](./docs/OXFMT_SORT_GROUPS.md) — sorting groups deep-dive
- [docs/MIGRATION_GUIDE.md](./docs/MIGRATION_GUIDE.md) — migrating from v1.x, dprint, or Prettier

## License

MIT © [Justin Rankin](https://github.com/finografic)
