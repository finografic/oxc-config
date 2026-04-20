export const lintIgnorePatterns = [
  '**/node_modules/**',
  '**/dist/**',
  '**/coverage/**',
  '**/.astro/**',
  '**/*.min.*',
  '**/*.map',
  '*.d.ts',
  '**/tsconfig.json',
  '**/tsconfig.*.json',

  // ── Agent tooling internals ─────────────────────────
  '**/.ai/**',
  '**/.cursor/hooks/**',
  '**/.cursor/chats/**',
  '**/.claude/**',
] as const;
