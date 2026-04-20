import type {
  SortImportsConfig as SortImportsConfigOriginal,
  CustomGroupItemConfig as CustomGroupItemConfigOriginal,
} from 'oxfmt';
import type { OmitIndexSignature } from 'type-fest';

export type SortImportsConfig = OmitIndexSignature<SortImportsConfigOriginal>;
export type CustomGroupItemConfig = OmitIndexSignature<CustomGroupItemConfigOriginal>;
