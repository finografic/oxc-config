import type { CustomGroupItemConfig } from 'src/types/sorting.types';

export const SORTING_GROUP_REACT = {
  groupName: 'react',
  elementNamePattern: ['react', 'react-dom', 'react/**', '@react/**'],
} as const satisfies CustomGroupItemConfig;
