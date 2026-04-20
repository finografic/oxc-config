# Test if @finografic/oxc-config is formatting correctly

> **Note:** v2.0.0 renamed the package from `@finografic/oxfmt-config` to `@finografic/oxc-config`.

```bash
# 1. Build and pack (from oxfmt-config root)
pnpm build
pnpm pack
# → creates finografic-oxc-config-<version>.tgz (name matches package.json version)

# 2. Create a temp test project
mkdir /tmp/test-oxfmt-config && cd /tmp/test-oxfmt-config
pnpm init
pnpm add -D oxfmt

# 3. Install your local tarball
pnpm add -D /path/to/finografic-oxc-config-<version>.tgz

# 4. Create a consumer config file
cat > oxfmt.config.ts << 'EOF'
import { defineConfig } from 'oxfmt';
import type { OxfmtConfig } from '@finografic/oxc-config/oxfmt';
import { base, sorting, markdown, css } from '@finografic/oxc-config/oxfmt';

export default defineConfig({
  $schema: './node_modules/oxfmt/configuration_schema.json',
  ignorePatterns: [],
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.md', '*.mdx'], excludeFiles: [], options: { ...markdown } },
    { files: ['*.css', '*.scss'], excludeFiles: [], options: { ...css } },
  ],
} satisfies OxfmtConfig);
EOF

# 5. Create a test file to format
cat > test.ts << 'EOF'
const   x=1
const y = {a:1,b:2,c:3}
import {useState} from 'react'
import path from 'node:path'
import { base } from '@finografic/oxc-config/oxfmt';
EOF

# 6. Run oxfmt and check it picks up the config
npx oxfmt test.ts --check
# Should fail (unformatted) — means config loaded

npx oxfmt test.ts
# Should format — check output matches your base preset
# (see src/oxfmt/formatting/base.config.ts: printWidth 110, singleQuote, semi, trailingComma, etc.)
cat test.ts

# 7. Verify TypeScript resolves the types
cat > check-types.ts << 'EOF'
import { base, sorting, markdown, css, json, typescript } from '@finografic/oxc-config/oxfmt';
console.log(base.printWidth);      // should be 110
console.log(markdown.printWidth);  // should be 110 (markdown preset)
console.log(css.singleQuote);      // should be false
EOF

npx tsc --moduleResolution bundler --module esnext --noEmit check-types.ts
# Should pass with zero errors — types resolve correctly
```
