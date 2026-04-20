# Setting Up oxfmt.config.ts

A guide to configuring oxfmt in this repo, including a critical gotcha that causes formatting options to silently fall back to defaults.

---

## How the config is structured

| Export / area                                              | Source                                | Purpose                                            |
| ---------------------------------------------------------- | ------------------------------------- | -------------------------------------------------- |
| `base`, `typescript`, `json`, `markdown`, `css`, `sorting` | `src/oxfmt/formatting/`               | Named formatting and sort presets                  |
| `ignorePatterns`                                           | `src/oxfmt/ignore.patterns.ts`        | Globs to exclude from formatting                   |
| `AGENT_DOC_*`, `agentMarkdown`                             | `src/oxfmt/ignore-agents.patterns.ts` | Agent instruction paths + relaxed markdown options |
| `SORTING_GROUP_*`, `SORT_PRESET_*`                         | `src/oxfmt/sorting-groups/`           | Composable import-sort groups                      |

These are compiled to `dist/oxfmt.mjs` via `pnpm build` (tsdown). The root `oxfmt.config.ts` imports from the compiled dist — not from source — so TypeScript path aliases in `src/` do not affect the formatter binary.

> **Package rename:** In v2.0.0 the package was renamed from `@finografic/oxfmt-config` to `@finografic/oxc-config`. Update your install command and import paths accordingly.

---

## The `$schema` gotcha

### What goes wrong

`$schema` is a JSON meta-property for editor validation hints. It is **not** an oxfmt formatting option. If an object you spread into `defineConfig()` includes `$schema`, oxfmt may treat it as a directive to re-initialize from the referenced schema file — resetting options to schema defaults.

The shipped `base` preset in this repo (`src/oxfmt/formatting/base.config.ts`) **omits** `$schema` so `...base` is safe. Set `$schema` only on the top-level `defineConfig({ ... })` argument (as in the root `oxfmt.config.ts`).

Example of what **not** to put inside a spread preset:

```ts
export const badBase = {
  $schema: './node_modules/oxfmt/configuration_schema.json',
  semi: false,
  // ...
};
```

### Symptom

Files format with oxfmt defaults instead of your configured values — even though the values are correct in the dist. Directly setting `semi: false` in the config works. Spreading `...base` does not.

### The fix

**IMPORTANT:** Keep `$schema` on the object passed to `defineConfig`, not inside preset spreads.

```ts
import { defineConfig } from 'oxfmt';
import { base, sorting, markdown, json, css, ignorePatterns } from './dist/oxfmt.mjs';

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

### Why the other spreads (`sorting`, `markdown`, `css`) are unaffected

None of those objects include `$schema`.

---

## Workflow: editing and testing

Because `oxfmt.config.ts` imports from `./dist/oxfmt.mjs`, **you must rebuild dist before changes to `src/` take effect**:

```bash
pnpm build        # rebuild dist
# or
pnpm dev          # rebuild on file change (tsdown --watch)
```

### Testing format behavior on save (VSCode)

1. Ensure `oxc.fmt.configPath` is set in `.vscode/settings.json` if you want to pin the config path explicitly:

   ```json
   "oxc.fmt.configPath": "oxfmt.config.ts"
   ```

   Without this, the oxc extension uses automatic config discovery. If multiple config files exist in the project root (e.g. `_.oxfmtrc.json`), discovery order may pick up the wrong one.

2. Open a test file with mixed formatting (semis + no-semis, mixed quotes).
3. Save. The formatter applies immediately if `editor.formatOnSave` is `true`.

### Verifying via CLI

```bash
# Format a specific file and check the output
npx oxfmt src/oxfmt/types/sorting.types.ts

# Check without writing (exit 1 if unformatted)
npx oxfmt --check src/oxfmt/types/sorting.types.ts
```

---

## Config object reference

The final merged config object that oxfmt receives looks like this (from `dist/oxfmt.mjs`):

```ts
// from base (see base.config.ts for current values):
{
  printWidth: 110,
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
}

// from sorting:
{
  sortImports: { newlinesBetween: false, customGroups: [...], groups: [...] },
  rules: { 'typescript/no-import-type-side-effects': 'error' },
  sortPackageJson: false,
}
```

Per-file overrides are layered on top via the `overrides` array.

---

## Agent instruction markdown

This repo exports `AGENT_DOC_MARKDOWN_PATHS` and `agentMarkdown` from `src/oxfmt/ignore-agents.patterns.ts`. The root `oxfmt.config.ts` applies the standard `markdown` preset to most `*.md` / `*.mdx` files, **excludes** those paths, and applies `agentMarkdown` only to agent instruction files so Copilot/Cursor/Claude paths stay formatted consistently without fighting stricter prose rules on normal docs.
