import type { CustomGroupItemConfig } from 'types/sorting.types';

// ── Client / frontend groups ──────────────────────────

export const SORTING_GROUP_PAGES_COMPONENTS = {
  groupName: 'pages-components',
  elementNamePattern: ['pages/**', 'components/**', './pages/**', './components/**'],
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_HOOKS = {
  groupName: 'hooks',
  elementNamePattern: [
    'hooks/**',
    'providers/**',
    'queries/**',
    './hooks/**',
    './providers/**',
    './queries/**',
  ],
} as const satisfies CustomGroupItemConfig;

export const SORTING_GROUP_CLIENT_ROUTES = {
  groupName: 'client-routes',
  elementNamePattern: ['routes/**', './routes/**'],
} as const satisfies CustomGroupItemConfig;
