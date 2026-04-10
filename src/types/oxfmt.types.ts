import type { RemoveIndexSignature } from '@finografic/core';
import type { OxfmtConfig as OxfmtConfigOriginal } from 'oxfmt';

/**
 * Removes string / number / symbol index signatures so only explicitly declared keys remain.
 *
 * oxfmt’s `OxfmtConfig` ends with `[k: string]: unknown`, which allows any extra property.
 * This mapped type filters out those index keys (`string extends K`, etc.).
 */

/**
 * Same as `OxfmtConfig` from `oxfmt`, but **without** `[k: string]: unknown`.
 * Use this when you want excess-property checking on config objects.
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
 */
export type OxfmtConfig = RemoveIndexSignature<OxfmtConfigOriginal> & {
  jsdoc?: { [k: string]: unknown } | false;
};

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
