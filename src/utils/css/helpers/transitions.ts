const DURATION_MAP: Record<string, string> = {
  '75ms': 'duration-75',
  '100ms': 'duration-100',
  '150ms': 'duration-150',
  '200ms': 'duration-200',
  '300ms': 'duration-300',
  '500ms': 'duration-500',
  '700ms': 'duration-700',
  '1000ms': 'duration-1000',
  '1s': 'duration-1000',
};

export function convertTransition(value: string): string[] {
  const parts = value.split(/\s+/);
  const classes: string[] = [];

  if (value === 'all' || parts.includes('all')) {
    classes.push('transition-all');
  } else {
    classes.push('transition');
  }

  for (const part of parts) {
    if (part.endsWith('ms') || (part.endsWith('s') && !part.includes(' '))) {
      classes.push(DURATION_MAP[part] ?? `duration-[${part}]`);
    }
  }

  return classes;
}
