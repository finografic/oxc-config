# Build: @finografic/oxfmt-config

## Goal

Create a shareable oxfmt configuration package published to GitHub Packages at `@finografic/oxfmt-config`. Consumers install it and reference its exported config in their `.oxfmtrc.json` or `.oxfmtrc.jsonc`.

## What oxfmt is

Oxfmt is a Rust-powered, Prettier-compatible code formatter from the Oxc/VoidZero ecosystem. It's 30x faster than Prettier, passes 100% of Prettier's JS/TS conformance tests, and supports: JS, JSX, TS, TSX, JSON, JSONC, JSON5, YAML, TOML, HTML, Vue, CSS, SCSS, Less, Markdown, MDX, GraphQL.

Config lives in `.oxfmtrc.json` or `.oxfmtrc.jsonc` (JSON format). Oxfmt does NOT support extending from packages natively (unlike ESLint). The config file is always a flat JSON object.

## How shareable config works

Since oxfmt has no built-in `extends` mechanism, our package exports JSON objects that consumers spread or reference. Two approaches:

### Approach A — Export JSON files directly
The package publishes pre-built `.oxfmtrc.json` files. Consumers copy them or symlink them. Simple but no composition.

### Approach B — Export JS/TS config objects (RECOMMENDED)
Oxfmt supports `.oxfmtrc.ts` / `.oxfmtrc.mts` / `.oxfmtrc.js` / `.oxfmtrc.mjs` config files with a default export. This means consumers can:

```ts
// .oxfmtrc.ts in consuming project
import { defineConfig } from 'oxfmt';
import { base, typescript, markdown } from '@finografic/oxfmt-config';

export default defineConfig({
  ...base,
  ...typescript,
  overrides: [
    {
      files: ['*.md'],
      options: markdown,
    },
  ],
});
```

This is the approach to use. It allows composition and per-language overrides.

## Package structure

```
@finografic/oxfmt-config/
├── src/
│   ├── index.ts          ← barrel export
│   ├── base.ts           ← shared defaults (printWidth, semi, singleQuote, etc.)
│   ├── typescript.ts     ← TS/TSX specific overrides
│   ├── markdown.ts       ← prose wrapping, printWidth adjustments
│   ├── json.ts           ← JSON/JSONC formatting preferences
│   ├── css.ts            ← CSS/SCSS/Less preferences
│   └── sorting.ts        ← import sorting + package.json sorting config
├── dist/                 ← built output (tsdown)
├── package.json
├── tsdown.config.ts
├── tsconfig.json
├── AGENTS.md
├── CLAUDE.md             ← contents: @AGENTS.md
├── README.md
└── LICENSE
```

## Config presets to define

### `base` — The foundation (spread first, always)
```ts
export const base = {
  $schema: './node_modules/oxfmt/configuration_schema.json',
  printWidth: 100,        // oxfmt default (not Prettier's 80)
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  singleAttributePerLine: false,
  insertFinalNewline: true,
} as const;
```

### `typescript` — TS-specific (currently same as base, but separated for future divergence)
```ts
export const typescript = {
  // Placeholder — TS-specific overrides go here when needed.
  // Having a separate preset allows adding TS-specific rules
  // without touching base.
} as const;
```

### `markdown` — Prose formatting
```ts
export const markdown = {
  proseWrap: 'preserve',  // don't rewrap markdown prose
  printWidth: 80,          // narrower for readability in docs
} as const;
```

### `json` — JSON files
```ts
export const json = {
  tabWidth: 2,
  trailingComma: 'none',  // JSON doesn't support trailing commas
} as const;
```

### `css` — CSS/SCSS/Less
```ts
export const css = {
  singleQuote: false,     // CSS convention: double quotes
} as const;
```

### `sorting` — Import and package.json sorting
```ts
export const sorting = {
  organizeImports: true,
  sortPackageJson: {
    sortScripts: false,   // keep manual script ordering (our convention)
  },
} as const;
```

## Type safety

Each preset should be typed against oxfmt's config schema. If oxfmt exports `FormatOptions` from its npm package, use that:

```ts
import type { FormatOptions } from 'oxfmt';

export const base: FormatOptions = { ... };
```

If not available, define a local type from the JSON schema at `node_modules/oxfmt/configuration_schema.json` or use `Record<string, unknown>` and add types later.

## package.json

```json
{
  "name": "@finografic/oxfmt-config",
  "version": "0.1.0",
  "type": "module",
  "description": "Shareable oxfmt configuration presets.",
  "main": "./dist/index.mjs",
  "types": "./dist/index.d.mts",
  "exports": {
    ".": {
      "types": "./dist/index.d.mts",
      "import": "./dist/index.mjs"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsdown",
    "typecheck": "tsc --noEmit",
    "release.github.patch": "pnpm run release.check && pnpm version patch && git push --follow-tags",
    "release.github.minor": "pnpm run release.check && pnpm version minor && git push --follow-tags",
    "release.check": "pnpm typecheck",
    "release.publish": "pnpm publish --registry https://npm.pkg.github.com"
  },
  "peerDependencies": {
    "oxfmt": ">=0.41.0"
  },
  "devDependencies": {
    "oxfmt": "^0.41.0",
    "tsdown": "^0.20.3",
    "typescript": "^5.9.3"
  }
}
```

Key decisions:
- `oxfmt` is a `peerDependency` — the consuming project provides it
- `oxfmt` is also in `devDependencies` for local development/type checking
- No runtime dependencies — this package only exports plain objects

## tsdown.config.ts

```ts
import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  clean: true,
});
```

## Consumer usage

### Installation
```bash
pnpm add -D oxfmt @finografic/oxfmt-config
```

### Config file (`.oxfmtrc.ts`)
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

### lint-staged
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

### VS Code / Cursor settings
```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

## README.md content outline

1. Package name + one-line description
2. What it provides (composable presets: base, typescript, markdown, json, css, sorting)
3. Installation (pnpm add -D)
4. Usage example (the .oxfmtrc.ts consumer config above)
5. Available presets table (name, description, key options)
6. lint-staged example
7. Editor setup note (link to oxc.rs docs)
8. License

## Important notes

- Oxfmt config supports `.oxfmtrc.ts` files — this is what makes the shareable config pattern work. Without TS config support, we'd be stuck with copy/paste JSON.
- The `$schema` field in base points to the consumer's local oxfmt install for editor validation.
- `sorting.sortPackageJson.sortScripts: false` — we use decorative script separators in package.json which would be destroyed by alphabetical sorting.
- `defineConfig` from oxfmt is optional but provides type checking and autocomplete.
- Check if oxfmt exports `defineConfig` and `FormatOptions` from its npm package. If not, the consumer can skip `defineConfig` and just use a plain default export.
