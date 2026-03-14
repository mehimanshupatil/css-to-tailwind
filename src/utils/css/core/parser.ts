import type { CSSRule } from '../types';

/**
 * Extract the first font design-token comment, e.g.
 * /* New/Paragraph/P3 Semibold * / → 'paragraph-p3-semibold'
 */
export function extractFontComment(css: string): string | null {
  const match = css.match(/\/\*\s*([^*]+(?:\/[^*]+)*)\s*\*\//);
  if (!match) return null;

  let cls = match[1]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-');

  if (cls.startsWith('new-')) cls = cls.slice(4);
  return cls || null;
}

/**
 * Parse flat CSS property declarations into rules.
 * Strips inline comments and !important.
 * Does not handle nested CSS or at-rules.
 */
export function parseCSSRules(css: string): CSSRule[] {
  const rules: CSSRule[] = [];

  for (const line of css.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
      continue;
    }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const property = trimmed.slice(0, colonIdx).trim();
    const value = trimmed
      .slice(colonIdx + 1)
      .replace(';', '')
      .replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, '')
      .replace(/\s*!important\s*/g, '')
      .trim();

    if (property && value) {
      rules.push({ property, value });
    }
  }

  return rules;
}
