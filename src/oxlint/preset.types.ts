import type { DummyRuleMap, OxlintConfig } from 'oxlint';

/**
 * Preset shape compatible with `OxlintConfig`, but with a narrow `rules` map in declarations.
 */
export type OxlintPresetConfig<R extends DummyRuleMap = DummyRuleMap> = Omit<OxlintConfig, 'rules'> & {
  rules: R;
};

/**
 * Define a shareable oxlint preset with compile-time validation and narrow `rules` emit.
 */
export function defineOxlintPreset<const R extends DummyRuleMap>(
  config: OxlintPresetConfig<R> & OxlintConfig,
): OxlintPresetConfig<R> {
  return config;
}
