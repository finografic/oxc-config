import { defineConfig } from 'oxfmt';
import type { OxfmtConfig, OxfmtOverrideConfig } from './src/oxfmt/types/oxfmt.types';

import {
  agentMarkdown,
  AGENT_DOC_MARKDOWN_PATHS,
  base,
  css,
  ignorePatterns,
  json,
  markdown,
  sorting,
} from './dist/index.mjs';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns,
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.json', '*.jsonc'], excludeFiles: [], options: { ...json } },
    {
      files: ['*.md', '*.mdx'],
      excludeFiles: [...AGENT_DOC_MARKDOWN_PATHS],
      options: { ...markdown },
    },
    {
      files: [...AGENT_DOC_MARKDOWN_PATHS],
      excludeFiles: [],
      options: { ...agentMarkdown },
    },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ] satisfies OxfmtOverrideConfig[],
} satisfies OxfmtConfig);
