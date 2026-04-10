import type { OxfmtReactConfig } from 'types/oxfmt.types';

// NOTE: Oxfmt options that relate to JSX / Reactformatting

export const reactConfig = {
  bracketSameLine: false,
  jsxSingleQuote: false,
  singleAttributePerLine: false,
} as const satisfies Partial<OxfmtReactConfig>;
