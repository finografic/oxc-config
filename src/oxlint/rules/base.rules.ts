import { assertOxlintRules } from '../assert-rules';

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
export const baseRules = assertOxlintRules({
  'no-console': 'off',

  'eslint/no-debugger': 'error',
  'eslint/no-console': 'off',
  'eslint/no-constant-condition': ['error', { checkLoops: false }],
  'eslint/prefer-const': 'error',
  'eslint/no-var': 'error',
  'eslint/object-shorthand': 'error',
  'eslint/eqeqeq': ['error', 'always', { null: 'ignore' }],
  'eslint/curly': ['error', 'multi-line'],
  'eslint/no-unused-vars': 'off',

  'curly': ['error', 'multi-line'],
  'prefer-const': ['error', { destructuring: 'all' }],
  'prefer-destructuring': [
    'error',
    {
      VariableDeclarator: { array: false, object: true },
    },
  ],
  'unicode-bom': ['error', 'never'],

  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  'import/no-duplicates': 'error',
});
