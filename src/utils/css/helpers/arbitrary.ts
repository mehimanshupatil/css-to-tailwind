/** Replace spaces with underscores for Tailwind arbitrary value syntax */
export function toArbitraryValue(value: string): string {
  return value.replace(/\s+/g, '_');
}
