// ── oxfmt: formatting presets ──────────────────────────
export {
  base,
  css,
  html,
  json,
  jsdoc,
  markdown,
  agentMarkdown,
  react,
  sorting,
  typescript,
} from './formatting';

// ── oxfmt: import-sort groups + presets ───────────────
export {
  SORT_CUSTOM_GROUPS_BASE,
  SORT_GROUPS_BASE,
  SORT_IMPORTS_SHARED_OPTIONS,
  SORT_PRESET_CLIENT,
  SORT_PRESET_CLI,
  SORT_PRESET_LIBRARY,
  SORT_PRESET_SERVER,
  SORTING_GROUP_API,
  SORTING_GROUP_CLIENT_ROUTES,
  SORTING_GROUP_HOOKS,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_PAGES_COMPONENTS,
  SORTING_GROUP_PATH_ALIAS,
  SORTING_GROUP_REACT,
  SORTING_GROUP_SERVER_LAYERS,
  SORTING_GROUP_SERVER_ROUTES,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TESTS,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_WORKSPACE,
} from './sorting-groups';

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
} from './types';

// ── patterns ──────────────────────────────────────
export { AGENT_DOC_MARKDOWN_PATHS, AGENT_DOC_PATHS } from './ignore-agents.patterns';
export { IGNORE_PATTERNS_FORMAT as ignorePatterns } from './ignore.patterns';
