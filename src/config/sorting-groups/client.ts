import type { CustomGroupItemConfig } from 'src/types/sorting.types';

export const SORTING_GROUP_PAGES_COMPONENTS = {
  groupName: 'pages-components',
  elementNamePattern: ['pages/**', 'components/**', './pages/**', './components/**'],
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_HOOKS_ROUTES = {
  groupName: 'hooks-routes',
  elementNamePattern: [
    'hooks/**',
    'routes/**',
    'providers/**',
    'queries/**',
    './hooks/**',
    './routes/**',
    './providers/**',
    './queries/**',
  ],
} as const satisfies CustomGroupItemConfig;
