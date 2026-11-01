import type { Category } from '~/types/category'
import type { Product } from '~/types/product'
import { normalizeText } from './normalize-text'

interface SearchProductsInput {
  readonly products: readonly Product[]
  readonly categories: readonly Category[]
  readonly query: string
}

/**
 * Finds products whose text contains every word in the query.
 * @param input - Catalog, categories and the raw search box value.
 * @returns Matching products in catalog order. Empty when the query is blank.
 */
export function searchProducts(input: SearchProductsInput): readonly Product[] {
  const normalizedQuery: string = normalizeText(input.query).trim()
  if (normalizedQuery.length === 0) {
    return []
  }
  const terms: readonly string[] = normalizedQuery.split(/\s+/u)
  return input.products.filter((product) => productMatchesTerms(product, input.categories, terms))
}

/**
 * Checks that every search term appears in the product text.
 * @param product - Candidate article.
 * @param categories - Category names used as extra search text.
 * @param terms - Normalized words from the query.
 * @returns Whether the product should appear in the results.
 */
function productMatchesTerms(product: Product, categories: readonly Category[], terms: readonly string[]): boolean {
  const category: Category | undefined = categories.find((item) => item.slug === product.categorySlug)
  const specificationText: string = product.specifications.map((spec) => `${spec.label} ${spec.value}`).join(' ')
  const haystack: string = normalizeText([
    product.name,
    product.brand,
    product.summary,
    product.description,
    product.color,
    product.connectivity,
    category?.name ?? '',
    category?.summary ?? '',
    specificationText,
  ].join(' '))
  return terms.every((term) => haystack.includes(term))
}
