import type { OxfmtCssConfig } from 'types/oxfmt.types';

// NOTE: Oxfmt options that relate to CSS formatting

export const css = {
  htmlWhitespaceSensitivity: 'css', // "css" (default) | "strict" | "ignore",
  printWidth: 80,
  singleQuote: false,
} as const satisfies Partial<OxfmtCssConfig>;
