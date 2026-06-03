import { defineConfig } from 'oxfmt';
import type { OxfmtConfig } from './src/oxfmt/types/oxfmt.types';

import { oxfmtConfig } from './dist/index.mjs';

export default defineConfig({ ...oxfmtConfig } satisfies OxfmtConfig);
