# @finografic/oxc-config — Handoff

> **How to maintain this file**
> Update after sessions that change architecture, add/remove features, resolve open questions, or shift priorities — not every session.
> — Update only the sections that changed. Keep the total under 150 lines.
> — Write in present tense. No code snippets — describe what exists, not how it works.
> — `.claude/memory.md` = session work log. `.ai/handoff.md` = project state snapshot. Never duplicate between the two.

## Project

`@finografic/oxc-config` — Shareable oxfmt formatter presets and oxlint linter rules for the finografic ecosystem.
Published to GitHub Packages. On `master`. Next publish: bump version and release.

## Architecture

Pure ESM TypeScript library — no runtime code, only exported plain objects (config presets + rule maps). Consumers install the package and spread presets/rules into their own `oxfmt.config.ts` / `oxlint.config.ts`. No `extends` mechanism — composition is via JS object spread.

Build tool: `tsdown` compiles three entries: `src/index.ts` → `dist/index.mjs` (exports `oxfmtConfig` + `oxlintConfig` only), `src/oxfmt/index.ts` → `dist/oxfmt.mjs`, `src/oxlint/index.ts` → `dist/oxlint.mjs`. Root `oxfmt.config.ts` imports `./dist/oxfmt.mjs`; root `oxlint.config.ts` imports `./dist/oxlint.mjs`.

```
src/
  index.ts                       ← oxfmtConfig + oxlintConfig only
  oxfmt/
    formatting/                  ← base, css, html, json, jsdoc, markdown, react, sorting, typescript
    sorting-groups/              ← SORTING_GROUP_*, SORT_PRESET_*
    types/                       ← OxfmtConfig, OxfmtCssConfig, SortImportsConfig, etc.
    ignore.patterns.ts           ← formatter ignorePatterns
    ignore-agents.patterns.ts    ← AGENT_DOC_* , agentMarkdown
    default.config.ts            ← oxfmtConfig object
    index.ts                     ← granular oxfmt public API
  oxlint/
    plugins.ts                   ← plugins
    categories.ts                ← categories
    env.ts / options.ts          ← env + options (separate top-level config keys)
    ignore.patterns.ts           ← ignorePatterns (oxlint)
    rules/                       ← baseRules, typescriptRules, composed rules, loosenRules
    overrides/                   ← testOverrides, configOverrides
    presets/                     ← oxlintClientConfig, oxlintServerConfig, oxlintCliConfig, oxlintLibraryConfig
    default.config.ts            ← oxlintConfig object (composes from oxlintLibraryConfig)
    index.ts                     ← granular oxlint public API
dist/                            ← compiled output (gitignored)
```

## Stack

- `oxfmt >=0.41.0` — peer dependency + devDependency
- `oxlint >=1.0.0` — peer dependency + devDependency
- `oxlint-tsgolint` — devDependency for type-aware rule support
- `type-fest ^5` — `OmitIndexSignature` utility for strict config types
- `tsdown ^0.21` — build tool
- `typescript 6.0.2`
- pnpm, ESM only

## Schema / Types

Key custom types in `src/oxfmt/types/oxfmt.types.ts`:

| Type                  | What it is                                                                   |
| --------------------- | ---------------------------------------------------------------------------- |
| `OxfmtConfig`         | `OmitIndexSignature<OxfmtConfigOriginal>` — strict subset (no catch-all key) |
| `OxfmtOverrideConfig` | Same treatment for overrides                                                 |
| `OxfmtCssConfig`      | Narrow pick for CSS formatting options                                       |
| `OxfmtMarkdownConfig` | Narrow pick for markdown formatting options                                  |
| `OxfmtReactConfig`    | Narrow pick for JSX/React formatting options                                 |
| `SortImportsConfig`   | `OmitIndexSignature<SortImportsConfigOriginal>`                              |

Oxlint pieces use types from the `oxlint` package directly: `DummyRuleMap`, `OxlintOverride`, `OxlintConfig`.

## CLI Commands

```bash
pnpm build           # tsdown → dist/
pnpm typecheck       # tsc --noEmit
pnpm lint            # oxlint -c oxlint.config.ts
pnpm lint:fix        # oxlint --fix
pnpm format:check    # oxfmt --check
pnpm format          # oxfmt
pnpm check           # format:check + lint + typecheck + test:run
pnpm schemas:update  # internal/schemas/*.schema.json from node_modules
pnpm oxlint:config:capture / :capture:defaults  # internal/configs snapshots
pnpm release:github:patch/minor/major
```

## Decisions

1. Merge oxfmt + oxlint config into one package `@finografic/oxc-config` v2.0.0. (2026-04-20)
2. Source layout: `src/oxfmt/` (includes formatter ignores + agent path helpers), `src/oxlint/`, top-level `src/index.ts` for bundled defaults. (2026-04-20)
3. `html` and `react` presets renamed from `htmlConfig`/`reactConfig` and now publicly exported. (2026-04-20)
4. Oxlint exports `ignorePatterns` from `src/oxlint/ignore.patterns.ts` (distinct from oxfmt formatter ignores). (2026-04-20)
5. `baseRules` typed as `DummyRuleMap`; overrides typed as `OxlintOverride` — literal types must match at definition time to survive TypeScript spread checks. (2026-04-20)
6. Bug fix: old `oxlint.config.ts` had `files: '**/*.spec.ts,**/*.test.ts,...'` (comma-separated string) — corrected to array in `testOverrides`. (2026-04-20)
7. Oxlint config passes `env` and `options` as separate fields (both exported from `@finografic/oxc-config/oxlint`). (2026-04-20)
8. `MIGRATION_GUIDE.md` moved to `docs/MIGRATION_GUIDE.md`. (2026-04-20)
9. Use `OmitIndexSignature` from type-fest on oxfmt types. (2026-03-18)
10. Cache schema in `internal/schemas/oxfmt.schema.json`. (2026-03-18)

## Open Questions

(None.)

## Status

On `master`. All checks pass. README has full oxfmt + oxlint sections including the new "Linter presets"
section with the four presets (`oxlintClientConfig`, `oxlintServerConfig`, `oxlintCliConfig`,
`oxlintLibraryConfig`). Next: bump version and publish to GitHub Packages.
