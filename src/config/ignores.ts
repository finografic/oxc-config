import type { OxfmtConfig } from 'oxfmt';

export const ignores = {
  ignorePatterns: [],
} as const satisfies Partial<OxfmtConfig>;
