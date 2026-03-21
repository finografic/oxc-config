# Test if @finografic/oxfmt-config is formatting correctly

```bash
# 1. Build and pack (from oxfmt-config root)
pnpm build
pnpm pack
# → creates finografic-oxfmt-config-0.1.0.tgz

# 2. Create a temp test project
mkdir /tmp/test-oxfmt-config && cd /tmp/test-oxfmt-config
pnpm init
pnpm add -D oxfmt

# 3. Install your local tarball
pnpm add -D /path/to/finografic-oxfmt-config-0.1.0.tgz

# 4. Create a consumer config file
cat > .oxfmtrc.ts << 'EOF'
import { defineConfig } from 'oxfmt';
import { base, sorting, markdown, css } from '@finografic/oxfmt-config';

export default defineConfig({
  ...base,
  ...sorting,
  overrides: [
    { files: ['*.md', '*.mdx'], options: { ...markdown } },
    { files: ['*.css', '*.scss'], options: { ...css } },
  ],
});
EOF

# 5. Create a test file to format
cat > test.ts << 'EOF'
const   x=1
const y = {a:1,b:2,c:3}
import {useState} from 'react'
import path from 'node:path'
import {base} from '@finografic/oxfmt-config'
EOF

# 6. Run oxfmt and check it picks up the config
npx oxfmt test.ts --check
# Should fail (unformatted) — means config loaded

npx oxfmt test.ts
# Should format — check output matches your base preset
# (singleQuote: true, semi: true, trailingComma: all, etc.)
cat test.ts

# 7. Verify TypeScript resolves the types
cat > check-types.ts << 'EOF'
import { base, sorting, markdown, css, json, typescript } from '@finografic/oxfmt-config';
console.log(base.printWidth);      // should be 100
console.log(markdown.printWidth);  // should be 80
console.log(css.singleQuote);      // should be false
EOF

npx tsc --moduleResolution bundler --module esnext --noEmit check-types.ts
# Should pass with zero errors — types resolve correctly
```
