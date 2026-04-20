# AGENTS.md - AI Assistant Guide

## Rules - Project-Specific

Project-specific rules live in `.github/instructions/project/*.instructions.md`.

- This repo is **`@finografic/oxc-config`**: shareable [oxfmt](https://oxc.rs/docs/guide/usage/formatter) formatter presets and [oxlint](https://oxc.rs/docs/guide/usage/linter) linting rules for the finografic ecosystem.
- **Standalone package** (not a monorepo workspace root). Published to GitHub Packages (`https://npm.pkg.github.com`).
- **Source layout:** `src/oxfmt/` (formatting presets, sorting groups, types); `src/oxlint/` (plugins, categories, options, ignore patterns, rules); `src/patterns/` (shared ignore globs and agent-doc path helpers). Public API: `src/index.ts` → `dist/index.mjs`.
- Root **`oxfmt.config.ts`** and **`oxlint.config.ts`** both import from `./dist/index.mjs` (rebuild with `pnpm build` after changing `src/`).
- **Hooks:** `simple-git-hooks` pre-commit runs `lint-staged` then `oxfmt`; `lint-staged` runs ESLint before oxfmt on code and Markdown (see `package.json`).

## Rules — Global

Rules are canonical in `.github/instructions/` and shared across Claude Code, Cursor, and GitHub Copilot.
Follow general TypeScript, ESLint, and naming conventions from prior context.

- General: `.github/instructions/00-general.instructions.md`
- File Naming: `.github/instructions/01-file-naming.instructions.md`
- TypeScript: `.github/instructions/02-typescript-patterns.instructions.md`
- ESLint & Style: `.github/instructions/04-eslint-code-style.instructions.md`
- Documentation: `.github/instructions/05-documentation.instructions.md`
- Modern TS Patterns: `.github/instructions/06-modern-typescript-patterns.instructions.md`
- Variable Naming: `.github/instructions/07-variable-naming.instructions.md`
- README Standards: `.github/instructions/08-readme-standards.instructions.md`
- Picocolors CLI styling: `.github/instructions/09-picocolors-cli-styling.instructions.md`
- Git Policy: `.github/instructions/10-git-policy.instructions.md`
- Agent-facing Markdown: `.github/instructions/11-agent-facing-markdown.instructions.md`
- Feature Design Specs: `.github/instructions/12-feature-design-specs.instructions.md`

## Rules - Markdown Tables

- Padded pipes: one space on each side of every `|`, including the separator row.
- Align column widths so all cells in the same column are equal width.

## Git Policy

- IMPORTANT: NEVER include `Co-Authored-By` lines in commit messages. Not ever, not for any reason.
- [Git — Commits](/.github/instructions/10-git-policy.instructions.md#commits)
- [Git — Releases](/.github/instructions/10-git-policy.instructions.md#releases)

## Learned User Preferences

- When documenting sorting, use current group names (`hooks`, `client-routes`, `server-routes`, `tests`, …) — not the removed `hooks-routes` / `SORTING_GROUP_HOOKS_ROUTES`.
- Prefer linking to `docs/SETUP_OXFMT_CONFIG.md` and `docs/OXFMT_SORT_GROUPS.md` for formatter and import-sort details; link to `docs/SETUP_OXLINT_CONFIG.md` for linter details.
- For agent instruction markdown, prefer narrow path targeting plus `AGENT_DOC_PATHS` / `agentMarkdown` (see `src/patterns/agent-docs.patterns.ts`) over blanket `**/.github/**` ignores when other `.github` markdown should still format; excluding `**/.claude/**` is a common choice for local-only agent files.

## Learned Workspace Facts

- `ignorePatterns` in `src/patterns/ignore.patterns.ts` deliberately omits blanket `**/.github/**` and `**/.cursor/**`; known agent doc paths are handled via overrides/constants in `agent-docs.patterns.ts`, not by skipping entire `.github` / `.cursor` trees.
- `lintIgnorePatterns` in `src/oxlint/ignore.patterns.ts` is the oxlint-specific counterpart — it covers `*.d.ts`, `.astro/**`, and agent tooling dirs that oxlint should skip but oxfmt need not ignore.
