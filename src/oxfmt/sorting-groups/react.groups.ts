import type { CustomGroupItemConfig } from 'oxfmt/types/sorting.types';

// ── React framework group ─────────────────────────────

export const SORTING_GROUP_REACT = {
  groupName: 'react',
  elementNamePattern: ['react', 'react-dom', 'react/**', '@react/**'],
} as const satisfies CustomGroupItemConfig;
