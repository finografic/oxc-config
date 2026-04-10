import type { OxfmtHtmlConfig } from 'types/oxfmt.types';

// NOTE: Oxfmt options that relate to HTML formatting

export const htmlConfig = {
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'css', // "css" (default) | "strict" | "ignore",
  printWidth: 80,
  singleAttributePerLine: false,
  singleQuote: false,
} as const satisfies Partial<OxfmtHtmlConfig>;
