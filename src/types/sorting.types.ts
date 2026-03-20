import type { RequiredProp } from '@finografic/core';
import type { OxfmtConfig } from 'oxfmt';

export type CustomGroupItemConfig = NonNullable<
  RequiredProp<OxfmtConfig, 'sortImports'>['sortImports']['customGroups']
>[number];
