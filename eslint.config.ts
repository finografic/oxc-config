/**
 * ESLint config for @finografic/oxfmt-config
 *
 * Logic-only linting — oxfmt handles all formatting.
 * No stylistic rules, no import sorting (oxfmt does both).
 */
import js from '@eslint/js';
import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

const config: Linter.Config[] = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', 'internal/**'],
  },

  js.configs.recommended,

  {
    files: ['**/*.{ts,mts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
    },
  },
];

export default config;
