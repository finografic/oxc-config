import type { OxfmtConfig } from 'oxfmt';

/**
 * JSDoc comment formatting preset for oxfmt.
 *
 * When enabled, JSDoc comments are normalized and reformatted: tag aliases are canonicalized, descriptions
 * are capitalized, long lines are wrapped, and short comments may collapse to a single line (per
 * `commentLineStrategy`).
 *
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html#jsdoc
 */
export const jsdoc = {
  jsdoc: {
    /**
     * Append default values to `@param` descriptions (e.g. "Default is `value`").
     *
     * @default true
     * @type {boolean}
     */
    addDefaultToDescription: true,

    /**
     * Add spaces inside JSDoc type braces: `{string}` → `{ string }`.
     *
     * @default false
     * @type {boolean}
     */
    bracketSpacing: false,

    /**
     * Capitalize the first letter of tag descriptions.
     *
     * @default true
     * @type {boolean}
     */
    capitalizeDescriptions: true,

    /**
     * How to format comment blocks.
     *
     * - `singleLine` — collapse to one line when possible.
     * - `multiline` — always use multi-line format.
     * - `keep` — preserve original formatting.
     *
     * @default 'singleLine'
     * @type {'singleLine' | 'multiline' | 'keep'}
     */
    // commentLineStrategy: 'singleLine',
    // commentLineStrategy: 'multiline',
    commentLineStrategy: 'keep',

    /**
     * Emit `@description` tag instead of inline description.
     *
     * @default false
     * @type {boolean}
     */
    descriptionTag: false,

    /**
     * Add a trailing dot to the end of descriptions.
     *
     * @default false
     * @type {boolean}
     */
    descriptionWithDot: false,

    /**
     * Preserve indentation in unparsable `@example` code.
     *
     * @default false
     * @type {boolean}
     */
    keepUnparsableExampleIndent: false,

    /**
     * Strategy for wrapping description lines at print width.
     *
     * - `greedy` — always re-wrap text to fit within print width.
     * - `balance` — preserve original line breaks if all lines fit within print width.
     *
     * @default 'greedy'
     * @type {'greedy' | 'balance'}
     */
    lineWrappingStyle: 'greedy',

    /**
     * Use fenced code blocks instead of 4-space indentation for code without a language tag.
     *
     * @default false
     * @type {boolean}
     */
    preferCodeFences: false,

    /**
     * Add a blank line between the last `@param` and `@returns`.
     *
     * @default false
     * @type {boolean}
     */
    separateReturnsFromParam: false,

    /**
     * Add blank lines between different tag groups (e.g. between `@param` and `@returns`).
     *
     * @default false
     * @type {boolean}
     */
    separateTagGroups: false,
  },
} as const satisfies Partial<OxfmtConfig>;
