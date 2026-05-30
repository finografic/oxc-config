import type { OxfmtConfig } from 'oxfmt';

export const json = {
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 120,
} as const satisfies Partial<OxfmtConfig>;
