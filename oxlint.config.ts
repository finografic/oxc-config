import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

export default defineConfig({
  env: {
    builtin: true,
    node: true,
  },

  plugins: [
    'eslint',
    'typescript',
    'unicorn',
    'react',
    'react-perf',
    'oxc',
    'import',
    'jsdoc',
    'node',
    'promise',
    'vitest',
  ],

  options: {
    typeCheck: true,
    typeAware: true,
    reportUnusedDisableDirectives: 'error',
  },

  categories: {
    correctness: 'error',
    perf: 'error',
  },

  rules: {
    // 'no-console': 'warn',
    'no-console': 'off',
    // ── Aligned with @finografic/base (eslint-config) ─────────────────────────
    'eslint/no-debugger': 'error',
    'eslint/no-console': 'off',
    'eslint/no-constant-condition': ['error', { checkLoops: false }],
    'eslint/prefer-const': 'error',
    'eslint/no-var': 'error',
    'eslint/object-shorthand': 'error',
    'eslint/eqeqeq': ['error', 'always', { null: 'ignore' }],
    'eslint/curly': ['error', 'multi-line'],

    // Base unused-vars off for TS files; TS plugin owns them (matches eslint.config.ts pattern).
    'eslint/no-unused-vars': 'off',
    // 'eslint/no-redeclare': 'off',

    // ── TypeScript / @typescript-eslint parity (oxlint `typescript` plugin) ───
    // Stricter than finografic default: match eslint.config.ts (error, args: all, ignore _).
    'typescript/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'typescript/no-redeclare': 'warn',
    'typescript/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    // Opposite of inline `import { type T }`: require `import type { T }` (type keyword outside `{}`).
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

    // Subset of @finografic/typescript layer — enable more as you confirm oxlint coverage.
    'typescript/adjacent-overload-signatures': 'error',
    // Finografic uses `array-simple`; oxlint may suggest `readonly T[]` vs `ReadonlyArray<T>` — warn only for Phase 1.
    'typescript/array-type': ['warn', { default: 'array-simple' }],
    // 'typescript/ban-ts-comment': 'warn',
    'typescript/ban-ts-comment': ['warn', { 'ts-expect-error': 'allow-with-description' }],
    'typescript/consistent-type-assertions': 'error',
    'typescript/consistent-type-definitions': ['error', 'interface'],
    'typescript/no-array-constructor': 'error',
    'typescript/no-require-imports': 'error',
    'typescript/no-this-alias': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-for-of': 'error',
    'typescript/prefer-function-type': 'error',
    'typescript/unified-signatures': 'error',
    'typescript/no-floating-promises': 'off',
    'typescript/await-thenable': 'error',

    // ── @finografic/node (JS tooling) — no direct TS equivalent in oxlint file set; keep in ESLint if needed.
    // 'node/no-process-exit': 'error',

    // ── Imports: finografic uses eslint-plugin-simple-import-sort; oxlint uses import-x style rules.
    // Tuned loosely to “external → package → relative” (adjust groups in a later pass).
    'import/no-duplicates': 'error',
    // Vitest / ESM hoisting often uses `vi.mock` before imports; finografic used simple-import-sort instead.
    'import/first': 'off',
    'import/no-amd': 'error',
    'import/no-self-import': 'error',

    // ======================================================================== //
    // ======================================================================== //

    'curly': ['error', 'multi-line'],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
      },
    ],
    'unicode-bom': ['error', 'never'],
    'typescript/consistent-indexed-object-style': ['error', 'record'],

    'typescript/explicit-function-return-type': 'error',
    'vitest/require-mock-type-parameters': 'off',
    'vitest/prefer-snapshot-hint': 'off',
  },
  overrides: [
    {
      files: ['oxlint.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.cursor/hooks/**',
    '**/.cursor/chats/**',
    '**/.claude/**',
    '**/coverage/**',
    '**/.astro/**',
    '**/*.min.*',
    '**/*.map',
    '*.d.ts',
  ],
} satisfies OxlintConfig);
