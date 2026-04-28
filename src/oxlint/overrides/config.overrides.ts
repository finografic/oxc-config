import type { OxlintOverride } from 'oxlint';

export const configOverrides: OxlintOverride = {
  files: ['oxlint.config.ts', 'oxfmt.config.ts', 'vitest.config.ts', 'vite.config.ts', 'astro.config.ts'],
  rules: {
    'import/no-default-export': 'off',
  },
};
