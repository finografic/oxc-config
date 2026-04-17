# Migration Guide

How to migrate your `@finografic` (or any) project to `@finografic/oxfmt-config` from dprint or Prettier.

[@finografic/oxfmt-config](https://github.com/finografic/oxfmt-config)

---

## Migrating from dprint

### 1. Swap dependencies

```bash
# Remove dprint and its shared config
pnpm remove dprint @finografic/dprint-config

# Add oxfmt and the shared config
pnpm add -D oxfmt @finografic/oxfmt-config@^1.0.0
```

Delete the root `dprint.jsonc` (or `dprint.json`) config file.

### 2. Create `oxfmt.config.ts`

At the workspace root:

```ts
import { defineConfig } from 'oxfmt';
import {
  agentMarkdown,
  AGENT_DOC_MARKDOWN_PATHS,
  base,
  css,
  ignorePatterns,
  json,
  markdown,
  sorting,
} from '@finografic/oxfmt-config';

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
  ],
} satisfies ReturnType<typeof defineConfig>);
```

### 3. Update `package.json` scripts

| Before (dprint)                  | After (oxfmt)                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------- |
| `"format:check": "dprint check"` | `"format:check": "oxfmt --check"`                                                               |
| `"format": "dprint fmt --diff"`  | `"format": "oxfmt"`                                                                             |
| `"update.dprint-config": "..."`  | Remove (or replace with `"update.oxfmt-config": "pnpm add -D @finografic/oxfmt-config@latest"`) |

### 4. Update lint-staged

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,mjs,cjs}": ["eslint --fix", "oxfmt --no-error-on-unmatched-pattern"],
    "*.md": ["eslint --fix", "oxfmt --no-error-on-unmatched-pattern"],
    "*.{json,jsonc,yml,yaml,toml}": ["oxfmt --no-error-on-unmatched-pattern"]
  }
}
```

Run ESLint **first**, then oxfmt — so formatting always has final say.

### 5. Update git hooks

If using `simple-git-hooks`, update the pre-commit command:

```json
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged --allow-empty && oxfmt --no-error-on-unmatched-pattern"
  }
}
```

**🚨 CRITICAL:** After changing the hook config, re-register it:

```bash
npx simple-git-hooks
```

Without this step, `.git/hooks/pre-commit` still contains the old `dprint check` command. If dprint is installed globally (e.g. via Homebrew), the stale hook will appear to work but run the wrong formatter.

### 6. Update editor settings

In `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file"
}
```

In `.vscode/extensions.json`, add `oxc.oxc-vscode` to recommendations and move any dprint extension to `unwantedRecommendations`.

### 7. Clean up

```bash
# Remove dprint from Homebrew if installed globally
brew uninstall dprint

# Remove from pnpm's onlyBuiltDependencies if listed
# (edit package.json manually)

# Add the reformatting commit SHA to .git-blame-ignore-revs
echo "COMMIT_SHA # chore: migrate from dprint to oxfmt" >> .git-blame-ignore-revs
```

Update references to dprint in `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md`, and any other docs.

### 8. Ensure `"type": "module"` is set

Without `"type": "module"` in the workspace root `package.json`, Node logs a `MODULE_TYPELESS_PACKAGE_JSON` warning when loading `oxfmt.config.ts`. Add it if not already present:

```json
{
  "type": "module"
}
```

---

## Migrating from Prettier

Oxfmt is Prettier-compatible and passes 100% of Prettier's JavaScript and TypeScript conformance tests. The official migration guide covers this thoroughly:

**[oxc.rs/docs/guide/usage/formatter/migrate-from-prettier](https://oxc.rs/docs/guide/usage/formatter/migrate-from-prettier.html)**

For a quick migration in simple setups:

```bash
pnpm add -D oxfmt@latest && pnpm oxfmt --migrate=prettier && pnpm oxfmt
```

When migrating **to `@finografic/oxfmt-config`** specifically, replace your `.prettierrc` / `.prettierrc.json` / `prettier.config.js` with the `oxfmt.config.ts` shown in the dprint section above — the shared presets already encode the formatting preferences.

### Key differences from Prettier

- Oxfmt's default `printWidth` is **100** (Prettier uses 80). The `@finografic/oxfmt-config` `base` preset sets it to **110**.
- Prettier plugins are not supported by oxfmt. Built-in equivalents exist for Tailwind CSS class sorting (`sortTailwindcss`) and import sorting (`sortImports`).
- If continuing to use ESLint alongside oxfmt, keep `eslint-config-prettier` to disable ESLint styling rules that conflict. Remove `eslint-plugin-prettier` — it is no longer needed.

### Additional cleanup for Prettier

- Delete `.prettierrc`, `.prettierrc.json`, `.prettierrc.yaml`, `prettier.config.js`, or any Prettier config file.
- Delete `.prettierignore` — move its contents into the `ignorePatterns` array in `oxfmt.config.ts` (or use the shared `ignorePatterns` from `@finografic/oxfmt-config`).
- Uninstall `prettier`, `prettier-plugin-tailwindcss`, `eslint-plugin-prettier`, and any other Prettier-related packages.

---

## Known gotchas

### Import sorting conflicts

If your project uses **ESLint `simple-import-sort`** (or any ESLint import ordering plugin) as the source of truth for import order, **do not enable** oxfmt's `sortImports`. The two tools may disagree on ordering, causing `pnpm lint` to report errors after formatting.

In this case, omit `...sorting` from your config's `sortImports` (you can still spread `sorting.rules` and `sorting.sortPackageJson`), or simply don't spread `sorting` at all and configure only the parts you need.

If oxfmt should be the sole owner of import sorting, use one of the `SORT_PRESET_*` exports and **remove** `eslint-plugin-simple-import-sort` from your ESLint config.

### ESLint `@stylistic/indent` warnings after migration

Oxfmt's JSX wrapping may produce indentation that differs from what `@stylistic/indent` expects. This typically shows up as warnings (not errors) in a small number of files. Fix with `pnpm lint:fix` or disable the rule if oxfmt is the formatting authority.

### Lockfile regeneration

The first `pnpm install` after swapping dependencies will fail under `--frozen-lockfile` (CI). Regenerate the lockfile locally and commit it with the migration:

```bash
pnpm install --no-frozen-lockfile
```

### Stale git hooks

If pre-commit hooks still reference dprint after migration, the old command runs silently (especially if dprint is installed globally via Homebrew). Always run `npx simple-git-hooks` after changing hook config. See step 5 above.

### Generated / machine-written files

Files like generated icon registries or auto-generated barrel exports should be excluded from formatting. Add them to `ignorePatterns` in your `oxfmt.config.ts`. dprint's inline `// dprint-ignore-file` comments are not recognized by oxfmt.

---

## Import sorting: breaking rename in v1.0.0

If you previously used sorting group constants from `@finografic/oxfmt-config` pre-releases:

```diff
- import { SORTING_GROUP_HOOKS_ROUTES } from '@finografic/oxfmt-config';
+ import { SORTING_GROUP_HOOKS, SORTING_GROUP_CLIENT_ROUTES } from '@finografic/oxfmt-config';
```

And update `sortImports.groups` arrays:

```diff
- 'hooks-routes',
+ 'hooks',
+ 'client-routes',
```

---

## Further reading

- [`@finografic/oxfmt-config` README](https://github.com/finografic/oxfmt-config/blob/master/README.md) — presets, sorting groups, `ignorePatterns`, agent doc paths
- [oxfmt config reference](https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html) — all available options
- [Migrate from Prettier](https://oxc.rs/docs/guide/usage/formatter/migrate-from-prettier.html) — official oxfmt guide
- [oxfmt quickstart](https://oxc.rs/docs/guide/usage/formatter/quickstart.html) — installation, editor setup, CI
