import type {
  OxfmtConfig as OxfmtConfigOriginal,
  OxfmtOverrideConfig as OxfmtOverrideConfigOriginal,
} from 'oxfmt';
import type { OmitIndexSignature } from 'type-fest';

/**
 * Same as `OxfmtConfig` from `oxfmt`, but **without** `[k: string]: unknown`. Use this when you want
 * excess-property checking on config objects.
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
 */
export type OxfmtConfig = OmitIndexSignature<OxfmtConfigOriginal> & {
  $schema?: string;
  jsdoc?: Record<string, unknown> | false;
};

export type OxfmtOverrideConfig = OmitIndexSignature<OxfmtOverrideConfigOriginal>;

// ========================================================================== //
// NOTE: custom, opinionated config types

export type OxfmtScopeBase = Pick<OxfmtConfig, 'printWidth' | 'singleQuote' | 'trailingComma'>;

export type OxfmtCssConfig = OxfmtScopeBase & Pick<OxfmtConfig, 'htmlWhitespaceSensitivity'>;

export type OxfmtHtmlConfig = OxfmtScopeBase &
  Pick<OxfmtConfig, 'bracketSameLine' | 'htmlWhitespaceSensitivity' | 'singleAttributePerLine'>;

export type OxfmtMarkdownConfig = OxfmtScopeBase &
  Pick<OxfmtConfig, 'proseWrap' | 'printWidth' | 'embeddedLanguageFormatting'>;

export type OxfmtReactConfig = OxfmtScopeBase &
  Pick<OxfmtConfig, 'bracketSameLine' | 'jsxSingleQuote' | 'singleAttributePerLine'>;
