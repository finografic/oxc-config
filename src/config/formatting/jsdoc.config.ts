import type { OxfmtConfig } from 'types/oxfmt.types';

/**
 * JSDoc comment formatting preset for oxfmt.
 *
 * When enabled, JSDoc comments are normalized and reformatted: tag aliases are
 * canonicalized, descriptions are capitalized, long lines are wrapped, and short
 * comments may collapse to a single line (per `commentLineStrategy`).
 *
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html#jsdoc
 */
export const jsdocConfig = {
  jsdoc: {
    /**
     * Append default values to `@param` descriptions (e.g. "Default is `value`").
     *
     * @type {boolean}
     * @default true
     */
    addDefaultToDescription: true,

    /**
     * Add spaces inside JSDoc type braces: `{string}` → `{ string }`.
     *
     * @type {boolean}
     * @default false
     */
    bracketSpacing: false,

    /**
     * Capitalize the first letter of tag descriptions.
     *
     * @type {boolean}
     * @default true
     */
    capitalizeDescriptions: true,

    /**
     * How to format comment blocks.
     *
     * @type {'singleLine' | 'multiline' | 'keep'}
     * @default "singleLine"
     * @description
     * - `singleLine` — collapse to one line when possible.
     * - `multiline` — always use multi-line format.
     * - `keep` — preserve original formatting.
     */
    commentLineStrategy: 'singleLine',

    /**
     * Emit `@description` tag instead of inline description.
     *
     * @type {boolean}
     * @default false
     */
    descriptionTag: false,

    /**
     * Add a trailing dot to the end of descriptions.
     *
     * @type {boolean}
     * @default false
     */
    descriptionWithDot: false,

    /**
     * Preserve indentation in unparsable `@example` code.
     *
     * @type {boolean}
     * @default false
     */
    keepUnparsableExampleIndent: false,

    /**
     * Strategy for wrapping description lines at print width.
     *
     * @type {'greedy' | 'balance'}
     * @default "greedy"
     * @description
     * - `greedy` — always re-wrap text to fit within print width.
     * - `balance` — preserve original line breaks if all lines fit within print width.
     */
    lineWrappingStyle: 'greedy',

    /**
     * Use fenced code blocks instead of 4-space indentation for code without a language tag.
     *
     * @type {boolean}
     * @default false
     */
    preferCodeFences: false,

    /**
     * Add a blank line between the last `@param` and `@returns`.
     *
     * @type {boolean}
     * @default false
     */
    separateReturnsFromParam: false,

    /**
     * Add blank lines between different tag groups (e.g. between `@param` and `@returns`).
     *
     * @type {boolean}
     * @default false
     */
    separateTagGroups: false,
  },
} as const satisfies Partial<OxfmtConfig>;
