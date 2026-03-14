/** Extract fallback value from a CSS variable: var(--x, fallback) → fallback */
export function extractCSSVariableValue(value: string): string {
  const match = value.match(/var\([^,)]+,\s*([^)]+)\)/);
  return match ? match[1].trim() : value;
}
