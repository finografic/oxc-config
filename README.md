# 🛠️ @finografic/oxfmt-config

> Shareable oxfmt formatter configuration for the finografic ecosystem

Composable presets for [oxfmt](https://oxc.rs/docs/guide/usage/formatter) — the Rust-powered, Prettier-compatible formatter from the Oxc/VoidZero ecosystem.

## Installation

```bash
pnpm add -D oxfmt @finografic/oxfmt-config
```

## Usage

Create a `oxfmt.config.ts` in your project root:

```ts
import { defineConfig } from 'oxfmt';
import { base, css, json, markdown, sorting, ignorePatterns } from '@finografic/oxfmt-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ],
} satisfies ReturnType<typeof defineConfig>);
```

## Available Presets

| Preset       | Description                        | Key Options                                |
| ------------ | ---------------------------------- | ------------------------------------------ |
| `base`       | Foundation defaults (spread first) | `printWidth: 110`, `singleQuote`, `semi`   |
| `typescript` | TS/TSX-specific overrides          | Placeholder — no options set yet           |
| `markdown`   | Prose formatting                   | `proseWrap: "preserve"`, `printWidth: 110` |
| `json`       | JSON/JSONC files                   | `trailingComma: "none"`                    |
| `css`        | CSS/SCSS/Less files                | `printWidth: 80`, `singleQuote: false`     |
| `sorting`    | Import + package.json sorting      | `sortImports`, `sortPackageJson: false`    |

> **Note:** Never spread `$schema` inside a preset object — doing so silently resets all formatting to oxfmt defaults. Always set `$schema` directly in `defineConfig()`.

## Sorting Groups

Composable import-sort group constants. Import whichever groups match your project structure and use them in `sortImports.customGroups` and `sortImports.groups`.

| Constant                         | Group name         | Matches                                               |
| -------------------------------- | ------------------ | ----------------------------------------------------- |
| `SORTING_GROUP_WORKSPACE`        | `workspace`        | `@finografic/**`, `@workspace/**`                     |
| `SORTING_GROUP_LIB_UTILS`        | `lib-utils`        | `lib/**`, `utils/**`                                  |
| `SORTING_GROUP_TYPES_CONSTANTS`  | `types-constants`  | `types/**`, `constants/**`, `config/**`               |
| `SORTING_GROUP_STYLES`           | `styles`           | `styles/**`, `*.css`, `*.scss`                        |
| `SORTING_GROUP_REACT`            | `react`            | `react`, `react-dom`, `react/**`, `@react/**`         |
| `SORTING_GROUP_PAGES_COMPONENTS` | `pages-components` | `pages/**`, `components/**`                           |
| `SORTING_GROUP_HOOKS_ROUTES`     | `hooks-routes`     | `hooks/**`, `routes/**`, `providers/**`, `queries/**` |
| `SORTING_GROUP_SERVER_LAYERS`    | `server-layers`    | `routes/**`, `middlewares/**`, `db/**`, `schemas/**`  |
| `SORTING_GROUP_API`              | `api`              | `openapi/**`, `i18n/**`                               |

When spreading `...sorting` and overriding `sortImports`, the explicit key wins — `sorting.rules` and `sorting.sortPackageJson` are still inherited from the spread.

## Monorepo Setup

In a monorepo, each package owns its `oxfmt.config.ts`. The examples below cover a typical split: a `client/` package running Vite + React + TypeScript, and a `server/` package running Node.js.

### Client — Vite + React + TypeScript (`client/`)

```ts
import { defineConfig } from 'oxfmt';
import {
  base,
  css,
  json,
  markdown,
  sorting,
  typescript,
  ignorePatterns,
  SORTING_GROUP_REACT,
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_PAGES_COMPONENTS,
  SORTING_GROUP_HOOKS_ROUTES,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_STYLES,
} from '@finografic/oxfmt-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  sortImports: {
    newlinesBetween: false,
    customGroups: [
      SORTING_GROUP_REACT,
      SORTING_GROUP_WORKSPACE,
      SORTING_GROUP_PAGES_COMPONENTS,
      SORTING_GROUP_HOOKS_ROUTES,
      SORTING_GROUP_LIB_UTILS,
      SORTING_GROUP_TYPES_CONSTANTS,
      SORTING_GROUP_STYLES,
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
    { files: ['*.ts', '*.tsx'], excludeFiles: [], options: { ...typescript } },
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ],
} satisfies ReturnType<typeof defineConfig>);
```

### Server — Node.js (`server/`)

```ts
import { defineConfig } from 'oxfmt';
import {
  base,
  json,
  markdown,
  sorting,
  typescript,
  ignorePatterns,
  SORTING_GROUP_WORKSPACE,
  SORTING_GROUP_SERVER_LAYERS,
  SORTING_GROUP_API,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_TYPES_CONSTANTS,
} from '@finografic/oxfmt-config';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  sortImports: {
    newlinesBetween: false,
    customGroups: [
      SORTING_GROUP_WORKSPACE,
      SORTING_GROUP_SERVER_LAYERS,
      SORTING_GROUP_API,
      SORTING_GROUP_LIB_UTILS,
      SORTING_GROUP_TYPES_CONSTANTS,
    ],
    groups: [
      'value-builtin',
      'workspace',
      'value-external',
      'type-import',
      { newlinesBetween: true },
      'server-layers',
      'api',
      'lib-utils',
      'types-constants',
      ['value-internal', 'value-parent', 'value-sibling', 'value-index'],
      'unknown',
    ],
  },
  overrides: [
    { files: ['*.ts'], excludeFiles: [], options: { ...typescript } },
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
  ],
} satisfies ReturnType<typeof defineConfig>);
```

## Source layout (this repo)

Presets live under `src/config/formatting/` (`base`, `typescript`, `json`, `markdown`, `css`, `sorting`, etc.). Optional `ignores` glob patterns are in `src/config/ignores.ts`. Composable import-sort groups (`SORTING_GROUP_*`) are in `src/config/sorting-groups/`. The package entry re-exports from `src/index.ts`.

## lint-staged

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,mjs,cjs}": ["oxfmt --no-error-on-unmatched-pattern", "eslint --fix"],
    "*.{json,jsonc,md,yml,yaml,toml,css,scss,html}": ["oxfmt --no-error-on-unmatched-pattern"]
  }
}
```

## Editor Setup

Install the **Oxc** VS Code extension (`oxc.oxc-vscode`). This workspace uses `.vscode/settings.json` with **oxfmt** as the default formatter. **oxfmt** picks up `oxfmt.config.ts` (or other supported config names) at the project root automatically — you usually do **not** need `oxc.fmt.configPath` unless the config lives elsewhere. If you set `oxc.fmt.configPath`, use a real path; **`${workspaceFolder}` is not expanded** when passed to the formatter binary.

Minimal example:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file"
}
```

See [oxc.rs formatter docs](https://oxc.rs/docs/guide/usage/formatter) and `.vscode/oxc.oxc-vscode.extension.md` for extension settings (oxlint, oxfmt paths, etc.).

## License

MIT © [Justin Rankin](https://github.com/finografic)
