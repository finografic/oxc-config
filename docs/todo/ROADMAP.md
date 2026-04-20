# Roadmap: Rename & Expand to `@finografic/oxc-config`

> **Note:** This document is largely a historical plan. The shipped package uses **`dist/index.mjs`** for `oxfmtConfig` / `oxlintConfig` only, plus **`dist/oxfmt.mjs`** and **`dist/oxlint.mjs`** for granular imports. Pattern helpers live under **`src/oxfmt/`** (not `src/patterns/`).

## Decision

Merge `@finografic/oxfmt-config` (formatter) and the local `oxlint.config.ts` (linter) into a
single published package: **`@finografic/oxc-config`**.

- Single install, single version, one entry in the generator
- Both tools are oxc siblings — shared ignore patterns and agent doc paths apply to both
- No monorepo — still one package; build emits `dist/index.mjs` plus `dist/oxfmt.mjs` / `dist/oxlint.mjs`

---

## Proposed `src/` Layout

```
src/
  oxfmt/                        ← all formatter exports (moved from src/config/)
    formatting/
      base.config.ts
      css.config.ts
      html.config.ts
      json.config.ts
      jsdoc.config.ts
      markdown.config.ts
      react.config.ts
      sorting.config.ts
      typescript.config.ts
      index.ts
    sorting-groups/
      base.groups.ts
      client.groups.ts
      react.groups.ts
      server.groups.ts
      presets.ts
      index.ts
    types/                      ← moved from src/types/
      oxfmt.types.ts
      sorting.types.ts
    index.ts                    ← re-exports formatting + sorting-groups + types
  oxlint/                       ← new: extracted from root oxlint.config.ts
    rules/
      base.rules.ts             ← the 95+ core rules
      test.overrides.ts         ← vitest / test-file rule relaxations
      config.overrides.ts       ← .oxfmtrc / vitest.config.ts / vite.config.ts overrides
    categories.ts               ← { correctness: 'error', perf: 'error' }
    plugins.ts                  ← the plugins array
    options.ts                  ← { typeCheck: true, typeAware: true, ... }
    index.ts                    ← re-exports all oxlint pieces
  patterns/                     ← shared: used by both oxfmt and oxlint
    ignore.patterns.ts          ← moved from src/config/patterns/
    agent-docs.patterns.ts      ← moved from src/config/patterns/
    index.ts
  index.ts                      ← single public barrel (all three namespaces)
```

**Why `src/patterns/` and not `src/common/` or `src/shared/`?**
The content is specifically glob patterns and agent doc path constants. Naming the folder after what
it contains (`patterns/`) is clearer than a generic structural label. If genuinely cross-cutting
utilities accumulate later, that can be revisited — but for now a named folder beats an abstract one.

---

## Public API Shape

```typescript
// oxfmt — unchanged export names, consumers need no import changes beyond package name
export { base, css, html, json, markdown, react, sorting, typescript } from './oxfmt/formatting';
export { SORTING_GROUP_*, SORT_PRESET_* } from './oxfmt/sorting-groups';
export type { OxfmtConfig, OxfmtOverrideConfig, OxfmtCssConfig, ... } from './oxfmt/types';

// oxlint — new composable pieces
export { lintPlugins } from './oxlint/plugins';
export { lintCategories } from './oxlint/categories';
export { lintOptions } from './oxlint/options';
export { baseRules } from './oxlint/rules/base.rules';
export { testOverrides } from './oxlint/rules/test.overrides';
export { configOverrides } from './oxlint/rules/config.overrides';

// shared patterns — unchanged export names
export { ignorePatterns } from './patterns/ignore.patterns';
export { AGENT_DOC_PATHS, AGENT_DOC_MARKDOWN_PATHS, agentMarkdown } from './patterns/agent-docs.patterns';
```

**Oxlint consumer usage:**

```typescript
import { defineConfig } from 'oxlint';
import {
  baseRules, lintCategories, lintOptions, lintPlugins,
  testOverrides, configOverrides,
} from '@finografic/oxc-config';

export default defineConfig({
  plugins: [...lintPlugins],
  ...lintOptions,
  rules: { ...baseRules },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides],
});
```

---

## tsconfig.json Path Aliases

Update aliases to match new layout:

```jsonc
{
  "paths": {
    "oxfmt/*": ["./src/oxfmt/*"],
    "oxlint/*": ["./src/oxlint/*"],
    "patterns": ["./src/patterns/index.ts"]
  }
}
```

Remove old aliases: `formatting`, `patterns` (old path), `sorting-groups`, `types/*`.

---

## Migration Steps

- [ ] **1. Branch** — create `feat/oxc-config-rename` off master
- [ ] **2. Move files** — relocate `src/config/formatting/` → `src/oxfmt/formatting/`,
      `src/config/sorting-groups/` → `src/oxfmt/sorting-groups/`,
      `src/config/patterns/` → `src/patterns/`,
      `src/types/` → `src/oxfmt/types/`
- [ ] **3. Extract oxlint** — break `oxlint.config.ts` into `src/oxlint/` modules
      (plugins, categories, options, rules/base, rules/test, rules/config)
- [ ] **4. Update internal imports** — fix all `from 'formatting/...'`, `from 'types/...'` etc.
      to match new paths across all moved files
- [ ] **5. Update tsconfig aliases** — swap out old path mappings for new ones
- [ ] **6. Update `src/index.ts`** — new barrel re-exporting all three namespaces
- [ ] **7. Rename package** — `package.json`: name → `@finografic/oxc-config`,
      peer dep oxfmt stays, add oxlint peer dep
- [ ] **8. Version bump** — `2.0.0` (breaking: package rename)
- [ ] **9. Root configs** — update root `oxlint.config.ts` to import from `./dist/index.mjs`
      (same as `oxfmt.config.ts` already does)
- [ ] **10. Update docs** — `AGENTS.md`, `README.md`, `MIGRATION_GUIDE.md`,
      `docs/SETUP_OXFMT_CONFIG.md`, `docs/OXFMT_SORT_GROUPS.md`
- [ ] **11. Add oxlint docs** — `docs/SETUP_OXLINT_CONFIG.md`,
      update `docs/OXFMT_SORT_GROUPS.md` → keep focused on oxfmt
- [ ] **12. Update `.github/` skills** — `migrate-oxlint/SKILL.md` references new package name
- [ ] **13. Build + verify** — `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`
- [ ] **14. PR → master → release 2.0.0**

---

## Open Questions

1. Should `testOverrides` and `configOverrides` from oxlint export as full override objects
   (files + rules combined) or as separate `files` / `rules` pieces for maximum composability?
2. Does oxlint's `defineConfig` accept spread the same way oxfmt does, or does it need a
   different composition pattern? (Check oxlint API before building `src/oxlint/index.ts`.)
3. Existing consumers of `@finografic/oxfmt-config` — is a `MIGRATION_GUIDE.md` entry enough,
   or does the generator need a codemod/auto-update step?
