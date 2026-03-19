# @finografic/oxfmt-config

> Shareable oxfmt formatter configuration for the finografic ecosystem

Composable presets for [oxfmt](https://oxc.rs/docs/guide/usage/formatter) — the Rust-powered, Prettier-compatible formatter from the Oxc/VoidZero ecosystem.

## Installation

```bash
pnpm add -D oxfmt @finografic/oxfmt-config
```

## Usage

Create an `.oxfmtrc.ts` in your project root:

```ts
import { defineConfig } from 'oxfmt';
import { base, sorting, markdown, css } from '@finografic/oxfmt-config';

export default defineConfig({
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

Add to `.vscode/settings.json` (or Cursor equivalent):

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

See [oxc.rs formatter docs](https://oxc.rs/docs/guide/usage/formatter) for the VS Code extension and full configuration reference.

## License

MIT © [Justin Rankin](https://github.com/finografic)
