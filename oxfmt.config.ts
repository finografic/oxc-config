import { defineConfig } from 'oxfmt';

import { base, sorting, markdown, css, ignores } from './dist/index.mjs';

export default defineConfig({
  ...ignores,
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.md', '*.mdx'], options: { ...markdown } },
    { files: ['*.css', '*.scss'], options: { ...css } },
  ],
});
