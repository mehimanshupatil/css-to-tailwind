import {
  convertBorder,
  convertBorderRadius,
  convertBorderSide,
} from '../helpers/border';
import { convertColor } from '../helpers/color';
import { convertSpacing } from '../helpers/spacing';
import type { ConverterMap } from '../types';

export const borderConverters: ConverterMap = {
  border: (value) => {
    if (value === 'none' || value === '0') return ['border-0'];
    return convertBorder(value);
  },

  'border-width': (value) => {
    const map: Record<string, string> = {
      '0': 'border-0',
      '1px': 'border',
      '2px': 'border-2',
      '4px': 'border-4',
      '8px': 'border-8',
    };
    return [map[value] ?? `border-[${value}]`];
  },

  'border-top': (value) => {
    if (value === 'none' || value === '0') return ['border-t-0'];
    return convertBorderSide(value, 't');
  },
  'border-right': (value) => {
    if (value === 'none' || value === '0') return ['border-r-0'];
    return convertBorderSide(value, 'r');
  },
  'border-bottom': (value) => {
    if (value === 'none' || value === '0') return ['border-b-0'];
    return convertBorderSide(value, 'b');
  },
  'border-left': (value) => {
    if (value === 'none' || value === '0') return ['border-l-0'];
    return convertBorderSide(value, 'l');
  },

  'border-color': (value) => [`border-${convertColor(value)}`],
  'border-top-color': (value) => [`border-t-${convertColor(value)}`],
  'border-right-color': (value) => [`border-r-${convertColor(value)}`],
  'border-bottom-color': (value) => [`border-b-${convertColor(value)}`],
  'border-left-color': (value) => [`border-l-${convertColor(value)}`],

  'border-style': (value) => {
    const map: Record<string, string> = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      double: 'border-double',
      none: 'border-none',
      hidden: 'border-hidden',
    };
    return [map[value] ?? `border-[${value}]`];
  },

  'border-radius': (value) => {
    const r = convertBorderRadius(value);
    return [r ? `rounded-${r}` : 'rounded'];
  },
  'border-top-left-radius': (value) => {
    const r = convertBorderRadius(value);
    return [r ? `rounded-tl-${r}` : 'rounded-tl'];
  },
  'border-top-right-radius': (value) => {
    const r = convertBorderRadius(value);
    return [r ? `rounded-tr-${r}` : 'rounded-tr'];
  },
  'border-bottom-right-radius': (value) => {
    const r = convertBorderRadius(value);
    return [r ? `rounded-br-${r}` : 'rounded-br'];
  },
  'border-bottom-left-radius': (value) => {
    const r = convertBorderRadius(value);
    return [r ? `rounded-bl-${r}` : 'rounded-bl'];
  },

  'border-spacing': (value) => [`border-spacing-${convertSpacing(value)}`],
};
