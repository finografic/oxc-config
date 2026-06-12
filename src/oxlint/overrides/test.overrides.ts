import { assertOxlintRules } from '../assert-rules';

export const testOverrides = {
  files: ['**/*.spec.ts', '**/*.test.ts', '__tests__/**/*.ts'],
  rules: assertOxlintRules({
    'import/first': 'off',
    'import/no-amd': 'error',
    'import/no-self-import': 'error',

    'vitest/valid-title': ['off'],
    'vitest/require-mock-type-parameters': 'off',
    'vitest/prefer-snapshot-hint': 'off',
  }),
};
