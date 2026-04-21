import type { DummyRuleMap } from 'oxlint';

/**
 * JSDoc rules: opt in to **light hygiene only** — no mandatory descriptions, params, returns, or examples.
 * Anything that forces documentation shape stays off.
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html — filter by `jsdoc`
 */
export const jsDocRules = {
  // --- Optional quality (warn = visible, not blocking) ---
  /** Catch typos like `@parm`; allow custom tags used in this ecosystem. */
  'jsdoc/check-tag-names': ['warn', { definedTags: ['finografic'] }],

  // --- Strict / documentation-coverage rules → off ---
  'jsdoc/check-access': 'off',
  'jsdoc/check-property-names': 'off',
  'jsdoc/empty-tags': 'off',
  'jsdoc/implements-on-classes': 'off',
  'jsdoc/no-defaults': 'off',
  'jsdoc/require-param': 'off',
  'jsdoc/require-param-description': 'off',
  'jsdoc/require-param-name': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-property': 'off',
  'jsdoc/require-property-description': 'off',
  'jsdoc/require-property-name': 'off',
  'jsdoc/require-property-type': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-returns-description': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/require-yields': 'off',
} as const satisfies DummyRuleMap;
