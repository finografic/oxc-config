# Setting Up oxlint.config.ts

A guide to configuring oxlint using the composable pieces exported from `@finografic/oxc-config`.

---

## How the config is structured

| Export               | Source                                 | Purpose                                                  |
| -------------------- | -------------------------------------- | -------------------------------------------------------- |
| `lintPlugins`        | `src/oxlint/plugins.ts`                | Plugin list (eslint, typescript, unicorn, react, …)      |
| `lintOptions`        | `src/oxlint/options.ts`                | `env` (builtin, node) + `options` (typeCheck, typeAware) |
| `lintCategories`     | `src/oxlint/categories.ts`             | `{ correctness: 'error', perf: 'error' }`                |
| `lintIgnorePatterns` | `src/oxlint/ignore.patterns.ts`        | Globs oxlint should skip (`*.d.ts`, `.astro/**`, …)      |
| `baseRules`          | `src/oxlint/rules/base.rules.ts`       | Core TypeScript + import + ESLint rule set               |
| `testOverrides`      | `src/oxlint/rules/test.overrides.ts`   | Relaxed rules for `*.spec.ts` / `*.test.ts` files        |
| `configOverrides`    | `src/oxlint/rules/config.overrides.ts` | Allows default exports in config files                   |

All pieces are compiled to `dist/index.mjs` via `pnpm build` (tsdown).

---

## Minimal setup

Install the package and peer deps:

```bash
pnpm add -D oxlint @finografic/oxc-config
```

Create `oxlint.config.ts` at your project root:

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

---

## Composition patterns

### Adding rules without losing the base set

```ts
export default defineConfig({
  plugins: [...lintPlugins],
  ...lintOptions,
  rules: {
    ...baseRules,
    'unicorn/no-array-for-each': 'error',
  },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...lintIgnorePatterns],
} satisfies OxlintConfig);
```

### Extending ignore patterns

```ts
export default defineConfig({
  plugins: [...lintPlugins],
  ...lintOptions,
  rules: { ...baseRules },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...lintIgnorePatterns, '**/generated/**'],
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
  plugins: [...lintPlugins],
  ...lintOptions,
  rules: { ...baseRules },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides, storybookOverrides],
  ignorePatterns: [...lintIgnorePatterns],
} satisfies OxlintConfig);
```

### Disabling type-aware rules (faster, no tsconfig required)

```ts
export default defineConfig({
  plugins: [...lintPlugins],
  env: { ...lintOptions.env },
  options: {
    typeCheck: false,
    typeAware: false,
    reportUnusedDisableDirectives: 'error',
  },
  rules: { ...baseRules },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...lintIgnorePatterns],
} satisfies OxlintConfig);
```

---

## Understanding `lintOptions`

`lintOptions` is a plain object that spreads two top-level keys into `defineConfig`:

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
- `options.typeCheck / typeAware` — enables `@typescript-eslint`-style rules that require a tsconfig

For browser-only projects, override `env` after spreading:

```ts
export default defineConfig({
  ...lintOptions,
  env: { builtin: true, browser: true },
  // ...
});
```

---

## Type-aware linting with `oxlint-tsgolint`

Some rules in `baseRules` (e.g. `typescript/await-thenable`, `typescript/no-floating-promises`) require type information. To enable them:

```bash
pnpm add -D oxlint-tsgolint
```

Then ensure your `tsconfig.json` is at the project root or pass `--tsconfig` to the CLI. Type-aware rules are disabled when `typeCheck: false`.

---

## Workflow

Because `oxlint.config.ts` imports from `./dist/index.mjs`, **you must rebuild dist before changes to `src/` take effect**:

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

---

## File layout (this repo)

| File                                   | Purpose                                     |
| -------------------------------------- | ------------------------------------------- |
| `src/oxlint/plugins.ts`                | `lintPlugins` array                         |
| `src/oxlint/categories.ts`             | `lintCategories` object                     |
| `src/oxlint/options.ts`                | `lintOptions` object (env + options)        |
| `src/oxlint/ignore.patterns.ts`        | `lintIgnorePatterns` array                  |
| `src/oxlint/rules/base.rules.ts`       | `baseRules` — core rule set (~60+ rules)    |
| `src/oxlint/rules/test.overrides.ts`   | `testOverrides` — test file relaxations     |
| `src/oxlint/rules/config.overrides.ts` | `configOverrides` — config file relaxations |
| `src/oxlint/index.ts`                  | Barrel re-exporting all oxlint pieces       |
