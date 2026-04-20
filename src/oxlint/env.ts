import type { OxlintEnv } from 'oxlint';

/**
 * Oxlint `env` config.
 *
 * Predefines environment globals via `Record<string, boolean>`.
 *
 * Example environment keys:
 *
 * - `browser`
 * - `builtin`
 * - `commonjs`
 * - `es6`
 * - `es2025`
 * - `es2024`
 * - `es2026`
 * - `jest`
 * - `node`
 * - `serviceworker`
 * - `shared-node-browser`
 * - `vitest`
 * - `webextensions`
 * - `worker`
 *
 * Full list here:
 *
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#env
 */

export const env = {
  builtin: true,
  node: true,
} as const satisfies OxlintEnv;
