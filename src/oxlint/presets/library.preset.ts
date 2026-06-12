import { assertOxlintRules } from '../assert-rules';
import { IGNORE_PATTERNS_LINT } from '../ignore.patterns';
import { options } from '../options';
import { defineOxlintPreset } from '../preset.types';
import { rules } from '../rules/index';
import { loosenRules } from '../rules/loosen.rules';

/**
 * Oxlint preset for config-only or utility libraries (e.g. this package itself).
 *
 * - `env`: `builtin` + `node`
 * - `plugins`: no `react`, `react-perf` (no JSX); `vitest` retained for libraries with tests
 * - `categories`: correctness only — no `perf` or `suspicious` (no runtime performance concerns)
 *
 * Usage:
 *
 * ```ts
 * import { oxlintLibraryConfig, testOverrides, configOverrides } from '@finografic/oxc-config/oxlint';
 * import { defineConfig } from 'oxlint';
 *
 * export default defineConfig({
 *   ...oxlintLibraryConfig,
 *   overrides: [testOverrides, configOverrides],
 * });
 * ```
 */
export const oxlintLibraryConfig = defineOxlintPreset({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'jsdoc', 'node', 'promise', 'vitest'],
  env: {
    builtin: true,
    node: true,
  },
  options,
  categories: {
    correctness: 'error',
  },
  rules: assertOxlintRules({ ...rules, ...loosenRules }),
  ignorePatterns: [...IGNORE_PATTERNS_LINT],
});
