import categoryData from '~/data/categories.json'
import productData from '~/data/products.json'
import type { Category } from '~/types/category'
import type { PageResult } from '~/types/page-result'
import type { Product } from '~/types/product'
import { CATALOG_PAGE_SIZE } from '~/constants/catalog'
import { listRelatedProducts } from '~/utils/list-related-products'
import { paginateItems } from '~/utils/paginate-items'
import { searchProducts } from '~/utils/search-products'

const categories: readonly Category[] = categoryData as readonly Category[]
const products: readonly Product[] = productData as readonly Product[]

/**
 * Read-only access to the JSON catalog that generates the store.
 * @returns Lookup, search and paging helpers over the same data.
 */
export function useCatalog(): {
  categories: readonly Category[]
  products: readonly Product[]
  findCategory: (slug: string) => Category | undefined
  findProduct: (slug: string) => Product | undefined
  listProductsByCategory: (categorySlug: string) => readonly Product[]
  listFeaturedProducts: () => readonly Product[]
  search: (query: string) => readonly Product[]
  paginate: <T>(items: readonly T[], page: number) => PageResult<T>
  listRelated: (product: Product) => readonly Product[]
  countInCategory: (categorySlug: string) => number
} {
  return {
    categories,
    products,
    findCategory,
    findProduct,
    listProductsByCategory,
    listFeaturedProducts,
    search,
    paginate,
    listRelated,
    countInCategory,
  }
}

/**
 * Finds a category by its URL slug.
 * @param slug - Category slug.
 * @returns The category, or undefined when the slug is unknown.
 */
function findCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

/**
 * Finds a product by its URL slug.
 * @param slug - Product slug.
 * @returns The product, or undefined when the slug is unknown.
 */
function findProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

/**
 * Lists products that belong to one category, in catalog order.
 * @param categorySlug - Category slug.
 * @returns Matching products.
 */
function listProductsByCategory(categorySlug: string): readonly Product[] {
  return products.filter((product) => product.categorySlug === categorySlug)
}

/**
 * Lists products marked for the home selection.
 * @returns Featured products in catalog order.
 */
function listFeaturedProducts(): readonly Product[] {
  return products.filter((product) => product.isFeatured)
}

/**
 * Searches the catalog by keyword.
 * @param query - Raw search text.
 * @returns Matching products.
 */
function search(query: string): readonly Product[] {
  return searchProducts({ products, categories, query })
}

/**
 * Paginates any catalog list with the store page size.
 * @param items - Items to slice.
 * @param page - 1-based page.
 * @returns One page of results.
 */
function paginate<T>(items: readonly T[], page: number): PageResult<T> {
  return paginateItems({ items, page, pageSize: CATALOG_PAGE_SIZE })
}

/**
 * Lists up to three alternatives from the same category.
 * @param product - Product currently open.
 * @returns Related products.
 */
function listRelated(product: Product): readonly Product[] {
  return listRelatedProducts({ products, product, limit: 3 })
}

/**
 * Counts products inside a category.
 * @param categorySlug - Category slug.
 * @returns How many articles belong to it.
 */
function countInCategory(categorySlug: string): number {
  return listProductsByCategory(categorySlug).length
}
