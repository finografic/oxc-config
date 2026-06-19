import type { OxfmtConfig } from 'oxfmt/types/oxfmt.types';

export const IGNORE_PATTERNS_FORMAT = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/bin/**',
  '**/coverage/**',
  '**/.astro/**',
  '**/.turbo/**',
  '*.d.ts',
  '**/*.min.*',
  '**/*.map',

  // ── Agent tooling internals (NOT agent docs) ────────
  // We intentionally avoid blanket ignores like '**/.github/**'
  // or '**/.cursor/**' because agent instruction files live there.
  // Instead, ignore only the non-doc subdirectories.
  '**/.claude/todos*',
  '**/.claude/settings*',
  '**/.github/workflows/**',
  '**/.github/ISSUE_TEMPLATE/**',
  '**/.github/PULL_REQUEST_TEMPLATE/**',

  // ── @finografic/icons generated outputs ─────────────
  // jsdoc.capitalizeDescriptions rewrites lowercase paths in headers (index.ts → Index.ts).
  '**/icons.generated.ts',
  '**/icons/index.ts',
  '**/icons/**/index.ts',
] as const satisfies OxfmtConfig['ignorePatterns'];
