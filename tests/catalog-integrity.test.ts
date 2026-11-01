import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import categoryData from '../data/categories.json'
import productData from '../data/products.json'
import type { Category } from '../types/category'
import type { Product } from '../types/product'

const categories = categoryData as readonly Category[]
const products = productData as readonly Product[]

describe('catalog documents', () => {
  it('contains at least 30 products and several categories', () => {
    expect(products.length).toBeGreaterThanOrEqual(30)
    expect(categories.length).toBeGreaterThanOrEqual(4)
  })

  it('keeps unique slugs and valid category links', () => {
    const categorySlugs = new Set(categories.map((category) => category.slug))
    const productSlugs = products.map((product) => product.slug)
    expect(new Set(productSlugs).size).toBe(productSlugs.length)
    for (const product of products) {
      expect(categorySlugs.has(product.categorySlug)).toBe(true)
      expect(product.id).toBe(product.slug)
      expect(product.price).toBeGreaterThan(0)
      expect(product.currency).toBe('USD')
      expect(product.brand.length).toBeGreaterThan(0)
      expect(product.summary.length).toBeGreaterThan(0)
      expect(product.description.length).toBeGreaterThan(0)
      expect(product.specifications.length).toBeGreaterThan(0)
      expect(product.image).toBe(`/images/products/${product.slug}.svg`)
      expect(existsSync(resolve(process.cwd(), 'public', product.image.slice(1)))).toBe(true)
    }
  })

  it('includes available and sold-out articles', () => {
    expect(products.some((product) => product.stock === 0)).toBe(true)
    expect(products.some((product) => product.stock > 0)).toBe(true)
  })
})
