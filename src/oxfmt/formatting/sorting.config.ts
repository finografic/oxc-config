/**
 * Sorting preset — import ordering + package.json field sorting.
 *
 * @see https://oxc.rs/docs/guide/usage/formatter/sorting.html
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html#sortimports
 * @see https://perfectionist.dev/rules/sort-imports  (Oxfmt sorting based on this)
 */
import type { OxfmtConfig } from 'oxfmt';
import type { SortImportsConfig } from 'oxfmt/types/sorting.types';

import {
  SORT_CUSTOM_GROUPS_BASE,
  SORT_GROUPS_BASE,
  SORT_IMPORTS_SHARED_OPTIONS,
} from '../sorting-groups/orders';

type SortingPreset = Pick<Partial<OxfmtConfig>, 'sortImports' | 'rules'>;

export const sorting: SortingPreset = {
  sortImports: {
    ...SORT_IMPORTS_SHARED_OPTIONS,
    customGroups: [...SORT_CUSTOM_GROUPS_BASE],
    groups: [...SORT_GROUPS_BASE],
  } satisfies SortImportsConfig,
  rules: {
    'typescript/no-import-type-side-effects': 'error',
  },
};
