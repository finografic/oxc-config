import type { OxfmtConfig } from 'oxfmt';

export const json = {
  tabWidth: 2,
  trailingComma: 'none',
} as const satisfies Partial<OxfmtConfig>;
