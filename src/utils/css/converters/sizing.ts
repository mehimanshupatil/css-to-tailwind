import { convertSize } from '../helpers/size';
import type { ConverterMap } from '../types';

export const sizingConverters: ConverterMap = {
  width: (value) => [`w-${convertSize(value)}`],
  height: (value) => [`h-${convertSize(value)}`],
  'min-width': (value) => [`min-w-${convertSize(value)}`],
  'min-height': (value) => [`min-h-${convertSize(value)}`],
  'max-width': (value) => [`max-w-${convertSize(value)}`],
  'max-height': (value) => [`max-h-${convertSize(value)}`],
  'inline-size': (value) => [`w-${convertSize(value)}`],
  'block-size': (value) => [`h-${convertSize(value)}`],
};
