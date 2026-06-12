import { assertOxlintRules } from '../assert-rules';
import { IGNORE_PATTERNS_LINT } from '../ignore.patterns';
import { options } from '../options';
import { defineOxlintPreset } from '../preset.types';
import { rules } from '../rules/index';
import { loosenRules } from '../rules/loosen.rules';

/**
 * Oxlint preset for React/Vite client-side applications.
 *
 * - `env`: browser globals (`builtin` + `browser`; no `node`)
 * - `plugins`: full set including `react` and `react-perf`
 * - `categories`: correctness (error), suspicious (warn), perf (warn — matters in browser)
 *
 * Usage:
 *
 * ```ts
 * import { oxlintClientConfig, testOverrides, configOverrides } from '@finografic/oxc-config/oxlint';
 * import { defineConfig } from 'oxlint';
 *
 * export default defineConfig({
 *   ...oxlintClientConfig,
 *   overrides: [testOverrides, configOverrides],
 * });
 * ```
 */
export const oxlintClientConfig = defineOxlintPreset({
  plugins: [
    'eslint',
    'typescript',
    'unicorn',
    'react',
    'react-perf',
    'oxc',
    'import',
    'jsdoc',
    'promise',
    'vitest',
  ],
  env: {
    builtin: true,
    browser: true,
  },
  options,
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn',
  },
  rules: assertOxlintRules({ ...rules, ...loosenRules, 'react/react-in-jsx-scope': 'off' }),
  ignorePatterns: [...IGNORE_PATTERNS_LINT],
});
