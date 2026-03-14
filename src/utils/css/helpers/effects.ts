import { toArbitraryValue } from './arbitrary';

const SHADOW_MAP: Record<string, string> = {
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)': 'shadow-sm',
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)': 'shadow',
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)':
    'shadow-md',
  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)':
    'shadow-lg',
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)':
    'shadow-xl',
  '0 25px 50px -12px rgb(0 0 0 / 0.25)': 'shadow-2xl',
  'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)': 'shadow-inner',
};

export function convertBoxShadow(value: string): string[] {
  return [SHADOW_MAP[value] ?? `shadow-[${toArbitraryValue(value)}]`];
}

type BlurMap = Record<string, string>;

function makeBlurMap(prefix: string): BlurMap {
  const p = prefix ? `${prefix}-` : '';
  return {
    '0': `${p}blur-none`,
    '1px': `${p}blur-sm`,
    '4px': `${p}blur`,
    '8px': `${p}blur-md`,
    '12px': `${p}blur-lg`,
    '16px': `${p}blur-xl`,
    '24px': `${p}blur-2xl`,
    '40px': `${p}blur-3xl`,
  };
}

function parseFilterFunctions(value: string, prefix: string): string[] {
  const classes: string[] = [];
  const fns = value.match(/\w+\([^)]*\)/g) ?? [];
  const p = prefix ? `${prefix}-` : '';
  const blurMap = makeBlurMap(prefix);

  for (const fn of fns) {
    const parenIdx = fn.indexOf('(');
    const name = fn.slice(0, parenIdx);
    const param = fn.slice(parenIdx + 1, -1);

    switch (name) {
      case 'blur': {
        classes.push(blurMap[param] ?? `${p}blur-[${param}]`);
        break;
      }
      case 'brightness':
        classes.push(`${p}brightness-[${param}]`);
        break;
      case 'contrast':
        classes.push(`${p}contrast-[${param}]`);
        break;
      case 'grayscale':
        classes.push(
          param === '1' || param === '100%'
            ? `${p}grayscale`
            : `${p}grayscale-[${param}]`
        );
        break;
      case 'hue-rotate':
        classes.push(`${p}hue-rotate-[${param}]`);
        break;
      case 'invert':
        classes.push(
          param === '1' || param === '100%'
            ? `${p}invert`
            : `${p}invert-[${param}]`
        );
        break;
      case 'saturate':
        classes.push(`${p}saturate-[${param}]`);
        break;
      case 'sepia':
        classes.push(
          param === '1' || param === '100%'
            ? `${p}sepia`
            : `${p}sepia-[${param}]`
        );
        break;
      default:
        classes.push(`[${prefix ? `${prefix}-` : ''}filter:${fn}]`);
    }
  }
  return classes;
}

export function convertFilter(value: string): string[] {
  return parseFilterFunctions(value, '');
}

export function convertBackdropFilter(value: string): string[] {
  return parseFilterFunctions(value, 'backdrop');
}
