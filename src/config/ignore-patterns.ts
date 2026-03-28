import type { OxfmtConfig } from 'oxfmt';

export const ignorePatterns = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.claude/**',
  '**/.cursor/**',
  '**/*.min.*',
  '**/*.map',
  '**/.github/**',
] as const satisfies OxfmtConfig['ignorePatterns'];
