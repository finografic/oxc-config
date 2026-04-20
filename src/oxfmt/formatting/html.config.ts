import type { OxfmtHtmlConfig } from 'oxfmt/types/oxfmt.types';

// NOTE: Oxfmt options that relate to HTML formatting

export const html = {
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'css', // "css" (default) | "strict" | "ignore",
  printWidth: 110,
  singleAttributePerLine: false,
  singleQuote: false,
} as const satisfies Partial<OxfmtHtmlConfig>;
