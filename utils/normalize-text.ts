/**
 * Lowercases text and removes accents so search ignores spelling of diacritics.
 * @param value - Text to normalize.
 * @returns Comparable plain text.
 */
export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}
