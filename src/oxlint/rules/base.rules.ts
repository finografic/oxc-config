import type { DummyRuleMap } from 'oxlint';

export const baseRules: DummyRuleMap = {
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
  'typescript/no-floating-promises': 'off',
  'typescript/await-thenable': 'error',
  'typescript/consistent-indexed-object-style': ['error', 'record'],
  'typescript/explicit-function-return-type': 'error',
};
