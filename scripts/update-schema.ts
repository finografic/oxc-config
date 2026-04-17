/**
 * Copies the oxfmt configuration schema from the installed package into internal/schemas/ for offline
 * reference and editor validation.
 *
 * Run: pnpm update.schema
 */
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const src = resolve(root, 'node_modules/oxfmt/configuration_schema.json');
const dest = resolve(root, 'internal/schemas/oxfmt.schema.json');

copyFileSync(src, dest);
console.log(`✓ Schema copied to internal/schemas/oxfmt.schema.json`);
