import { toArbitraryValue } from './arbitrary';
import { convertColor } from './color';

const DIRECTION_MAP: Record<string, string> = {
  'to top': 'bg-gradient-to-t',
  'to top right': 'bg-gradient-to-tr',
  'to right': 'bg-gradient-to-r',
  'to bottom right': 'bg-gradient-to-br',
  'to bottom': 'bg-gradient-to-b',
  'to bottom left': 'bg-gradient-to-bl',
  'to left': 'bg-gradient-to-l',
  'to top left': 'bg-gradient-to-tl',
};

/** Split comma-separated params respecting nested parens */
function splitParams(params: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;

  for (const char of params) {
    if (char === '(') depth++;
    else if (char === ')') depth--;

    if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

export function convertGradient(value: string): string[] {
  const match = value.match(/linear-gradient\((.+)\)$/s);
  if (!match) return [`bg-[${toArbitraryValue(value)}]`];

  const params = splitParams(match[1]);
  if (params.length === 0) return [`bg-[${toArbitraryValue(value)}]`];

  const classes: string[] = [];
  let colorStops = params;

  // Detect direction token (first param)
  const first = params[0].trim();
  const dirClass = DIRECTION_MAP[first];
  if (dirClass) {
    classes.push(dirClass);
    colorStops = params.slice(1);
  } else if (first.endsWith('deg') || first.startsWith('to ')) {
    // Unknown angle/direction → arbitrary
    classes.push(`bg-[linear-gradient(${toArbitraryValue(first)})]`);
    colorStops = params.slice(1);
  } else {
    // No direction token, treat as "to bottom" by default
    classes.push('bg-gradient-to-b');
  }

  // Extract color stops: from-, via-, to-
  const stopClasses = colorStops.map((stop) => {
    // stop may be "color position%" — split on last space
    const parts = stop.trim().split(/\s+/);
    const colorPart = parts[0];
    const color = convertColor(colorPart);
    return color;
  });

  if (stopClasses.length >= 1) classes.push(`from-${stopClasses[0]}`);
  if (stopClasses.length === 3) classes.push(`via-${stopClasses[1]}`);
  if (stopClasses.length >= 2)
    classes.push(`to-${stopClasses[stopClasses.length - 1]}`);

  return classes;
}
