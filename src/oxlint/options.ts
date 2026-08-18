import type { OxlintConfig } from 'oxlint';

export const options = {
  /**
   * Raw TypeScript compiler diagnostics, re-reported by oxlint.
   *
   * Off because oxlint builds its own program to produce them, and that program does not match the
   * consumer's real tsconfigs. A package whose tsconfig uses `include: ["src"]` leaves its own
   * `oxlint.config.ts` outside any project, so oxlint type-checks that file under fallback settings
   * and reports errors `tsc` does not agree with — monorepo-demo hit exactly this: six invented
   * assignability errors on files `pnpm typecheck` accepts.
   *
   * Every consumer runs `tsc` in its own step against the real config, so this setting could only
   * ever duplicate that check or contradict it.
   *
   * `typeAware` is unaffected — type-aware lint rules still run.
   */
  typeCheck: false,
  typeAware: true,
  reportUnusedDisableDirectives: 'error',
} as const satisfies OxlintConfig['options'];
