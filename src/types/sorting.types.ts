import type { RequiredProp } from '@finografic/core';

import type { OxfmtConfig } from 'types/oxfmt.types';

export type CustomGroupItemConfig = NonNullable<
  RequiredProp<OxfmtConfig, 'sortImports'>['sortImports']['customGroups']
>[number];
