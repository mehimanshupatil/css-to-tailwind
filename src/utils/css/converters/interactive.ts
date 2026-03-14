import type { ConverterMap } from '../types';

export const interactiveConverters: ConverterMap = {
  overflow: (value) => {
    const map: Record<string, string> = {
      auto: 'overflow-auto',
      hidden: 'overflow-hidden',
      clip: 'overflow-clip',
      visible: 'overflow-visible',
      scroll: 'overflow-scroll',
    };
    return [map[value] ?? `overflow-[${value}]`];
  },

  'overflow-x': (value) => {
    const map: Record<string, string> = {
      auto: 'overflow-x-auto',
      hidden: 'overflow-x-hidden',
      clip: 'overflow-x-clip',
      visible: 'overflow-x-visible',
      scroll: 'overflow-x-scroll',
    };
    return [map[value] ?? `overflow-x-[${value}]`];
  },

  'overflow-y': (value) => {
    const map: Record<string, string> = {
      auto: 'overflow-y-auto',
      hidden: 'overflow-y-hidden',
      clip: 'overflow-y-clip',
      visible: 'overflow-y-visible',
      scroll: 'overflow-y-scroll',
    };
    return [map[value] ?? `overflow-y-[${value}]`];
  },

  visibility: (value) => {
    const map: Record<string, string> = {
      visible: 'visible',
      hidden: 'invisible',
      collapse: 'collapse',
    };
    return [map[value] ?? `[visibility:${value}]`];
  },

  cursor: (value) => {
    const cursors = new Set([
      'auto',
      'default',
      'pointer',
      'wait',
      'text',
      'move',
      'help',
      'not-allowed',
      'none',
      'context-menu',
      'progress',
      'cell',
      'crosshair',
      'vertical-text',
      'alias',
      'copy',
      'no-drop',
      'grab',
      'grabbing',
      'all-scroll',
      'col-resize',
      'row-resize',
      'n-resize',
      'e-resize',
      's-resize',
      'w-resize',
      'ne-resize',
      'nw-resize',
      'se-resize',
      'sw-resize',
      'ew-resize',
      'ns-resize',
      'nesw-resize',
      'nwse-resize',
      'zoom-in',
      'zoom-out',
    ]);
    return [cursors.has(value) ? `cursor-${value}` : `cursor-[${value}]`];
  },

  'pointer-events': (value) => {
    return [value === 'none' ? 'pointer-events-none' : 'pointer-events-auto'];
  },

  'user-select': (value) => {
    const map: Record<string, string> = {
      none: 'select-none',
      text: 'select-text',
      all: 'select-all',
      auto: 'select-auto',
    };
    return [map[value] ?? `select-[${value}]`];
  },

  resize: (value) => {
    const map: Record<string, string> = {
      none: 'resize-none',
      both: 'resize',
      horizontal: 'resize-x',
      vertical: 'resize-y',
    };
    return [map[value] ?? `resize-[${value}]`];
  },

  'scroll-behavior': (value) => {
    return [value === 'smooth' ? 'scroll-smooth' : 'scroll-auto'];
  },

  'scroll-snap-type': (value) => {
    const map: Record<string, string> = {
      x: 'snap-x',
      y: 'snap-y',
      both: 'snap-both',
      none: 'snap-none',
      'x mandatory': 'snap-x snap-mandatory',
      'y mandatory': 'snap-y snap-mandatory',
    };
    return (map[value] ?? `snap-[${value}]`).split(' ');
  },

  'scroll-snap-align': (value) => {
    const map: Record<string, string> = {
      start: 'snap-start',
      end: 'snap-end',
      center: 'snap-center',
      none: 'snap-align-none',
    };
    return [map[value] ?? `snap-[${value}]`];
  },
};
