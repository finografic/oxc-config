# AGENTS.md — AI Assistant Guide

## Project Memory Model

- `docs/todo/ROADMAP.md` = milestone plan, near-term tasks, and completed history.
- `.agents/handoff.md` = stable current project state.
- `.agents/memory.md` = chronological session log.

Promote durable findings from memory → handoff, priorities and follow-ups → roadmap.

Reference: [`docs/process/PROJECT_MEMORY_MODEL.md`](./docs/process/PROJECT_MEMORY_MODEL.md)

---

## Roadmap and Planning Docs

- Check `ROADMAP.md` before proposing new initiatives.
- Use `ROADMAP.md#next` for small follow-ups and manual validation.
- Keep detailed plans in `docs/todo/TODO_*.md`; graduate completed plans to `DONE_*.md`.
- Follow `.github/instructions/documentation/todo-done-docs.instructions.md`.

---

## Rules — Project-Specific

Project-specific rules live in `.github/instructions/project/*.instructions.md`.

- This repo is **`@finografic/oxc-config`**: shareable [oxfmt](https://oxc.rs/docs/guide/usage/formatter) formatter presets and [oxlint](https://oxc.rs/docs/guide/usage/linter) linting rules for the finografic ecosystem.
- **Standalone package** (not a monorepo workspace root). Published to GitHub Packages (`https://npm.pkg.github.com`).
- **Source layout:** `src/oxfmt/` (formatting presets, sorting groups, types, `ignore.patterns.ts`, `ignore-agents.patterns.ts`); `src/oxlint/` (plugins, categories, env, options, ignore patterns, rules, overrides). **Package root** (`src/index.ts`) exports `oxfmtConfig` and `oxlintConfig` → `dist/index.mjs`. **Granular API:** `src/oxfmt/index.ts` → `dist/oxfmt.mjs`, `src/oxlint/index.ts` → `dist/oxlint.mjs`.
- Root **`oxfmt.config.ts`** imports `./dist/oxfmt.mjs`; **`oxlint.config.ts`** imports `./dist/oxlint.mjs` (rebuild with `pnpm build` or `pnpm dev` after changing `src/`).
- **Hooks:** `simple-git-hooks` pre-commit runs `lint-staged` then `oxfmt`; `lint-staged` runs oxfmt then oxlint on TS/JS, oxfmt + md-lint on Markdown (see `package.json`).

## Rules — Global

Rules are canonical in `.github/instructions/` — see `README.md` there for folder structure.
Shared across Claude Code, Cursor, and GitHub Copilot.

**General**

- General baseline: `.github/instructions/general.instructions.md`

**Code**

- TypeScript patterns: `.github/instructions/code/typescript-patterns.instructions.md`
- Modern TS patterns: `.github/instructions/code/modern-typescript-patterns.instructions.md`
- Oxlint & style: `.github/instructions/code/linting-code-style.instructions.md`
- Provider/context patterns: `.github/instructions/code/provider-context-patterns.instructions.md`
- Picocolors CLI styling: `.github/instructions/code/picocolors-cli-styling.instructions.md`

**Naming**

- File naming: `.github/instructions/naming/file-naming.instructions.md`
- Variable naming: `.github/instructions/naming/variable-naming.instructions.md`

**Documentation**

- Documentation: `.github/instructions/documentation/documentation.instructions.md`
- README standards: `.github/instructions/documentation/readme-standards.instructions.md`
- Agent-facing markdown: `.github/instructions/documentation/agent-facing-markdown.instructions.md`
- Feature design specs: `.github/instructions/documentation/feature-design-specs.instructions.md`
- TODO/DONE docs: `.github/instructions/documentation/todo-done-docs.instructions.md`

**Git**

- Git policy: `.github/instructions/git/git-policy.instructions.md`

---

## Rules — Markdown Tables

- Padded pipes: one space on each side of every `|`, including the separator row.
- **Do NOT manually align column widths or pad cells to equal width.** `oxfmt` (run automatically
  by lint-staged on commit and by `pnpm format:fix`) fixes table alignment automatically. Spending
  tokens counting characters and iterating on spacing is wasted effort — write the content, let the
  formatter handle alignment.

---

## Git Policy

- Do not include `Co-Authored-By` lines in commit messages.
- `.github/instructions/git/git-policy.instructions.md` (see Commits and Releases sections)

---

## Cursor

- Always-on rules: `.cursor/rules/` (`alwaysApply` — entry point is `AGENTS.md`, same as `CLAUDE.md`)

---

## Learned User Preferences

- When documenting sorting, use current group names (`hooks`, `client-routes`, `server-routes`, `path-alias`, `tests`, …) — not the removed `hooks-routes` / `SORTING_GROUP_HOOKS_ROUTES`.
- Keep README oxlint and **Preset Usage** (all four `oxlint*Config` examples) near the top — preset copy-paste blocks were hard to find when buried mid-document.
- Prefer linking to `docs/SETUP_OXFMT_CONFIG.md` and `docs/OXFMT_SORT_GROUPS.md` for formatter and import-sort details; link to `docs/SETUP_OXLINT_CONFIG.md` for linter details.
- For agent instruction markdown, prefer narrow path targeting plus `AGENT_DOC_PATHS` / `agentMarkdown` (see `src/oxfmt/ignore-agents.patterns.ts`) over blanket `**/.github/**` ignores when other `.github` markdown should still format; excluding `**/.claude/**` is a common choice for local-only agent files.
- For JSDoc-related linting, prefer a loose profile: do not require exhaustive tags, descriptions on every symbol, or `@example` everywhere unless the user explicitly asks for stricter enforcement.
- With pnpm, forward flags to a script by placing them after `--` (e.g. `pnpm run <script> -- <args>`) so pnpm does not consume them.

## Learned Workspace Facts

- `ignorePatterns` in `src/oxfmt/ignore.patterns.ts` (formatter) deliberately omits blanket `**/.github/**` and `**/.cursor/**`; known agent doc paths are handled via overrides/constants in `src/oxfmt/ignore-agents.patterns.ts`, not by skipping entire `.github` / `.cursor` trees.
- `ignorePatterns` exported from `src/oxlint/ignore.patterns.ts` is the oxlint-specific ignore list — it covers `*.d.ts`, `.astro/**`, and agent tooling dirs that oxlint should skip but oxfmt need not ignore.
- `pnpm oxlint:config:capture` (root `oxlint.config.ts`) writes a resolved snapshot to `internal/configs/oxlint.config.json`; `pnpm oxlint:config:capture:defaults` writes `scripts/oxlint-defaults.config.ts` resolved output to `internal/configs/oxlint-defaults.config.json` (see `scripts/print-oxlint-config.ts`).
- `SORTING_GROUP_PATH_ALIAS` (`path-alias`, pattern `@/**`) sits after `workspace` and before `lib-utils` in base and preset sort orders; `@finografic/**` / `@workspace/**` stay in `workspace`.
- Base import-sort `customGroups`, `groups`, and shared options live in `src/oxfmt/sorting-groups/orders.ts`; `src/oxfmt/formatting/sorting.config.ts` imports from there — do not duplicate group patterns inline.
- Avoid `as const` on `sortImports` / sorting group exports when spreading into `OxfmtConfig`; prefer `satisfies` plus explicit `OxfmtConfig` / `SortingPreset` typing so root `oxfmt.config.ts` type-checks.
- The npm `globals` package is unused here (oxlint `env.globals` is unrelated); consumers do not need it.
