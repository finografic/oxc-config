import type { OxfmtConfig } from 'oxfmt';

export const css = {
  singleQuote: false, // CSS convention: double quotes
} as const satisfies Partial<OxfmtConfig>;
