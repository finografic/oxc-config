import { assertOxlintRules } from '../assert-rules';
import { baseRules } from './base.rules';
import { jsDocRules } from './jsdoc.rules';
import { typescriptRules } from './typescript.rules';
import { unicornRules } from './unicorn.rules';

/**
 * Base Oxlint rule overrides shared by this config package.
 *
 * References:
 *
 * - Full rules catalog: https://oxc.rs/docs/guide/usage/linter/rules.html#rules
 * - Fixable-only filter: https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&has_fix=true#rules
 *
 * Metrics snapshot from docs at time of authoring:
 *
 * - Total rules: 720
 * - Rules enabled by default: 109
 * - Rules with fixes available: 259
 */
export const rules = assertOxlintRules({
  ...baseRules,
  ...typescriptRules,
  ...unicornRules,
  ...jsDocRules,
});
