import type { ConverterMap } from '../types';

function gridCols(_n: number, prefix: string): Record<string, string> {
  const map: Record<string, string> = { none: `${prefix}-none` };
  for (let i = 1; i <= 12; i++) {
    map[`repeat(${i}, minmax(0, 1fr))`] = `${prefix}-${i}`;
  }
  return map;
}

function spanMap(max: number, prefix: string): Record<string, string> {
  const map: Record<string, string> = { '1 / -1': `${prefix}-full` };
  for (let i = 1; i <= max; i++) {
    map[`span ${i} / span ${i}`] = `${prefix}-${i}`;
  }
  return map;
}

function lineMap(max: number, prefix: string): Record<string, string> {
  const map: Record<string, string> = { auto: `${prefix}-auto` };
  for (let i = 1; i <= max; i++) {
    map[`${i}`] = `${prefix}-${i}`;
  }
  return map;
}

export const gridConverters: ConverterMap = {
  'grid-template-columns': (value) => {
    const map = gridCols(12, 'grid-cols');
    return [map[value] ?? `grid-cols-[${value}]`];
  },

  'grid-template-rows': (value) => {
    const map = gridCols(6, 'grid-rows');
    return [map[value] ?? `grid-rows-[${value}]`];
  },

  'grid-column': (value) => {
    const map = spanMap(12, 'col-span');
    return [map[value] ?? `col-[${value}]`];
  },

  'grid-row': (value) => {
    const map = spanMap(6, 'row-span');
    return [map[value] ?? `row-[${value}]`];
  },

  'grid-column-start': (value) => {
    const map = lineMap(13, 'col-start');
    return [map[value] ?? `col-start-[${value}]`];
  },

  'grid-column-end': (value) => {
    const map = lineMap(13, 'col-end');
    return [map[value] ?? `col-end-[${value}]`];
  },

  'grid-row-start': (value) => {
    const map = lineMap(7, 'row-start');
    return [map[value] ?? `row-start-[${value}]`];
  },

  'grid-row-end': (value) => {
    const map = lineMap(7, 'row-end');
    return [map[value] ?? `row-end-[${value}]`];
  },

  'grid-auto-flow': (value) => {
    const map: Record<string, string> = {
      row: 'grid-flow-row',
      column: 'grid-flow-col',
      dense: 'grid-flow-dense',
      'row dense': 'grid-flow-row-dense',
      'column dense': 'grid-flow-col-dense',
    };
    return [map[value] ?? `[grid-auto-flow:${value}]`];
  },

  'grid-auto-columns': (value) => {
    const map: Record<string, string> = {
      auto: 'auto-cols-auto',
      'min-content': 'auto-cols-min',
      'max-content': 'auto-cols-max',
      'minmax(0, 1fr)': 'auto-cols-fr',
    };
    return [map[value] ?? `auto-cols-[${value}]`];
  },

  'grid-auto-rows': (value) => {
    const map: Record<string, string> = {
      auto: 'auto-rows-auto',
      'min-content': 'auto-rows-min',
      'max-content': 'auto-rows-max',
      'minmax(0, 1fr)': 'auto-rows-fr',
    };
    return [map[value] ?? `auto-rows-[${value}]`];
  },
};
