import type { OxfmtConfig } from 'oxfmt';

export const base = {
  printWidth: 110,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  singleAttributePerLine: false,
  insertFinalNewline: true,
} as const satisfies Partial<OxfmtConfig>;
