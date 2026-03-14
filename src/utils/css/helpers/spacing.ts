import { extractCSSVariableValue } from './cssVar';

/** Split a CSS value string on spaces, respecting parentheses */
export function splitByTopLevelSpaces(value: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;

  for (const char of value) {
    if (char === '(') depth++;
    else if (char === ')') depth--;

    if (char === ' ' && depth === 0) {
      if (current) {
        parts.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }
  if (current) parts.push(current);
  return parts;
}

const SPACING_MAP: Record<string, string> = {
  '0': '0',
  '1px': 'px',
  '2px': '0.5',
  '0.125rem': '0.5',
  '4px': '1',
  '0.25rem': '1',
  '6px': '1.5',
  '0.375rem': '1.5',
  '8px': '2',
  '0.5rem': '2',
  '10px': '2.5',
  '0.625rem': '2.5',
  '12px': '3',
  '0.75rem': '3',
  '14px': '3.5',
  '0.875rem': '3.5',
  '16px': '4',
  '1rem': '4',
  '20px': '5',
  '1.25rem': '5',
  '24px': '6',
  '1.5rem': '6',
  '28px': '7',
  '1.75rem': '7',
  '32px': '8',
  '2rem': '8',
  '36px': '9',
  '2.25rem': '9',
  '40px': '10',
  '2.5rem': '10',
  '44px': '11',
  '2.75rem': '11',
  '48px': '12',
  '3rem': '12',
  '56px': '14',
  '3.5rem': '14',
  '64px': '16',
  '4rem': '16',
  '80px': '20',
  '5rem': '20',
  '96px': '24',
  '6rem': '24',
  '8rem': '32',
  '10rem': '40',
  '12rem': '48',
  '14rem': '56',
  '16rem': '64',
};

export function convertSpacing(value: string): string {
  const processed = extractCSSVariableValue(value);
  return SPACING_MAP[processed] ?? `[${processed}]`;
}

function buildShorthand(parts: string[], prefix: string): string[] {
  const s = (v: string) => convertSpacing(extractCSSVariableValue(v));
  if (parts.length === 1) return [`${prefix}-${s(parts[0])}`];
  if (parts.length === 2) {
    return [`${prefix}y-${s(parts[0])}`, `${prefix}x-${s(parts[1])}`];
  }
  if (parts.length === 3) {
    return [
      `${prefix}t-${s(parts[0])}`,
      `${prefix}x-${s(parts[1])}`,
      `${prefix}b-${s(parts[2])}`,
    ];
  }
  if (parts.length === 4) {
    return [
      `${prefix}t-${s(parts[0])}`,
      `${prefix}r-${s(parts[1])}`,
      `${prefix}b-${s(parts[2])}`,
      `${prefix}l-${s(parts[3])}`,
    ];
  }
  return [`${prefix}-[${value}]`];
}

export function convertPadding(value: string): string[] {
  return buildShorthand(splitByTopLevelSpaces(value), 'p');
}

export function convertMargin(value: string): string[] {
  return buildShorthand(splitByTopLevelSpaces(value), 'm');
}
