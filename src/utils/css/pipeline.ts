import { cssToTailwindMap } from './converterMap';
import { optimizeClasses } from './core/optimizer';
import { extractFontComment, parseCSSRules } from './core/parser';
import { applyModifiers } from './core/prefixer';
import { toArbitraryValue } from './helpers/arbitrary';
import type { ConversionOptions } from './types';

const FONT_PROPERTIES_SKIPPED_BY_COMMENT = new Set([
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'font-style',
]);

export function cssToTailwind(
  css: string,
  options: ConversionOptions = {}
): string {
  if (!css.trim()) return '';

  const rules = parseCSSRules(css);
  const classes: string[] = [];

  const fontComment = extractFontComment(css);
  if (fontComment) classes.push(fontComment);

  for (const rule of rules) {
    if (fontComment && FONT_PROPERTIES_SKIPPED_BY_COMMENT.has(rule.property)) {
      continue;
    }
    const converter = cssToTailwindMap[rule.property];
    if (converter) {
      classes.push(...converter(rule.value));
    } else {
      classes.push(`[${rule.property}:${toArbitraryValue(rule.value)}]`);
    }
  }

  return applyModifiers(optimizeClasses(classes), options).join(' ');
}
