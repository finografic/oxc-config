export const lintOptions = {
  env: {
    builtin: true,
    node: true,
  },
  options: {
    typeCheck: true,
    typeAware: true,
    reportUnusedDisableDirectives: 'error',
  },
} as const;
