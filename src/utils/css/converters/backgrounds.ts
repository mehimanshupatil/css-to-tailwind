import { toArbitraryValue } from '../helpers/arbitrary';
import { convertColor, parseCSSVariablesForColors } from '../helpers/color';
import { convertGradient } from '../helpers/gradient';
import type { ConverterMap } from '../types';

function convertBackground(value: string): string[] {
  if (
    value.includes('linear-gradient') ||
    value.includes('radial-gradient') ||
    value.includes('conic-gradient')
  ) {
    return convertGradient(value);
  }
  const processed = parseCSSVariablesForColors(value);
  if (
    processed.startsWith('#') ||
    processed.startsWith('rgb') ||
    processed.startsWith('hsl')
  ) {
    return [`bg-${convertColor(processed)}`];
  }
  if (!processed.includes('(') && !processed.includes('#')) {
    return [`bg-${processed}`];
  }
  return [`bg-[${toArbitraryValue(processed)}]`];
}

export const backgroundConverters: ConverterMap = {
  background: (value) => convertBackground(value),
  'background-color': (value) => [`bg-${convertColor(value)}`],

  'background-image': (value) => {
    if (
      value.startsWith('linear-gradient') ||
      value.startsWith('radial-gradient')
    ) {
      return convertGradient(value);
    }
    return [`bg-[${toArbitraryValue(value)}]`];
  },

  'background-size': (value) => {
    const map: Record<string, string> = {
      auto: 'bg-auto',
      cover: 'bg-cover',
      contain: 'bg-contain',
    };
    return [map[value] ?? `bg-[length:${value}]`];
  },

  'background-position': (value) => {
    const map: Record<string, string> = {
      center: 'bg-center',
      top: 'bg-top',
      'top right': 'bg-top-right',
      right: 'bg-right',
      'bottom right': 'bg-bottom-right',
      bottom: 'bg-bottom',
      'bottom left': 'bg-bottom-left',
      left: 'bg-left',
      'top left': 'bg-top-left',
    };
    return [map[value] ?? `bg-[position:${value}]`];
  },

  'background-repeat': (value) => {
    const map: Record<string, string> = {
      repeat: 'bg-repeat',
      'no-repeat': 'bg-no-repeat',
      'repeat-x': 'bg-repeat-x',
      'repeat-y': 'bg-repeat-y',
      round: 'bg-repeat-round',
      space: 'bg-repeat-space',
    };
    return [map[value] ?? `bg-[${value}]`];
  },

  'background-attachment': (value) => {
    const map: Record<string, string> = {
      fixed: 'bg-fixed',
      local: 'bg-local',
      scroll: 'bg-scroll',
    };
    return [map[value] ?? `bg-[${value}]`];
  },

  'background-clip': (value) => {
    const map: Record<string, string> = {
      border: 'bg-clip-border',
      padding: 'bg-clip-padding',
      content: 'bg-clip-content',
      text: 'bg-clip-text',
    };
    const key = value.replace('-box', '');
    return [map[key] ?? `bg-clip-[${value}]`];
  },

  'background-origin': (value) => {
    const map: Record<string, string> = {
      'border-box': 'bg-origin-border',
      'padding-box': 'bg-origin-padding',
      'content-box': 'bg-origin-content',
    };
    return [map[value] ?? `bg-origin-[${value}]`];
  },
};
