import { assertOxlintRules } from '../assert-rules';
import { IGNORE_PATTERNS_LINT } from '../ignore.patterns';
import { options } from '../options';
import { defineOxlintPreset } from '../preset.types';
import { rules } from '../rules/index';
import { loosenRules } from '../rules/loosen.rules';

/**
 * Oxlint preset for Hono / Node server applications.
 *
 * - `env`: `builtin` + `node`
 * - `plugins`: no `react` or `react-perf` (server has no JSX)
 * - `categories`: correctness (error), suspicious (warn)
 *
 * Usage:
 *
 * ```ts
 * import { oxlintServerConfig, testOverrides, configOverrides } from '@finografic/oxc-config/oxlint';
 * import { defineConfig } from 'oxlint';
 *
 * export default defineConfig({
 *   ...oxlintServerConfig,
 *   overrides: [testOverrides, configOverrides],
 * });
 * ```
 */
export const oxlintServerConfig = defineOxlintPreset({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'import', 'jsdoc', 'node', 'promise', 'vitest'],
  env: {
    builtin: true,
    node: true,
  },
  options,
  categories: {
    correctness: 'error',
    suspicious: 'warn',
  },
  rules: assertOxlintRules({ ...rules, ...loosenRules }),
  ignorePatterns: [...IGNORE_PATTERNS_LINT],
});
