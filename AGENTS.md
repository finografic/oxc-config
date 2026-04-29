# AGENTS.md — AI Assistant Guide

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
- ESLint & style: `.github/instructions/code/eslint-code-style.instructions.md`
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
- Align column widths so all cells in the same column are equal width.

---

## Git Policy

- IMPORTANT: NEVER include `Co-Authored-By` lines in commit messages. Non-negotiable.
- `.github/instructions/git/git-policy.instructions.md` (see Commits and Releases sections)

---

## Roadmap and Planning Docs

**`docs/todo/ROADMAP.md` is the primary high-level plan for this project.**
**`docs/todo/NEXT_STEPS.md` is the near-term working list** — small tasks, fixes, and manual testing checklists too small for ROADMAP.

- Before proposing or generating new features, check the roadmap for existing items.
- When conceiving a new feature or initiative, add it to the appropriate priority tier.
- Detailed planning docs live alongside in `docs/todo/` as `TODO_*.md` (active) or `DONE_*.md` (complete).
- **TODO/DONE doc conventions:** `.github/instructions/documentation/todo-done-docs.instructions.md`
  — rules for naming, status headers, checkboxes, and graduating `TODO_` → `DONE_`.

---

## Claude Code — Session Memory and Handoff

> This section applies to Claude Code only. Other agents can ignore it.

- **Session log:** `.claude/memory.md` (gitignored) — maintenance rules are in that file.
- **Project state snapshot:** `.agents/handoff.md` (git-tracked) — maintenance rules are in that file.

---

## Learned User Preferences

- When documenting sorting, use current group names (`hooks`, `client-routes`, `server-routes`, `tests`, …) — not the removed `hooks-routes` / `SORTING_GROUP_HOOKS_ROUTES`.
- Prefer linking to `docs/SETUP_OXFMT_CONFIG.md` and `docs/OXFMT_SORT_GROUPS.md` for formatter and import-sort details; link to `docs/SETUP_OXLINT_CONFIG.md` for linter details.
- For agent instruction markdown, prefer narrow path targeting plus `AGENT_DOC_PATHS` / `agentMarkdown` (see `src/oxfmt/ignore-agents.patterns.ts`) over blanket `**/.github/**` ignores when other `.github` markdown should still format; excluding `**/.claude/**` is a common choice for local-only agent files.
- For JSDoc-related linting, prefer a loose profile: do not require exhaustive tags, descriptions on every symbol, or `@example` everywhere unless the user explicitly asks for stricter enforcement.
- With pnpm, forward flags to a script by placing them after `--` (e.g. `pnpm run <script> -- <args>`) so pnpm does not consume them.

## Learned Workspace Facts

- `ignorePatterns` in `src/oxfmt/ignore.patterns.ts` (formatter) deliberately omits blanket `**/.github/**` and `**/.cursor/**`; known agent doc paths are handled via overrides/constants in `src/oxfmt/ignore-agents.patterns.ts`, not by skipping entire `.github` / `.cursor` trees.
- `ignorePatterns` exported from `src/oxlint/ignore.patterns.ts` is the oxlint-specific ignore list — it covers `*.d.ts`, `.astro/**`, and agent tooling dirs that oxlint should skip but oxfmt need not ignore.
- `pnpm oxlint:config:capture` (root `oxlint.config.ts`) writes a resolved snapshot to `internal/configs/oxlint.config.json`; `pnpm oxlint:config:capture:defaults` writes `scripts/oxlint-defaults.config.ts` resolved output to `internal/configs/oxlint-defaults.config.json` (see `scripts/print-oxlint-config.ts`).
