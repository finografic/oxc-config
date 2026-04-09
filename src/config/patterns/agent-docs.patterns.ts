import type { OxfmtConfig } from 'oxfmt';

/**
 * Known agent/AI instruction document paths across the ecosystem.
 *
 * These paths are useful in two ways:
 *   1. As oxfmt overrides — apply relaxed markdown formatting to agent docs
 *   2. As a shared constant for eslint/markdownlint configs — consumers can
 *      import this array to disable structural markdown rules for agent files
 *
 * Sources:
 *   - GitHub Copilot: docs.github.com/copilot/customizing-copilot
 *   - Cursor: docs.cursor.com/context/rules
 *   - Windsurf: windsurf.com docs + .windsurf/rules
 *   - Claude Code: CLAUDE.md convention
 *   - Cline: .clinerules convention
 *   - Gemini: GEMINI.md convention (supported by GitHub Copilot CLI)
 */
export const AGENT_DOC_PATHS = [
  // ── GitHub Copilot ──────────────────────────────────
  '.github/copilot-instructions.md',
  '.github/instructions/**/*.md',
  '.github/prompts/**/*.md',
  '.github/skills/**/*.md',

  // ── Cursor ──────────────────────────────────────────
  '.cursorrules',
  '.cursor/rules/**/*.mdc',

  // ── Windsurf ────────────────────────────────────────
  '.windsurfrules',
  '.windsurf/rules/**/*.md',

  // ── Claude ──────────────────────────────────────────
  'CLAUDE.md',
  'CLAUDE.local.md',

  // ── Cline ───────────────────────────────────────────
  '.clinerules',
  '.cline/rules/**/*.md',

  // ── Multi-agent / cross-tool ────────────────────────
  'AGENTS.md',
  'GEMINI.md',
  'COPILOT.md',
  'CONVENTIONS.md',
] as const;

/**
 * Markdown-compatible subset of AGENT_DOC_PATHS.
 *
 * Filters out non-markdown files (.mdc, extensionless) that oxfmt's
 * markdown override wouldn't match anyway. Use this for the `files`
 * array in oxfmt overrides.
 */
export const AGENT_DOC_MARKDOWN_PATHS = AGENT_DOC_PATHS.filter(
  (p): p is Extract<(typeof AGENT_DOC_PATHS)[number], `${string}.md`> => p.endsWith('.md'),
);
/**
 * Relaxed markdown formatting for agent instruction docs.
 *
 * Currently identical to the standard `markdown` preset because oxfmt
 * only handles formatting (whitespace, wrapping, line endings), not
 * structural linting (heading hierarchy, duplicate headings, etc.).
 *
 * The value of this preset is future-proofing: if oxfmt gains markdown
 * structure rules, agent docs will already have a separate, relaxed config.
 */
export const agentMarkdown = {
  proseWrap: 'preserve',
  printWidth: 320,
  insertFinalNewline: true,
} as const satisfies Partial<OxfmtConfig>;
