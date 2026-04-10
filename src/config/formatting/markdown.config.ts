import type { OxfmtMarkdownConfig } from 'types/oxfmt.types';

export const markdown = {
  embeddedLanguageFormatting: 'off', // "auto" (default) | "off"
  printWidth: 110, // integer (default: 100)
  proseWrap: 'preserve', // "always" | "never" | "preserve" (default)
} as const satisfies Partial<OxfmtMarkdownConfig>;
