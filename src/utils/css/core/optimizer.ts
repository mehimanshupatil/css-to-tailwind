/**
 * Collapse directional spacing classes where possible:
 *   pt-4 pb-4 → py-4
 *   pl-2 pr-2 → px-2
 *   pt-2 pr-2 pb-2 pl-2 → p-2
 *
 * Must run BEFORE applyModifiers so class names are bare.
 */
export function optimizeClasses(classes: string[]): string[] {
  const optimized: string[] = [];
  const grouped: Record<string, string[]> = {};

  for (const cls of classes) {
    const paddingMatch = cls.match(/^(p[tblr])-(.+)$/);
    const marginMatch = cls.match(/^(m[tblr])-(.+)$/);

    if (paddingMatch) {
      const key = `p-${paddingMatch[2]}`;
      (grouped[key] ??= []).push(paddingMatch[1]);
    } else if (marginMatch) {
      const key = `m-${marginMatch[2]}`;
      (grouped[key] ??= []).push(marginMatch[1]);
    } else {
      optimized.push(cls);
    }
  }

  for (const [key, dirs] of Object.entries(grouped)) {
    const [type, ...rest] = key.split('-');
    const val = rest.join('-');
    const unique = [...new Set(dirs)];

    if (
      unique.includes(`${type}t`) &&
      unique.includes(`${type}b`) &&
      !unique.includes(`${type}l`) &&
      !unique.includes(`${type}r`)
    ) {
      optimized.push(`${type}y-${val}`);
    } else if (
      unique.includes(`${type}l`) &&
      unique.includes(`${type}r`) &&
      !unique.includes(`${type}t`) &&
      !unique.includes(`${type}b`)
    ) {
      optimized.push(`${type}x-${val}`);
    } else if (unique.length === 4) {
      optimized.push(`${type}-${val}`);
    } else {
      for (const dir of unique) {
        optimized.push(`${dir}-${val}`);
      }
    }
  }

  return optimized;
}
