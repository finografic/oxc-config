import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import {
  categories,
  configOverrides,
  env,
  ignorePatterns,
  loosenRules,
  options,
  plugins,
  rules,
  testOverrides,
} from './dist/oxlint.mjs';

export default defineConfig({
  plugins: [...plugins],
  env,
  options,
  categories,
  rules: { ...rules, ...loosenRules },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...ignorePatterns],
} satisfies OxlintConfig);
