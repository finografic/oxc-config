# Migration Guide

---

## v1.x → v2.0.0: Package rename to `@finografic/oxc-config`

`@finografic/oxfmt-config` is now `@finografic/oxc-config`. The package now includes both oxfmt (formatter) and oxlint (linter) configuration in one install.

### 1. Swap dependencies

```bash
# Remove old package
pnpm remove @finografic/oxfmt-config

# Add new package (includes both formatter and linter config)
pnpm add -D @finografic/oxc-config
```

Add `oxlint` as a peer dep if not already installed:

```bash
pnpm add -D oxlint
```

### 2. Update import paths

```diff
- import { base, css, json, markdown, sorting, ignorePatterns } from '@finografic/oxfmt-config';
+ import { base, css, json, markdown, sorting, ignorePatterns } from '@finografic/oxc-config/oxfmt';
```

Granular formatter exports live under the **`@finografic/oxc-config/oxfmt`** subpath. The package root also exposes **`oxfmtConfig`** if you prefer a single spreadable object.

### 3. New exports (additive — no breaking changes)

| Export                         | Type             | Purpose                                               |
| ------------------------------ | ---------------- | ----------------------------------------------------- |
| `html`                         | Preset           | HTML formatting options (previously unexported)       |
| `react`                        | Preset           | JSX/React formatting options (previously unexported)  |
| `jsdoc`                        | Preset           | JSDoc formatting block (already spread inside `base`) |
| `oxfmtConfig`                  | object           | Ready-to-spread default oxfmt config (package root)   |
| `oxlintConfig`                 | object           | Ready-to-spread default oxlint config (package root)  |
| `plugins`                      | `string[]`       | Oxlint plugin list (`@finografic/oxc-config/oxlint`)  |
| `env`, `options`               | objects          | Oxlint environment and tooling options                |
| `categories`                   | object           | Category severities                                   |
| `ignorePatterns`               | `string[]`       | Oxlint-specific ignore globs                          |
| `rules`, `loosenRules`         | maps             | Composed rule set for oxlint                          |
| `baseRules`, `typescriptRules` | maps             | Lower-level rule maps merged into `rules`             |
| `testOverrides`                | `OxlintOverride` | Relaxed rules for test files                          |
| `configOverrides`              | `OxlintOverride` | Allows default exports in config files                |

### 4. Migrate your oxlint config to use shared pieces (optional)

If you have an `oxlint.config.ts` in your project, import from **`@finografic/oxc-config/oxlint`** (or spread **`oxlintConfig`** from `@finografic/oxc-config`):

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

## Migrating from dprint

### 1. Swap dependencies

```bash
# Remove dprint and its shared config
pnpm remove dprint @finografic/dprint-config

# Add oxfmt and the shared config
pnpm add -D oxfmt @finografic/oxc-config
```

Delete the root `dprint.jsonc` (or `dprint.json`) config file.

### 2. Create `oxfmt.config.ts`

At the workspace root:

```ts
import { defineConfig } from 'oxfmt';
import type { OxfmtConfig, OxfmtOverrideConfig } from '@finografic/oxc-config/oxfmt';
import {
  agentMarkdown,
  AGENT_DOC_MARKDOWN_PATHS,
  base,
  css,
  ignorePatterns,
  json,
  markdown,
  sorting,
} from '@finografic/oxc-config/oxfmt';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    {
      files: ['*.md', '*.mdx'],
      excludeFiles: [...AGENT_DOC_MARKDOWN_PATHS],
      options: { ...markdown },
    },
    {
      files: [...AGENT_DOC_MARKDOWN_PATHS],
      excludeFiles: [],
      options: { ...agentMarkdown },
    },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ] satisfies OxfmtOverrideConfig[],
} satisfies OxfmtConfig);
```

### 3. Update `package.json` scripts

| Before (dprint)                  | After (oxfmt)                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `"format:check": "dprint check"` | `"format:check": "oxfmt --check"`                                                             |
| `"format": "dprint fmt --diff"`  | `"format": "oxfmt"`                                                                           |
| `"update.dprint-config": "..."`  | Remove (or replace with `"update.oxfmt-config": "pnpm add -D @finografic/oxc-config@latest"`) |

### 4. Update lint-staged

If you use oxlint for JS/TS, align with this package’s pattern (oxfmt before oxlint on staged code; see the root `package.json` in `@finografic/oxc-config` for a full example):

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

### 5. Update git hooks

If using `simple-git-hooks`, update the pre-commit command:

```json
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged --allow-empty && oxfmt --no-error-on-unmatched-pattern"
  }
}
```

**CRITICAL:** After changing the hook config, re-register it:

```bash
npx simple-git-hooks
```

Without this step, `.git/hooks/pre-commit` still contains the old `dprint check` command.

### 6. Update editor settings

In `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file"
}
```

### 7. Ensure `"type": "module"` is set

Without `"type": "module"` in the workspace root `package.json`, Node logs a `MODULE_TYPELESS_PACKAGE_JSON` warning when loading `oxfmt.config.ts`. Add it if not already present.

---

## Migrating from Prettier

Oxfmt is Prettier-compatible and passes 100% of Prettier's JavaScript and TypeScript conformance tests.

**[oxc.rs/docs/guide/usage/formatter/migrate-from-prettier](https://oxc.rs/docs/guide/usage/formatter/migrate-from-prettier.html)**

For a quick migration in simple setups:

```bash
pnpm add -D oxfmt@latest && pnpm oxfmt --migrate=prettier && pnpm oxfmt
```

When migrating **to `@finografic/oxc-config`** specifically, replace your `.prettierrc` with the `oxfmt.config.ts` shown in the dprint section above.

### Key differences from Prettier

- Oxfmt's default `printWidth` is **100** (Prettier uses 80). The `@finografic/oxc-config` `base` preset sets it to **110**.
- Prettier plugins are not supported by oxfmt. Built-in equivalents exist for Tailwind CSS class sorting (`sortTailwindcss`) and import sorting (`sortImports`).
- If continuing to use ESLint alongside oxfmt, keep `eslint-config-prettier` to disable ESLint styling rules that conflict.

---

## Known gotchas

### `$schema` silently resets formatting options

`$schema` is a JSON meta-property for editor hints — it is **not** an oxfmt formatting option. If an object you spread into `defineConfig()` includes `$schema`, oxfmt may re-initialize from the schema file and reset all options to defaults.

**Always set `$schema` directly on `defineConfig({...})`, never inside a preset object.**

### Import sorting conflicts

If your project uses ESLint `simple-import-sort` as the source of truth for import order, **do not enable** oxfmt's `sortImports`. The two tools may disagree on ordering. Omit `...sorting` or configure only `sorting.rules` / `sorting.sortPackageJson`.

### Breaking rename in v1.0.0 (pre-v2)

```diff
- import { SORTING_GROUP_HOOKS_ROUTES } from '@finografic/oxfmt-config';
+ import { SORTING_GROUP_HOOKS, SORTING_GROUP_CLIENT_ROUTES } from '@finografic/oxc-config/oxfmt';
```

---

## Further reading

- [`@finografic/oxc-config` README](https://github.com/finografic/oxc-config/blob/master/README.md) — presets, sorting groups, linting pieces
- [docs/SETUP_OXFMT_CONFIG.md](./docs/SETUP_OXFMT_CONFIG.md) — formatter config details and gotchas
- [docs/SETUP_OXLINT_CONFIG.md](./docs/SETUP_OXLINT_CONFIG.md) — linter config details and composition patterns
- [docs/OXFMT_SORT_GROUPS.md](./docs/OXFMT_SORT_GROUPS.md) — import sorting groups and presets
- [oxfmt config reference](https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html)
- [oxlint rules reference](https://oxc.rs/docs/guide/usage/linter/rules.html)
