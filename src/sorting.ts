import type { OxfmtConfig } from 'oxfmt';

export const sorting = {
  sortImports: {},
  sortPackageJson: {
    sortScripts: false, // keep manual script ordering (our convention)
  },
} as const satisfies Partial<OxfmtConfig>;
