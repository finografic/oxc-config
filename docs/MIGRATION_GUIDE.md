# Migration Guide

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

| Before (dprint)                  | After (oxfmt)                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------------- |
| `"format:check": "dprint check"` | `"format:check": "oxfmt --check"`                                                           |
| `"format": "dprint fmt --diff"`  | `"format": "oxfmt"`                                                                         |
| `"update.dprint-config": "..."`  | Remove (or replace with `"update:oxc-config": "pnpm add -D @finografic/oxc-config@latest"`) |

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

---

## Further reading

- [`@finografic/oxc-config` README](https://github.com/finografic/oxc-config/blob/master/README.md) — presets, sorting groups, linting pieces
- [docs/SETUP_OXFMT_CONFIG.md](./docs/SETUP_OXFMT_CONFIG.md) — formatter config details and gotchas
- [docs/SETUP_OXLINT_CONFIG.md](./docs/SETUP_OXLINT_CONFIG.md) — linter config details and composition patterns
- [docs/OXFMT_SORT_GROUPS.md](./docs/OXFMT_SORT_GROUPS.md) — import sorting groups and presets
- [oxfmt config reference](https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html)
- [oxlint rules reference](https://oxc.rs/docs/guide/usage/linter/rules.html)
