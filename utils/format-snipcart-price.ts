/**
 * Formats a price the way Snipcart expects it: dot decimal, two digits.
 * @param amount - Price in US dollars.
 * @returns A plain decimal string.
 */
export function formatSnipcartPrice(amount: number): string {
  return amount.toFixed(2)
}
