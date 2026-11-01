import type { ProductSpecification } from './product-specification'

/** An article sold in the audio catalog. */
export interface Product {
  readonly id: string
  readonly slug: string
  readonly name: string
  readonly summary: string
  readonly description: string
  readonly categorySlug: string
  readonly brand: string
  readonly price: number
  readonly currency: 'USD'
  readonly color: string
  readonly connectivity: string
  readonly image: string
  readonly imageAlt: string
  readonly stock: number
  readonly rating: number
  readonly reviewCount: number
  readonly deliveryDays: number
  readonly warrantyMonths: number
  readonly isFeatured: boolean
  readonly specifications: readonly ProductSpecification[]
}
