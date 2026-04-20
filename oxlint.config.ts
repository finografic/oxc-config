import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import {
  baseRules,
  configOverrides,
  lintCategories,
  lintIgnorePatterns,
  lintOptions,
  lintPlugins,
  testOverrides,
} from './dist/index.mjs';

export default defineConfig({
  plugins: [...lintPlugins],
  ...lintOptions,
  rules: { ...baseRules },
  categories: { ...lintCategories },
  overrides: [testOverrides, configOverrides],
  ignorePatterns: [...lintIgnorePatterns],
} satisfies OxlintConfig);
