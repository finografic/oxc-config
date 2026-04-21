// ── oxlint: composable linter settings ─────────────
export { categories } from './categories';
export { env } from './env';
export { options } from './options';
export { plugins } from './plugins';

// ── oxlint: composable rules sets ─────────────────
export { baseRules } from './rules/base.rules';
export { jsDocRules } from './rules/jsdoc.rules';
export { typescriptRules } from './rules/typescript.rules';
export { unicornRules } from './rules/unicorn.rules';

// ── oxlint: rule composed ─────────────────────────
export { rules } from './rules/index';

// ── oxlint: optional loosened rules ───────────────
export { loosenRules } from './rules/loosen.rules';

// ── oxlint: optional overrides ────────────────────
export { configOverrides } from './overrides/config.overrides';
export { testOverrides } from './overrides/test.overrides';

// ── oxlint: ignore patterns ───────────────────────
export { IGNORE_PATTERNS_LINT as ignorePatterns } from './ignore.patterns';
