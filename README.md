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
import {
  base,
  sorting,
  markdown,
  css,
  ignores,
} from '@finografic/oxfmt-config';

export default defineConfig({
  ...ignores,
  ...base,
  ...sorting,
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: { ...markdown },
    },
    {
      files: ['*.css', '*.scss'],
      options: { ...css },
    },
  ],
});
```

## Available Presets

| Preset       | Description                        | Key Options                               |
| ------------ | ---------------------------------- | ----------------------------------------- |
| `base`       | Foundation defaults (spread first) | `printWidth: 100`, `singleQuote`, `semi`  |
| `typescript` | TS/TSX-specific overrides          | Placeholder for future TS-specific rules  |
| `markdown`   | Prose formatting                   | `proseWrap: "preserve"`, `printWidth: 80` |
| `json`       | JSON/JSONC files                   | `trailingComma: "none"`                   |
| `css`        | CSS/SCSS/Less files                | `singleQuote: false` (CSS convention)     |
| `sorting`    | Import + package.json sorting      | `sortImports`, `sortPackageJson`          |

## Source layout (this repo)

Presets live under `src/config/formatting/` (`base`, `typescript`, `json`, `markdown`, `css`, `sorting`, etc.). Optional `ignores` glob patterns are in `src/config/ignores.ts`. Composable import-sort groups (`SORTING_GROUP_*`) are in `src/config/sorting-groups/`. The package entry re-exports from `src/index.ts`.

## lint-staged

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,mjs,cjs}": [
      "oxfmt --no-error-on-unmatched-pattern",
      "eslint --fix"
    ],
    "*.{json,jsonc,md,yml,yaml,toml,css,scss,html}": [
      "oxfmt --no-error-on-unmatched-pattern"
    ]
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
