import { convertColor } from '../helpers/color';
import { extractCSSVariableValue } from '../helpers/cssVar';
import { convertFontSize, convertFontWeight } from '../helpers/font';
import type { ConverterMap } from '../types';

const LEADING_MAP: Record<string, string> = {
  '1': 'leading-none',
  '1.25': 'leading-tight',
  '1.375': 'leading-snug',
  '1.5': 'leading-normal',
  '1.625': 'leading-relaxed',
  '2': 'leading-loose',
  '0.75rem': 'leading-3',
  '12px': 'leading-3',
  '1rem': 'leading-4',
  '16px': 'leading-4',
  '1.25rem': 'leading-5',
  '20px': 'leading-5',
  '1.5rem': 'leading-6',
  '24px': 'leading-6',
  '1.75rem': 'leading-7',
  '28px': 'leading-7',
  '2rem': 'leading-8',
  '32px': 'leading-8',
  '2.25rem': 'leading-9',
  '36px': 'leading-9',
  '2.5rem': 'leading-10',
  '40px': 'leading-10',
};

const TRACKING_MAP: Record<string, string> = {
  '-0.05em': 'tracking-tighter',
  '-0.025em': 'tracking-tight',
  '0em': 'tracking-normal',
  '0': 'tracking-normal',
  '0.025em': 'tracking-wide',
  '0.05em': 'tracking-wider',
  '0.1em': 'tracking-widest',
};

export const typographyConverters: ConverterMap = {
  color: (value) => [`text-${convertColor(value)}`],

  'font-size': (value) => [`text-${convertFontSize(value)}`],

  'font-weight': (value) => [`font-${convertFontWeight(value)}`],

  'font-family': (value) => {
    const family = value.replace(/['"]/g, '').trim();
    const map: Record<string, string> = {
      'ui-sans-serif': 'font-sans',
      'system-ui': 'font-sans',
      'ui-serif': 'font-serif',
      Georgia: 'font-serif',
      'ui-monospace': 'font-mono',
      'SFMono-Regular': 'font-mono',
      Consolas: 'font-mono',
      Menlo: 'font-mono',
      Monaco: 'font-mono',
      'Courier New': 'font-mono',
    };
    for (const [key, cls] of Object.entries(map)) {
      if (family.includes(key)) return [cls];
    }
    const sanitized = family.split(',')[0].trim().replace(/\s+/g, '_');
    return [`font-['${sanitized}']`];
  },

  'font-style': (value) => {
    return [value === 'italic' ? 'italic' : 'not-italic'];
  },

  'line-height': (value) => {
    const processed = extractCSSVariableValue(value);
    return [LEADING_MAP[processed] ?? `leading-[${processed}]`];
  },

  'letter-spacing': (value) => {
    const processed = extractCSSVariableValue(value);
    return [TRACKING_MAP[processed] ?? `tracking-[${processed}]`];
  },

  'text-align': (value) => {
    const map: Record<string, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
      start: 'text-start',
      end: 'text-end',
    };
    return [map[value] ?? `text-[${value}]`];
  },

  'text-decoration': (value) => {
    const map: Record<string, string> = {
      none: 'no-underline',
      underline: 'underline',
      overline: 'overline',
      'line-through': 'line-through',
    };
    return [map[value] ?? `[text-decoration:${value}]`];
  },

  'text-decoration-color': (value) => [`decoration-${convertColor(value)}`],

  'text-decoration-style': (value) => {
    const map: Record<string, string> = {
      solid: 'decoration-solid',
      double: 'decoration-double',
      dotted: 'decoration-dotted',
      dashed: 'decoration-dashed',
      wavy: 'decoration-wavy',
    };
    return [map[value] ?? `decoration-[${value}]`];
  },

  'text-underline-offset': (value) => {
    const map: Record<string, string> = {
      auto: 'underline-offset-auto',
      '0px': 'underline-offset-0',
      '1px': 'underline-offset-1',
      '2px': 'underline-offset-2',
      '4px': 'underline-offset-4',
      '8px': 'underline-offset-8',
    };
    return [map[value] ?? `underline-offset-[${value}]`];
  },

  'text-transform': (value) => {
    const map: Record<string, string> = {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    };
    return [map[value] ?? `[text-transform:${value}]`];
  },

  'text-overflow': (value) => {
    const map: Record<string, string> = {
      ellipsis: 'text-ellipsis',
      clip: 'text-clip',
    };
    return [map[value] ?? `[text-overflow:${value}]`];
  },

  'text-indent': (value) => {
    const processed = extractCSSVariableValue(value);
    return [`indent-[${processed}]`];
  },

  'vertical-align': (value) => {
    const map: Record<string, string> = {
      baseline: 'align-baseline',
      top: 'align-top',
      middle: 'align-middle',
      bottom: 'align-bottom',
      'text-top': 'align-text-top',
      'text-bottom': 'align-text-bottom',
      sub: 'align-sub',
      super: 'align-super',
    };
    return [map[value] ?? `align-[${value}]`];
  },

  'white-space': (value) => {
    const map: Record<string, string> = {
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      'pre-line': 'whitespace-pre-line',
      'pre-wrap': 'whitespace-pre-wrap',
      'break-spaces': 'whitespace-break-spaces',
    };
    return [map[value] ?? `whitespace-[${value}]`];
  },

  'word-break': (value) => {
    const map: Record<string, string> = {
      normal: 'break-normal',
      'break-all': 'break-all',
      'keep-all': 'break-keep',
    };
    return [map[value] ?? `break-[${value}]`];
  },

  'overflow-wrap': (value) => {
    const map: Record<string, string> = {
      normal: 'break-normal',
      'break-word': 'break-words',
      anywhere: 'break-words',
    };
    return [map[value] ?? `break-[${value}]`];
  },

  'list-style-type': (value) => {
    const map: Record<string, string> = {
      none: 'list-none',
      disc: 'list-disc',
      decimal: 'list-decimal',
    };
    return [map[value] ?? `list-[${value}]`];
  },

  'list-style-position': (value) => {
    return [value === 'inside' ? 'list-inside' : 'list-outside'];
  },

  'table-layout': (value) => {
    return [value === 'fixed' ? 'table-fixed' : 'table-auto'];
  },

  'border-collapse': (value) => {
    return [value === 'collapse' ? 'border-collapse' : 'border-separate'];
  },
};
