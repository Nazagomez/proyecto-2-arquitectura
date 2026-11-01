import { describe, expect, it } from 'vitest'
import type { Category } from '../types/category'
import type { Product } from '../types/product'
import { searchProducts } from '../utils/search-products'

const inputCategories: readonly Category[] = [
  { slug: 'audifonos', name: 'Audífonos', summary: 'Estudio', description: 'Cerrados y abiertos' },
]

const inputProducts: readonly Product[] = [
  {
    id: 'uno',
    slug: 'uno',
    name: 'Audio-Technica ATH-M50x',
    summary: 'Cerrados de estudio',
    description: 'Cable desmontable',
    categorySlug: 'audifonos',
    brand: 'Audio-Technica',
    price: 149,
    currency: 'USD',
    color: 'Negro',
    connectivity: 'Cable',
    image: '/images/products/uno.svg',
    imageAlt: 'Audífonos',
    stock: 2,
    rating: 4.8,
    reviewCount: 10,
    deliveryDays: 3,
    warrantyMonths: 12,
    isFeatured: false,
    specifications: [{ label: 'Impedancia', value: '38 ohm' }],
  },
]

describe('searchProducts', () => {
  it('matches a brand without accents in the query', () => {
    const actual = searchProducts({ products: inputProducts, categories: inputCategories, query: 'audifonos technica' })
    expect(actual.map((product) => product.id)).toEqual(['uno'])
  })

  it('returns nothing for a blank query', () => {
    const actual = searchProducts({ products: inputProducts, categories: inputCategories, query: '   ' })
    expect(actual).toEqual([])
  })

  it('requires every word to match', () => {
    const actual = searchProducts({ products: inputProducts, categories: inputCategories, query: 'technica tornamesa' })
    expect(actual).toEqual([])
  })
})
