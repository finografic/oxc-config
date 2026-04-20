import type { OxlintOverride } from 'oxlint';

export const testOverrides: OxlintOverride = {
  files: ['**/*.spec.ts', '**/*.test.ts', '__tests__/**/*.ts'],
  rules: {
    'import/first': 'off',
    'import/no-amd': 'error',
    'import/no-self-import': 'error',
    'vitest/valid-title': ['off'],
    'vitest/require-mock-type-parameters': 'off',
    'vitest/prefer-snapshot-hint': 'off',
  },
};
