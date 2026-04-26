import type { RuleCategories } from 'oxlint';

/**
 * Oxlint `categories` config.
 *
 * Configure whole rule categories at once. Individual entries in `rules` override category-level severity.
 *
 * Available category keys: - `correctness` - `nursery` - `pedantic` - `perf` - `restriction` - `style` -
 * `suspicious`
 *
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories-correctness
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories-nursery
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories-pedantic
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories-perf
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories-restriction
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories-style
 * @see https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#categories-suspicious
 */
export const categories = {
  correctness: 'error',
  suspicious: 'warn',
} as const satisfies RuleCategories;
