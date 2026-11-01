/**
 * Reads a 1-based page from a route query value.
 * @param value - Raw query parameter.
 * @returns A page number of at least 1.
 */
export function readPageNumber(value: unknown): number {
  const raw: unknown = Array.isArray(value) ? value[0] : value
  const page: number = typeof raw === 'string' ? Number(raw) : Number.NaN
  if (!Number.isInteger(page) || page < 1) {
    return 1
  }
  return page
}
