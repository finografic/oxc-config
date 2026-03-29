# AGENTS.md - AI Assistant Guide

Rules are canonical in `.github/instructions/` and shared across Claude Code, Cursor, and GitHub Copilot.

## Rules - General

- IMPORTANT: NEVER include `Co-Authored-By` lines in commit messages. Not ever, not for any reason.

## Rules - Markdown Tables

- Padded pipes: one space on each side of every `|`, including the separator row.
- Align column widths so all cells in the same column are equal width.

## Rule Files

> Note: the full `.github/instructions/` rule set from the monorepo has not been copied here yet.
> Until it is, follow general TypeScript, ESLint, and naming conventions from prior context.

- [General](/.github/instructions/00-general.instructions.md)
- [File Naming](/.github/instructions/01-file-naming.instructions.md)
- [TypeScript Patterns](/.github/instructions/02-typescript-patterns.instructions.md)
- [Provider & Context Patterns](/.github/instructions/03-provider-context-patterns.instructions.md)
- [ESLint & Code Style](/.github/instructions/04-eslint-code-style.instructions.md)
- [Documentation](/.github/instructions/05-documentation.instructions.md)
- [Modern TypeScript Patterns](/.github/instructions/06-modern-typescript-patterns.instructions.md)
- [Variable Naming](/.github/instructions/07-variable-naming.instructions.md)
- [README Standards](/.github/instructions/08-readme-standards.instructions.md)

## Project-Specific

Project-specific rules live in `.github/instructions/project/`. Add `*.instructions.md` files there and link them here.

- This repo is **`@finografic/oxfmt-config`**: shareable [oxfmt](https://oxc.rs/docs/guide/usage/formatter) presets, import-sort groups, ignore patterns, and agent-doc path helpers for the finografic ecosystem.
- **Standalone package** (not a monorepo workspace root). Published to GitHub Packages (`https://npm.pkg.github.com`).
- **Source layout:** formatting presets in `src/config/formatting/`; ignore globs and agent instruction paths in `src/config/patterns/`; `SORTING_GROUP_*` and `SORT_PRESET_*` in `src/config/sorting-groups/`. Public API: `src/index.ts` → `dist/index.mjs`.
- Root **`oxfmt.config.ts`** imports from `./dist/index.mjs` (rebuild with `pnpm build` after changing `src/`).
- **Hooks:** `simple-git-hooks` pre-commit runs `lint-staged` then `oxfmt`; `lint-staged` runs ESLint before oxfmt on code and Markdown (see `package.json`).
- Do not include `Co-Authored-By` lines in commit messages.

## Learned User Preferences

- When documenting sorting, use current group names (`hooks`, `client-routes`, `server-routes`, `tests`, …) — not the removed `hooks-routes` / `SORTING_GROUP_HOOKS_ROUTES`.
- Prefer linking to `docs/SETUP_OXFMT_CONFIG.md` and `docs/OXFMT_SORT_GROUPS.md` for formatter and import-sort details.
- For agent instruction markdown, prefer narrow path targeting plus `AGENT_DOC_PATHS` / `agentMarkdown` (see `src/config/patterns/agent-docs.patterns.ts`) over blanket `**/.github/**` ignores when other `.github` markdown should still format; excluding `**/.claude/**` is a common choice for local-only agent files.

## Learned Workspace Facts

- `ignorePatterns` in `src/config/patterns/ignore.patterns.ts` deliberately omits blanket `**/.github/**` and `**/.cursor/**`; known agent doc paths are handled via overrides/constants in `agent-docs.patterns.ts`, not by skipping entire `.github` / `.cursor` trees.
