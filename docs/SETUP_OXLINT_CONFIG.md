# Setting Up oxlint.config.ts

A guide to configuring oxlint using the composable pieces exported from `@finografic/oxc-config/oxlint`, or the bundled `oxlintConfig` default from `@finografic/oxc-config`.

---

## Package entry points

| Import from                     | Use when                                                                   |
| ------------------------------- | -------------------------------------------------------------------------- |
| `@finografic/oxc-config`        | You want `oxlintConfig` — spread into `defineConfig({ ...oxlintConfig })`. |
| `@finografic/oxc-config/oxlint` | You want individual pieces (`plugins`, `rules`, overrides, …).             |

---

## How the config is structured

| Export            | Source                                     | Purpose                                                      |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------ |
| `plugins`         | `src/oxlint/plugins.ts`                    | Plugin list (eslint, typescript, unicorn, react, …)          |
| `env`             | `src/oxlint/env.ts`                        | Predefined globals (`builtin`, `node`, …)                    |
| `options`         | `src/oxlint/options.ts`                    | `typeCheck`, `typeAware`, `reportUnusedDisableDirectives`, … |
| `categories`      | `src/oxlint/categories.ts`                 | e.g. `{ correctness: 'error', perf: 'error', … }`            |
| `ignorePatterns`  | `src/oxlint/ignore.patterns.ts`            | Globs oxlint should skip (`*.d.ts`, `.astro/**`, …)          |
| `rules`           | `src/oxlint/rules/index.ts`                | Composed `baseRules` + `typescriptRules`                     |
| `baseRules`       | `src/oxlint/rules/base.rules.ts`           | Core rule map (also merged into `rules`)                     |
| `typescriptRules` | `src/oxlint/rules/typescript.rules.ts`     | TypeScript-oriented rules merged into `rules`                |
| `loosenRules`     | `src/oxlint/rules/loosen.rules.ts`         | Small relaxations layered in the shipped default             |
| `testOverrides`   | `src/oxlint/overrides/test.overrides.ts`   | Relaxed rules for `*.spec.ts` / `*.test.ts` files            |
| `configOverrides` | `src/oxlint/overrides/config.overrides.ts` | Allows default exports in config entry files                 |

Granular pieces compile to `dist/oxlint.mjs` via `pnpm build` (tsdown). The package root re-exports `oxlintConfig` from `dist/index.mjs`.

---

## Minimal setup

Install the package and peer deps:

```bash
pnpm add -D oxlint @finografic/oxc-config
```

### Option A — bundled default

```ts
import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';
import { oxlintConfig } from '@finografic/oxc-config';

export default defineConfig({ ...oxlintConfig } satisfies OxlintConfig);
```

### Option B — composable pieces

Create `oxlint.config.ts` at your project root:

```ts
import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import {
  categories,
  configOverrides,
  env,
  ignorePatterns,
  loosenRules,
  options,
  plugins,
  rules,
  testOverrides,
} from '@finografic/oxc-config/oxlint';

export default defineConfig({
  plugins: [...plugins],
  env,
  options,
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig);
```

---

## Composition patterns

### Adding rules without losing the base set

```ts
export default defineConfig({
  plugins: [...plugins],
  env,
  options,
  categories,
  rules: {
    ...rules,
    ...loosenRules,
    'unicorn/no-array-for-each': 'error',
  },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig);
```

### Extending ignore patterns

```ts
export default defineConfig({
  plugins: [...plugins],
  env,
  options,
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns, '**/generated/**'],
} satisfies OxlintConfig);
```

### Adding a custom override

```ts
import type { OxlintOverride } from 'oxlint';

const storybookOverrides: OxlintOverride = {
  files: ['**/*.stories.ts', '**/*.stories.tsx'],
  rules: { 'import/no-default-export': 'off' },
};

export default defineConfig({
  plugins: [...plugins],
  env,
  options,
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides, storybookOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig);
```

### Disabling type-aware rules (faster, no tsconfig required)

```ts
export default defineConfig({
  plugins: [...plugins],
  env,
  options: {
    typeCheck: false,
    typeAware: false,
    reportUnusedDisableDirectives: 'error',
  },
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig);
```

---

## `env` and `options`

These are separate top-level fields on the oxlint config:

```ts
{
  env: { builtin: true, node: true },
  options: {
    typeCheck: true,
    typeAware: true,
    reportUnusedDisableDirectives: 'error',
  },
}
```

- `env.builtin: true` — enables JavaScript built-in globals (`Promise`, `Map`, etc.)
- `env.node: true` — enables Node.js globals (`process`, `__dirname`, etc.)
- `options.typeCheck` / `typeAware` — enables `@typescript-eslint`-style rules that require a tsconfig

For browser-only projects, override `env`:

```ts
export default defineConfig({
  plugins: [...plugins],
  env: { builtin: true, browser: true },
  options,
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig);
```

---

## Type-aware linting with `oxlint-tsgolint`

Some rules in the composed `rules` map (e.g. `typescript/await-thenable`, `typescript/no-floating-promises`) require type information. To enable them:

```bash
pnpm add -D oxlint-tsgolint
```

Then ensure your `tsconfig.json` is at the project root or pass `--tsconfig` to the CLI. Type-aware rules are disabled when `typeCheck: false`.

---

## Workflow

Because `oxlint.config.ts` in this repo imports from `./dist/oxlint.mjs`, **you must rebuild dist before changes to `src/` take effect**:

```bash
pnpm build   # rebuild dist
# or
pnpm dev     # rebuild on file change (tsdown --watch)
```

### Running lint

```bash
pnpm lint            # check all files
pnpm lint:fix        # auto-fix where possible
```

### Capturing resolved config (this repo)

| Command                               | Output                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------ |
| `pnpm oxlint:config:capture`          | `internal/configs/oxlint.config.json` + JSON on stdout (root config)                 |
| `pnpm oxlint:config:capture:defaults` | `internal/configs/oxlint-defaults.config.json` (`scripts/oxlint-defaults.config.ts`) |

---

## File layout (this repo)

| File                                       | Purpose                               |
| ------------------------------------------ | ------------------------------------- |
| `src/oxlint/plugins.ts`                    | `plugins` array                       |
| `src/oxlint/categories.ts`                 | `categories` object                   |
| `src/oxlint/env.ts`                        | `env` object                          |
| `src/oxlint/options.ts`                    | `options` object                      |
| `src/oxlint/ignore.patterns.ts`            | `ignorePatterns` array                |
| `src/oxlint/rules/base.rules.ts`           | `baseRules` — core rule set           |
| `src/oxlint/rules/typescript.rules.ts`     | `typescriptRules`                     |
| `src/oxlint/rules/index.ts`                | Composed `rules` export               |
| `src/oxlint/rules/loosen.rules.ts`         | `loosenRules`                         |
| `src/oxlint/overrides/test.overrides.ts`   | `testOverrides`                       |
| `src/oxlint/overrides/config.overrides.ts` | `configOverrides`                     |
| `src/oxlint/default.config.ts`             | `oxlintConfig` for package root       |
| `src/oxlint/index.ts`                      | Barrel re-exporting all oxlint pieces |
