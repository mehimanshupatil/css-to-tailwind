import { toArbitraryValue } from './arbitrary';

/** Convert var(--Foo-Bar, #hex) → foo-bar (the variable name as a class segment) */
export function parseCSSVariablesForColors(value: string): string {
  const varPattern = /var\(([^,)]+)(?:,\s*([^)]+))?\)/g;
  return value.replace(varPattern, (_match, varName: string) =>
    varName.replace('--', '').toLowerCase().replace(/_/g, '-')
  );
}

/** Convert a CSS color value to a Tailwind color class segment */
export function convertColor(value: string): string {
  const processed = parseCSSVariablesForColors(value);
  // If the CSS var was replaced with a token name, use it directly
  if (
    !processed.includes('#') &&
    !processed.includes('rgb') &&
    !processed.includes('hsl')
  ) {
    return processed;
  }
  return `[${toArbitraryValue(processed)}]`;
}
