import type { OxfmtConfig } from 'oxfmt';

export const base = {
  $schema: './node_modules/oxfmt/configuration_schema.json',
  printWidth: 110,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  singleAttributePerLine: false,
  insertFinalNewline: true,
} as const satisfies Partial<OxfmtConfig>;
