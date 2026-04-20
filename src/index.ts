// ── oxfmt: formatting presets ──────────────────────────
export { base, css, html, json, jsdoc, markdown, react, sorting, typescript } from './oxfmt/formatting';

// ── oxfmt: import-sort groups + presets ───────────────
export {
  SORT_PRESET_CLIENT,
  SORT_PRESET_CLI,
  SORT_PRESET_LIBRARY,
  SORT_PRESET_SERVER,
  SORTING_GROUP_API,
  SORTING_GROUP_CLIENT_ROUTES,
  SORTING_GROUP_HOOKS,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_PAGES_COMPONENTS,
  SORTING_GROUP_REACT,
  SORTING_GROUP_SERVER_LAYERS,
  SORTING_GROUP_SERVER_ROUTES,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TESTS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_WORKSPACE,
} from './oxfmt/sorting-groups';

// ── oxfmt: types ──────────────────────────────────────
export type {
  CustomGroupItemConfig,
  OxfmtConfig,
  OxfmtCssConfig,
  OxfmtHtmlConfig,
  OxfmtMarkdownConfig,
  OxfmtOverrideConfig,
  OxfmtReactConfig,
  OxfmtScopeBase,
  SortImportsConfig,
} from './oxfmt/types';

// ── oxlint: composable linting pieces ─────────────────
export { baseRules } from './oxlint/rules/base.rules';
export { configOverrides } from './oxlint/rules/config.overrides';
export { testOverrides } from './oxlint/rules/test.overrides';
export { lintCategories } from './oxlint/categories';
export { lintIgnorePatterns } from './oxlint/ignore.patterns';
export { lintOptions } from './oxlint/options';
export { lintPlugins } from './oxlint/plugins';

// ── shared patterns ───────────────────────────────────
export { AGENT_DOC_MARKDOWN_PATHS, AGENT_DOC_PATHS, agentMarkdown } from './patterns/agent-docs.patterns';
export { ignorePatterns } from './patterns/ignore.patterns';
