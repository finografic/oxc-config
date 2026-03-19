import { defineConfig } from 'oxfmt';

import { base, sorting, markdown, css } from './dist/index.mjs';

export default defineConfig({
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.md', '*.mdx'], options: { ...markdown } },
    { files: ['*.css', '*.scss'], options: { ...css } },
  ],
});
