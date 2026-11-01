import type { Product } from '~/types/product'

interface ListRelatedProductsInput {
  readonly products: readonly Product[]
  readonly product: Product
  readonly limit: number
}

/**
 * Picks other products from the same category, in-stock items first.
 * @param input - Full catalog, current product and maximum count.
 * @returns Related products, excluding the current one.
 */
export function listRelatedProducts(input: ListRelatedProductsInput): readonly Product[] {
  return input.products
    .filter((candidate) => candidate.categorySlug === input.product.categorySlug && candidate.id !== input.product.id)
    .slice()
    .sort((left, right) => compareAvailability(left, right))
    .slice(0, input.limit)
}

/**
 * Sorts available products ahead of sold-out ones.
 * @param left - First product.
 * @param right - Second product.
 * @returns Sort order.
 */
function compareAvailability(left: Product, right: Product): number {
  if (left.stock > 0 && right.stock === 0) {
    return -1
  }
  if (left.stock === 0 && right.stock > 0) {
    return 1
  }
  return 0
}
