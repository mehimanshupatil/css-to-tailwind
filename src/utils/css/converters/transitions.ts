import { convertTransition } from '../helpers/transitions';
import type { ConverterMap } from '../types';

const DURATION_MAP: Record<string, string> = {
  '75ms': 'duration-75',
  '100ms': 'duration-100',
  '150ms': 'duration-150',
  '200ms': 'duration-200',
  '300ms': 'duration-300',
  '500ms': 'duration-500',
  '700ms': 'duration-700',
  '1000ms': 'duration-1000',
  '1s': 'duration-1000',
};

const DELAY_MAP: Record<string, string> = {
  '75ms': 'delay-75',
  '100ms': 'delay-100',
  '150ms': 'delay-150',
  '200ms': 'delay-200',
  '300ms': 'delay-300',
  '500ms': 'delay-500',
  '700ms': 'delay-700',
  '1000ms': 'delay-1000',
  '1s': 'delay-1000',
};

export const transitionConverters: ConverterMap = {
  transition: (value) => {
    if (value === 'none') return ['transition-none'];
    return convertTransition(value);
  },

  'transition-property': (value) => {
    const map: Record<string, string> = {
      none: 'transition-none',
      all: 'transition-all',
      colors: 'transition-colors',
      opacity: 'transition-opacity',
      shadow: 'transition-shadow',
      transform: 'transition-transform',
    };
    return [map[value] ?? `transition-[${value}]`];
  },

  'transition-duration': (value) => [
    DURATION_MAP[value] ?? `duration-[${value}]`,
  ],

  'transition-timing-function': (value) => {
    const map: Record<string, string> = {
      linear: 'ease-linear',
      ease: 'ease-in',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    };
    return [map[value] ?? `ease-[${value}]`];
  },

  'transition-delay': (value) => [DELAY_MAP[value] ?? `delay-[${value}]`],

  animation: (value) => {
    if (value === 'none') return ['animate-none'];
    const map: Record<string, string> = {
      'spin 1s linear infinite': 'animate-spin',
      'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite': 'animate-ping',
      'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite': 'animate-pulse',
      'bounce 1s infinite': 'animate-bounce',
    };
    return [map[value] ?? `animate-[${value}]`];
  },
};
