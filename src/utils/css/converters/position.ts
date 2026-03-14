import { convertSpacing } from '../helpers/spacing';
import type { ConverterMap } from '../types';

export const positionConverters: ConverterMap = {
  position: (value) => {
    const map: Record<string, string> = {
      static: 'static',
      fixed: 'fixed',
      absolute: 'absolute',
      relative: 'relative',
      sticky: 'sticky',
    };
    return [map[value] ?? `[position:${value}]`];
  },

  top: (value) => [`top-${convertSpacing(value)}`],
  right: (value) => [`right-${convertSpacing(value)}`],
  bottom: (value) => [`bottom-${convertSpacing(value)}`],
  left: (value) => [`left-${convertSpacing(value)}`],
  inset: (value) => [`inset-${convertSpacing(value)}`],
  'inset-inline': (value) => [`inset-x-${convertSpacing(value)}`],
  'inset-block': (value) => [`inset-y-${convertSpacing(value)}`],

  'z-index': (value) => {
    const map: Record<string, string> = {
      '0': 'z-0',
      '10': 'z-10',
      '20': 'z-20',
      '30': 'z-30',
      '40': 'z-40',
      '50': 'z-50',
      auto: 'z-auto',
    };
    return [map[value] ?? `z-[${value}]`];
  },
};
