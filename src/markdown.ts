import type { OxfmtConfig } from 'oxfmt';

export const markdown = {
  proseWrap: 'preserve', // don't rewrap markdown prose
  printWidth: 80, // narrower for readability in docs
} as const satisfies Partial<OxfmtConfig>;
