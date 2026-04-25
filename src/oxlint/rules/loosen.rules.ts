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
  'react-perf/jsx-no-new-function-as-prop': 'off',
  'react-perf/jsx-no-new-object-as-prop': 'off',

  'typescript/explicit-function-return-type': [
    'warn',
    {
      allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      allowDirectConstAssertionInArrowFunctions: true,
      allowExpressions: true,
      allowFunctionsWithoutTypeParameters: true,
      allowHigherOrderFunctions: true,
      allowIIFEs: true,
      allowTypedFunctionExpressions: true,
    },
  ],

  'jsdoc/check-tag-names': [
    'warn',
    {
      definedTags: ['finografic', 'finografic/design-system/styles/reset.css'],
    },
  ],
};
