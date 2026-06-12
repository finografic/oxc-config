import { assertOxlintRules } from '../assert-rules';
import { IGNORE_PATTERNS_LINT } from '../ignore.patterns';
import { options } from '../options';
import { defineOxlintPreset } from '../preset.types';
import { rules } from '../rules/index';
import { loosenRules } from '../rules/loosen.rules';

/**
 * Oxlint preset for Node CLI tools and scripts.
 *
 * - `env`: `builtin` + `node`
 * - `plugins`: no `react` or `react-perf`
 * - `categories`: correctness (error), suspicious (warn)
 * - `no-console` is already `off` in base rules — CLI tools write to stdout intentionally
 *
 * Usage:
 *
 * ```ts
 * import { oxlintCliConfig, testOverrides, configOverrides } from '@finografic/oxc-config/oxlint';
 * import { defineConfig } from 'oxlint';
 *
 * export default defineConfig({
 *   ...oxlintCliConfig,
 *   overrides: [testOverrides, configOverrides],
 * });
 * ```
 */
export const oxlintCliConfig = defineOxlintPreset({
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
