import type { OxfmtConfig } from 'oxfmt';

export const json = {
  tabWidth: 2,
  trailingComma: 'none', // JSON doesn't support trailing commas
} as const satisfies Partial<OxfmtConfig>;
