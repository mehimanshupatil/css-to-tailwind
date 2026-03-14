import type { ConverterMap } from '../types';

export const layoutConverters: ConverterMap = {
  display: (value) => {
    const map: Record<string, string> = {
      block: 'block',
      'inline-block': 'inline-block',
      inline: 'inline',
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      'inline-grid': 'inline-grid',
      table: 'table',
      'table-cell': 'table-cell',
      'table-row': 'table-row',
      hidden: 'hidden',
      none: 'hidden',
      contents: 'contents',
      'list-item': 'list-item',
      'flow-root': 'flow-root',
    };
    return [map[value] ?? `[display:${value}]`];
  },

  'flex-direction': (value) => {
    const map: Record<string, string> = {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    };
    return [map[value] ?? `flex-[${value}]`];
  },

  'flex-wrap': (value) => {
    const map: Record<string, string> = {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    };
    return [map[value] ?? `flex-[${value}]`];
  },

  flex: (value) => {
    const map: Record<string, string> = {
      '1': 'flex-1',
      auto: 'flex-auto',
      initial: 'flex-initial',
      none: 'flex-none',
    };
    return [map[value] ?? `flex-[${value}]`];
  },

  'flex-grow': (value) => {
    return [
      value === '0' ? 'grow-0' : value === '1' ? 'grow' : `grow-[${value}]`,
    ];
  },

  'flex-shrink': (value) => {
    return [
      value === '0'
        ? 'shrink-0'
        : value === '1'
          ? 'shrink'
          : `shrink-[${value}]`,
    ];
  },

  'flex-basis': (value) => {
    const map: Record<string, string> = {
      auto: 'basis-auto',
      '0': 'basis-0',
      '100%': 'basis-full',
    };
    return [map[value] ?? `basis-[${value}]`];
  },

  order: (value) => {
    if (value === 'first') return ['order-first'];
    if (value === 'last') return ['order-last'];
    if (value === 'none') return ['order-none'];
    const n = Number.parseInt(value, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= 12) return [`order-${n}`];
    return [`order-[${value}]`];
  },

  'justify-content': (value) => {
    const map: Record<string, string> = {
      'flex-start': 'justify-start',
      start: 'justify-start',
      center: 'justify-center',
      'flex-end': 'justify-end',
      end: 'justify-end',
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly',
      stretch: 'justify-stretch',
      normal: 'justify-normal',
    };
    return [map[value] ?? `justify-[${value}]`];
  },

  'align-items': (value) => {
    const map: Record<string, string> = {
      'flex-start': 'items-start',
      start: 'items-start',
      center: 'items-center',
      'flex-end': 'items-end',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };
    return [map[value] ?? `items-[${value}]`];
  },

  'align-content': (value) => {
    const map: Record<string, string> = {
      'flex-start': 'content-start',
      start: 'content-start',
      center: 'content-center',
      'flex-end': 'content-end',
      end: 'content-end',
      stretch: 'content-stretch',
      'space-between': 'content-between',
      'space-around': 'content-around',
      'space-evenly': 'content-evenly',
      normal: 'content-normal',
      baseline: 'content-baseline',
    };
    return [map[value] ?? `content-[${value}]`];
  },

  'align-self': (value) => {
    const map: Record<string, string> = {
      auto: 'self-auto',
      'flex-start': 'self-start',
      start: 'self-start',
      center: 'self-center',
      'flex-end': 'self-end',
      end: 'self-end',
      stretch: 'self-stretch',
      baseline: 'self-baseline',
    };
    return [map[value] ?? `self-[${value}]`];
  },

  'justify-self': (value) => {
    const map: Record<string, string> = {
      auto: 'justify-self-auto',
      start: 'justify-self-start',
      center: 'justify-self-center',
      end: 'justify-self-end',
      stretch: 'justify-self-stretch',
    };
    return [map[value] ?? `justify-self-[${value}]`];
  },

  float: (value) => {
    const map: Record<string, string> = {
      right: 'float-right',
      left: 'float-left',
      none: 'float-none',
      start: 'float-start',
      end: 'float-end',
    };
    return [map[value] ?? `float-[${value}]`];
  },

  clear: (value) => {
    const map: Record<string, string> = {
      left: 'clear-left',
      right: 'clear-right',
      both: 'clear-both',
      none: 'clear-none',
      start: 'clear-start',
      end: 'clear-end',
    };
    return [map[value] ?? `clear-[${value}]`];
  },

  isolation: (value) => {
    return [value === 'isolate' ? 'isolate' : 'isolation-auto'];
  },

  columns: (value) => {
    const n = Number.parseInt(value, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= 12) return [`columns-${n}`];
    const map: Record<string, string> = {
      auto: 'columns-auto',
      '3xs': 'columns-3xs',
      '2xs': 'columns-2xs',
      xs: 'columns-xs',
      sm: 'columns-sm',
      md: 'columns-md',
      lg: 'columns-lg',
      xl: 'columns-xl',
      '2xl': 'columns-2xl',
      '3xl': 'columns-3xl',
      '4xl': 'columns-4xl',
      '5xl': 'columns-5xl',
      '6xl': 'columns-6xl',
      '7xl': 'columns-7xl',
    };
    return [map[value] ?? `columns-[${value}]`];
  },
};
