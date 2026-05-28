import type { DummyRuleMap } from 'oxlint';

/**
 * Base Oxlint rule overrides shared by this config package.
 *
 * References:
 *
 * - Full rules catalog: https://oxc.rs/docs/guide/usage/linter/rules.html#rules
 * - Fixable-only filter: https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&has_fix=true#rules
 */
export const loosenRules: DummyRuleMap = {
  'eslint/no-await-in-loop': 'off',

  /** Node/TS idioms — allow common double-underscore identifiers (requires oxlint >= 1.67). */
  'eslint/no-underscore-dangle': [
    'warn',
    {
      allow: ['__dirname', '__filename', '__proto__'],
    },
  ],

  // oxlint doesn't understand exhaustive switch statements — TypeScript already enforces this
  'typescript/consistent-return': 'off',
  'react-perf/jsx-no-new-function-as-prop': 'off',
  'react-perf/jsx-no-new-object-as-prop': 'off',

  'jsdoc/check-tag-names': [
    'warn',
    {
      definedTags: ['finografic', 'finografic/design-system/styles/reset.css'],
    },
  ],
};
