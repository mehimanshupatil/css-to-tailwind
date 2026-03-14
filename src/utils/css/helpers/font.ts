import { extractCSSVariableValue } from './cssVar';

const FONT_SIZE_MAP: Record<string, string> = {
  '10px': 'xs',
  '12px': 'xs',
  '0.75rem': 'xs',
  '14px': 'sm',
  '0.875rem': 'sm',
  '16px': 'base',
  '1rem': 'base',
  '1.125rem': 'lg',
  '18px': 'lg',
  '1.25rem': 'xl',
  '20px': 'xl',
  '1.5rem': '2xl',
  '24px': '2xl',
  '1.875rem': '3xl',
  '30px': '3xl',
  '2.25rem': '4xl',
  '36px': '4xl',
  '3rem': '5xl',
  '48px': '5xl',
  '3.75rem': '6xl',
  '60px': '6xl',
  '4.5rem': '7xl',
  '72px': '7xl',
  '6rem': '8xl',
  '96px': '8xl',
  '8rem': '9xl',
  '128px': '9xl',
};

const FONT_WEIGHT_MAP: Record<string, string> = {
  '100': 'thin',
  '200': 'extralight',
  '300': 'light',
  '400': 'normal',
  '500': 'medium',
  '600': 'semibold',
  '700': 'bold',
  '800': 'extrabold',
  '900': 'black',
  normal: 'normal',
  bold: 'bold',
};

export function convertFontSize(value: string): string {
  const processed = extractCSSVariableValue(value);
  return FONT_SIZE_MAP[processed] ?? `[${processed}]`;
}

export function convertFontWeight(value: string): string {
  return FONT_WEIGHT_MAP[value] ?? `[${value}]`;
}
