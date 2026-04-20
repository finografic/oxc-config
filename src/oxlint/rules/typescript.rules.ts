import type { DummyRuleMap } from 'oxlint';

/**
 * Base Oxlint rule overrides shared by this config package.
 *
 * References:
 *
 * - Full rules catalog: https://oxc.rs/docs/guide/usage/linter/rules.html#rules
 * - Fixable-only filter: https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&has_fix=true#rules
 *
 * Metrics snapshot from docs at time of authoring:
 *
 * - Total rules: 720
 * - Rules enabled by default: 109
 * - Rules with fixes available: 259
 */
export const typescriptRules: DummyRuleMap = {
  'typescript/consistent-type-imports': [
    'error',
    { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
  ],
  'typescript/no-unused-vars': [
    'error',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  'typescript/no-redeclare': 'warn',
  'typescript/adjacent-overload-signatures': 'error',
  'typescript/array-type': ['warn', { default: 'array-simple' }],
  'typescript/ban-ts-comment': ['warn', { 'ts-expect-error': 'allow-with-description' }],
  'typescript/consistent-type-assertions': 'error',
  'typescript/consistent-type-definitions': ['error', 'interface'],
  'typescript/no-array-constructor': 'error',
  'typescript/no-require-imports': 'error',
  'typescript/no-this-alias': 'error',
  'typescript/prefer-as-const': 'error',
  'typescript/prefer-for-of': 'error',
  'typescript/prefer-function-type': 'error',
  'typescript/unified-signatures': 'error',
  'typescript/no-unsafe-type-assertion': 'off', // custom
  'typescript/no-floating-promises': 'off',
  'typescript/await-thenable': 'error',
  'typescript/consistent-indexed-object-style': ['error', 'record'],

  'typescript/explicit-function-return-type': [
    'warn',
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    },
  ],
};
