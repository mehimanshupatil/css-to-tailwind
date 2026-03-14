import { extractCSSVariableValue } from './cssVar';
import { convertSpacing } from './spacing';

const SIZE_MAP: Record<string, string> = {
  auto: 'auto',
  '100%': 'full',
  '50%': '1/2',
  '33.333333%': '1/3',
  '66.666667%': '2/3',
  '25%': '1/4',
  '75%': '3/4',
  '20%': '1/5',
  '40%': '2/5',
  '60%': '3/5',
  '80%': '4/5',
  '16.666667%': '1/6',
  '83.333333%': '5/6',
  'fit-content': 'fit',
  'min-content': 'min',
  'max-content': 'max',
  '100vw': 'screen',
  '100vh': 'screen',
  '100dvw': 'dvw',
  '100dvh': 'dvh',
  '100svw': 'svw',
  '100svh': 'svh',
};

export function convertSize(value: string): string {
  const processed = extractCSSVariableValue(value);
  return SIZE_MAP[processed] ?? convertSpacing(processed);
}
