import { toArbitraryValue } from '../helpers/arbitrary';
import { convertColor } from '../helpers/color';
import type { ConverterMap } from '../types';

export const extendedConverters: ConverterMap = {
  'aspect-ratio': (value) => {
    const map: Record<string, string> = {
      auto: 'aspect-auto',
      '1 / 1': 'aspect-square',
      '16 / 9': 'aspect-video',
    };
    return [map[value] ?? `aspect-[${toArbitraryValue(value)}]`];
  },

  'object-fit': (value) => {
    const map: Record<string, string> = {
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    };
    return [map[value] ?? `object-[${value}]`];
  },

  'object-position': (value) => {
    const map: Record<string, string> = {
      bottom: 'object-bottom',
      center: 'object-center',
      left: 'object-left',
      'left bottom': 'object-left-bottom',
      'left top': 'object-left-top',
      right: 'object-right',
      'right bottom': 'object-right-bottom',
      'right top': 'object-right-top',
      top: 'object-top',
    };
    return [map[value] ?? `object-[${toArbitraryValue(value)}]`];
  },

  outline: (value) => {
    if (value === 'none' || value === '0') return ['outline-none'];
    if (value === 'auto') return ['outline'];
    const parts = value.trim().split(/\s+/);
    const classes: string[] = [];
    for (const part of parts) {
      if (part.match(/^\d+px$/) || part === '0') {
        const w: Record<string, string> = {
          '0': 'outline-0',
          '1px': 'outline-1',
          '2px': 'outline-2',
          '4px': 'outline-4',
          '8px': 'outline-8',
        };
        classes.push(w[part] ?? `outline-[${part}]`);
      } else if (
        ['solid', 'dashed', 'dotted', 'double', 'none'].includes(part)
      ) {
        classes.push(`outline-${part}`);
      } else if (
        part.startsWith('#') ||
        part.startsWith('rgb') ||
        part.startsWith('var(')
      ) {
        classes.push(`outline-${convertColor(part)}`);
      }
    }
    return classes.length > 0 ? classes : [`outline-[${value}]`];
  },

  'outline-width': (value) => {
    const map: Record<string, string> = {
      '0': 'outline-0',
      '1px': 'outline-1',
      '2px': 'outline-2',
      '4px': 'outline-4',
      '8px': 'outline-8',
    };
    return [map[value] ?? `outline-[${value}]`];
  },

  'outline-color': (value) => [`outline-${convertColor(value)}`],

  'outline-style': (value) => {
    const map: Record<string, string> = {
      solid: 'outline',
      dashed: 'outline-dashed',
      dotted: 'outline-dotted',
      double: 'outline-double',
      none: 'outline-none',
    };
    return [map[value] ?? `[outline-style:${value}]`];
  },

  'outline-offset': (value) => {
    const map: Record<string, string> = {
      '0px': 'outline-offset-0',
      '1px': 'outline-offset-1',
      '2px': 'outline-offset-2',
      '4px': 'outline-offset-4',
      '8px': 'outline-offset-8',
    };
    return [map[value] ?? `outline-offset-[${value}]`];
  },

  'place-items': (value) => {
    const map: Record<string, string> = {
      start: 'place-items-start',
      end: 'place-items-end',
      center: 'place-items-center',
      stretch: 'place-items-stretch',
      baseline: 'place-items-baseline',
    };
    return [map[value] ?? `place-items-[${value}]`];
  },

  'place-content': (value) => {
    const map: Record<string, string> = {
      center: 'place-content-center',
      start: 'place-content-start',
      end: 'place-content-end',
      'space-between': 'place-content-between',
      'space-around': 'place-content-around',
      'space-evenly': 'place-content-evenly',
      stretch: 'place-content-stretch',
      baseline: 'place-content-baseline',
    };
    return [map[value] ?? `place-content-[${value}]`];
  },

  'place-self': (value) => {
    const map: Record<string, string> = {
      auto: 'place-self-auto',
      start: 'place-self-start',
      end: 'place-self-end',
      center: 'place-self-center',
      stretch: 'place-self-stretch',
    };
    return [map[value] ?? `place-self-[${value}]`];
  },

  appearance: (value) => {
    return [value === 'none' ? 'appearance-none' : 'appearance-auto'];
  },

  'will-change': (value) => {
    const map: Record<string, string> = {
      auto: 'will-change-auto',
      'scroll-position': 'will-change-scroll',
      contents: 'will-change-contents',
      transform: 'will-change-transform',
    };
    return [map[value] ?? `will-change-[${value}]`];
  },

  'overscroll-behavior': (value) => {
    const map: Record<string, string> = {
      auto: 'overscroll-auto',
      contain: 'overscroll-contain',
      none: 'overscroll-none',
    };
    return [map[value] ?? `overscroll-[${value}]`];
  },

  'overscroll-behavior-x': (value) => {
    const map: Record<string, string> = {
      auto: 'overscroll-x-auto',
      contain: 'overscroll-x-contain',
      none: 'overscroll-x-none',
    };
    return [map[value] ?? `overscroll-x-[${value}]`];
  },

  'overscroll-behavior-y': (value) => {
    const map: Record<string, string> = {
      auto: 'overscroll-y-auto',
      contain: 'overscroll-y-contain',
      none: 'overscroll-y-none',
    };
    return [map[value] ?? `overscroll-y-[${value}]`];
  },

  'touch-action': (value) => {
    const map: Record<string, string> = {
      auto: 'touch-auto',
      none: 'touch-none',
      'pan-x': 'touch-pan-x',
      'pan-left': 'touch-pan-left',
      'pan-right': 'touch-pan-right',
      'pan-y': 'touch-pan-y',
      'pan-up': 'touch-pan-up',
      'pan-down': 'touch-pan-down',
      'pinch-zoom': 'touch-pinch-zoom',
      manipulation: 'touch-manipulation',
    };
    return [map[value] ?? `touch-[${value}]`];
  },

  'caret-color': (value) => [`caret-${convertColor(value)}`],

  'accent-color': (value) => [`accent-${convertColor(value)}`],

  content: (value) => {
    if (value === 'none') return ['content-none'];
    if (value === 'normal') return ['content-normal'];
    return [`content-[${toArbitraryValue(value)}]`];
  },
};
