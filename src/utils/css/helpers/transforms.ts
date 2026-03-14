export function convertTransform(value: string): string[] {
  if (value === 'none') return ['transform-none'];
  const classes: string[] = ['transform'];
  const fns = value.match(/\w+\([^)]*\)/g) ?? [];

  for (const fn of fns) {
    const parenIdx = fn.indexOf('(');
    const name = fn.slice(0, parenIdx);
    const param = fn.slice(parenIdx + 1, -1);

    switch (name) {
      case 'translateX':
        classes.push(`translate-x-[${param}]`);
        break;
      case 'translateY':
        classes.push(`translate-y-[${param}]`);
        break;
      case 'translate': {
        const [x, y] = param.split(',').map((p) => p.trim());
        classes.push(`translate-x-[${x}]`);
        if (y) classes.push(`translate-y-[${y}]`);
        break;
      }
      case 'scale':
        classes.push(`scale-[${param}]`);
        break;
      case 'scaleX':
        classes.push(`scale-x-[${param}]`);
        break;
      case 'scaleY':
        classes.push(`scale-y-[${param}]`);
        break;
      case 'rotate':
        classes.push(`rotate-[${param}]`);
        break;
      case 'skewX':
        classes.push(`skew-x-[${param}]`);
        break;
      case 'skewY':
        classes.push(`skew-y-[${param}]`);
        break;
      default:
        classes.push(`[transform:${fn}]`);
    }
  }
  return classes;
}
