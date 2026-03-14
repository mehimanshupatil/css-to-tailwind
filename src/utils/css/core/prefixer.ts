import type { ConversionOptions } from '../types';

/**
 * Apply responsive breakpoint, state variant, and custom prefix
 * to all classes. Skips bare arbitrary-value classes ([...]).
 *
 * Modifier order: {responsive}:{variant}:{prefix}:{utility}
 * e.g. md:hover:cv:bg-blue-500
 */
export function applyModifiers(
  classes: string[],
  options: ConversionOptions
): string[] {
  const modifierParts: string[] = [];
  if (options.responsive) modifierParts.push(options.responsive);
  if (options.variant) modifierParts.push(options.variant);
  const modifierPrefix = modifierParts.length
    ? `${modifierParts.join(':')}:`
    : '';

  return classes.map((cls) => {
    // Skip bare arbitrary-property classes like [display:flex]
    if (cls.startsWith('[')) return cls;

    // Apply custom utility prefix (e.g. cv:)
    const withPrefix =
      options.usePrefix && options.prefix && !cls.includes(':')
        ? `${options.prefix}:${cls}`
        : cls;

    // Prepend responsive/variant modifiers
    return modifierPrefix ? `${modifierPrefix}${withPrefix}` : withPrefix;
  });
}
