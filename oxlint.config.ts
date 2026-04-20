import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

import {
  baseRules,
  configOverrides,
  categories,
  lintIgnorePatterns,
  options,
  env,
  lintPlugins,
  testOverrides,
} from './dist/index.mjs';

export default defineConfig({
  plugins: [...lintPlugins],
  ignorePatterns: [...lintIgnorePatterns],
  env,
  options,
  rules: { ...baseRules },
  categories,
  overrides: [testOverrides, configOverrides],
} satisfies OxlintConfig);
