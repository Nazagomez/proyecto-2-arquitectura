/**
 * Formats a USD amount for Costa Rican readers.
 * @param amount - Price in US dollars.
 * @returns A currency string such as USD 149.00.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
