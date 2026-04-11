import type { OxfmtConfig } from 'oxfmt';

import { jsdocConfig } from './jsdoc.config';

export const base = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  insertFinalNewline: true,
  objectWrap: 'preserve', // "preserve" (default) | "collapse";
  printWidth: 110,
  quoteProps: 'consistent',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  ...jsdocConfig,
} as const satisfies Partial<OxfmtConfig>;
