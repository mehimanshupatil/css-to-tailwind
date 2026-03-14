import { convertTransform } from '../helpers/transforms';
import type { ConverterMap } from '../types';

export const transformConverters: ConverterMap = {
  transform: (value) => convertTransform(value),

  'transform-origin': (value) => {
    const map: Record<string, string> = {
      center: 'origin-center',
      top: 'origin-top',
      'top right': 'origin-top-right',
      right: 'origin-right',
      'bottom right': 'origin-bottom-right',
      bottom: 'origin-bottom',
      'bottom left': 'origin-bottom-left',
      left: 'origin-left',
      'top left': 'origin-top-left',
    };
    return [map[value] ?? `origin-[${value}]`];
  },
};
