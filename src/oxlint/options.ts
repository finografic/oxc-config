import type { OxlintConfig } from 'oxlint';

export const options = {
  typeCheck: true,
  typeAware: true,
  reportUnusedDisableDirectives: 'error',
} as const satisfies OxlintConfig['options'];
