import {
  convertBackdropFilter,
  convertBoxShadow,
  convertFilter,
} from '../helpers/effects';
import type { ConverterMap } from '../types';

export const effectsConverters: ConverterMap = {
  'box-shadow': (value) => {
    if (value === 'none') return ['shadow-none'];
    return convertBoxShadow(value);
  },

  opacity: (value) => {
    const pct = Math.round(Number.parseFloat(value) * 100);
    const steps = [
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
      95, 100,
    ];
    const match = steps.find((s) => s === pct);
    return [match !== undefined ? `opacity-${match}` : `opacity-[${value}]`];
  },

  filter: (value) => {
    if (value === 'none') return ['filter-none'];
    return convertFilter(value);
  },

  'backdrop-filter': (value) => {
    if (value === 'none') return ['backdrop-filter-none'];
    return convertBackdropFilter(value);
  },

  'mix-blend-mode': (value) => {
    const blendModes = new Set([
      'normal',
      'multiply',
      'screen',
      'overlay',
      'darken',
      'lighten',
      'color-dodge',
      'color-burn',
      'hard-light',
      'soft-light',
      'difference',
      'exclusion',
      'hue',
      'saturation',
      'color',
      'luminosity',
      'plus-lighter',
    ]);
    return [
      blendModes.has(value)
        ? `mix-blend-${value}`
        : `[mix-blend-mode:${value}]`,
    ];
  },

  'background-blend-mode': (value) => [`bg-blend-${value}`],
};
