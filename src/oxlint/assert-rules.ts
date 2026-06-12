import type { DummyRuleMap } from 'oxlint';

/**
 * Validate rule objects against oxlint while preserving narrow literal keys in `.d.ts` emit.
 * Prefer this over `satisfies DummyRuleMap` or `: DummyRuleMap`, which widen declarations.
 */
export function assertOxlintRules<const R extends DummyRuleMap>(rules: R): R {
  return rules;
}
