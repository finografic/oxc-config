import { configOverrides, testOverrides } from './index';
import { defineOxlintPreset } from './preset.types';
import { oxlintLibraryConfig } from './presets/library.preset';

export const oxlintConfig = defineOxlintPreset({
  ...oxlintLibraryConfig,
  overrides: [testOverrides, configOverrides],
});
