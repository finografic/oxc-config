export const lintIgnorePatterns = [
  '**/node_modules/**',
  '**/dist/**',
  '**/coverage/**',
  '**/.astro/**',
  '**/*.min.*',
  '**/*.map',
  '*.d.ts',

  // ── Agent tooling internals ─────────────────────────
  '**/.ai/**',
  '**/.cursor/hooks/**',
  '**/.cursor/chats/**',
  '**/.claude/**',
  '**/.codex/**',
] as const;
