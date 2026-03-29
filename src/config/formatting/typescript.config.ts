import type { OxfmtConfig } from 'oxfmt';

/**
 * TypeScript/TSX-specific formatting overrides.
 *
 * Empty for now — exists as a separate preset so TS-specific options
 * can be added without touching `base`. Candidates to evaluate:
 *   - `jsdoc` (JSDoc comment formatting / normalization)
 *   - `objectWrap` ("preserve" vs "collapse" for TS object types)
 *   - `singleAttributePerLine` (for TSX)
 *
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html
 */
export const typescript = {
  quoteStyle: 'consistent',
} as const satisfies Partial<OxfmtConfig>;
