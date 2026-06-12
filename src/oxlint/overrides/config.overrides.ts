import { assertOxlintRules } from '../assert-rules';

export const configOverrides = {
  files: ['oxlint.config.ts', 'oxfmt.config.ts', 'vitest.config.ts', 'vite.config.ts', 'astro.config.ts'],
  rules: assertOxlintRules({
    'import/no-default-export': 'off',
  }),
};
