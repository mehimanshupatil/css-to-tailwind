import { convertColor } from './color';
import { extractCSSVariableValue } from './cssVar';

const RADIUS_MAP: Record<string, string> = {
  '0': 'none',
  '2px': 'sm',
  '0.125rem': 'sm',
  '4px': '',
  '0.25rem': '',
  '6px': 'md',
  '0.375rem': 'md',
  '8px': 'lg',
  '0.5rem': 'lg',
  '12px': 'xl',
  '0.75rem': 'xl',
  '16px': '2xl',
  '1rem': '2xl',
  '24px': '3xl',
  '1.5rem': '3xl',
  '50%': 'full',
  '9999px': 'full',
  '9999rem': 'full',
};

export function convertBorderRadius(value: string): string {
  const processed = extractCSSVariableValue(value);
  return processed in RADIUS_MAP ? RADIUS_MAP[processed] : `[${processed}]`;
}

function parseBorderParts(value: string, side?: string): string[] {
  const parts = value.trim().split(/\s+/);
  const classes: string[] = [];
  const sideStr = side ? `-${side}` : '';

  for (const part of parts) {
    if (part.match(/^\d+px$/) || part === '0') {
      const w: Record<string, string> = {
        '0': `border${sideStr}-0`,
        '1px': side ? `border-${side}` : 'border',
        '2px': `border${sideStr}-2`,
        '4px': `border${sideStr}-4`,
        '8px': `border${sideStr}-8`,
      };
      classes.push(w[part] ?? `border${sideStr}-[${part}]`);
    } else if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(part)) {
      const s: Record<string, string> = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
        double: 'border-double',
        none: 'border-none',
      };
      classes.push(s[part]);
    } else if (
      part.startsWith('#') ||
      part.startsWith('rgb') ||
      part.startsWith('hsl') ||
      part.startsWith('var(')
    ) {
      const color = convertColor(part);
      classes.push(side ? `border-${side}-${color}` : `border-${color}`);
    }
  }
  return classes.length > 0 ? classes : [`border${sideStr}-[${value}]`];
}

export function convertBorder(value: string): string[] {
  return parseBorderParts(value);
}

export function convertBorderSide(value: string, side: string): string[] {
  return parseBorderParts(value, side);
}
