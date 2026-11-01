import { describe, expect, it } from 'vitest'
import type { Product } from '../types/product'
import { buildAbsoluteUrl } from '../utils/build-absolute-url'
import { formatPrice } from '../utils/format-price'
import { formatSnipcartPrice } from '../utils/format-snipcart-price'
import { listRelatedProducts } from '../utils/list-related-products'
import { normalizeText } from '../utils/normalize-text'

const soldOut: Product = {
  id: 'agotado',
  slug: 'agotado',
  name: 'Agotado',
  summary: 'Sin stock',
  description: 'No se puede comprar',
  categorySlug: 'microfonos',
  brand: 'Rode',
  price: 10,
  currency: 'USD',
  color: 'Negro',
  connectivity: 'USB',
  image: '/images/products/agotado.svg',
  imageAlt: 'Agotado',
  stock: 0,
  rating: 4,
  reviewCount: 1,
  deliveryDays: 0,
  warrantyMonths: 12,
  isFeatured: false,
  specifications: [{ label: 'Tipo', value: 'Dinámico' }],
}

const available: Product = { ...soldOut, id: 'listo', slug: 'listo', name: 'Listo', stock: 4 }
const current: Product = { ...soldOut, id: 'actual', slug: 'actual', name: 'Actual', stock: 2 }

describe('catalog helpers', () => {
  it('removes accents and lowercases text', () => {
    expect(normalizeText('Audífonos')).toBe('audifonos')
  })

  it('formats a price and a snipcart decimal', () => {
    expect(formatPrice(149)).toContain('149')
    expect(formatSnipcartPrice(96)).toBe('96.00')
  })

  it('builds an absolute url without a double slash', () => {
    expect(buildAbsoluteUrl('http://localhost:3000/', '/productos/ath-m50x')).toBe('http://localhost:3000/productos/ath-m50x')
  })

  it('lists related products from the same category and puts stock first', () => {
    const actual = listRelatedProducts({
      products: [soldOut, available, current],
      product: current,
      limit: 3,
    })
    expect(actual.map((product) => product.id)).toEqual(['listo', 'agotado'])
  })
})
