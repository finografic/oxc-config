import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import { env, options, plugins } from '../src/oxlint/index';

export default defineConfig({
  plugins,
  env,
  options,
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
} satisfies OxlintConfig);
