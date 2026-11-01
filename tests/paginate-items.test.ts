import { describe, expect, it } from 'vitest'
import { paginateItems } from '../utils/paginate-items'

describe('paginateItems', () => {
  it('returns the requested slice and the visible range', () => {
    const actual = paginateItems({ items: ['a', 'b', 'c', 'd', 'e'], page: 2, pageSize: 2 })
    expect(actual.items).toEqual(['c', 'd'])
    expect(actual.totalPages).toBe(3)
    expect(actual.rangeStart).toBe(3)
    expect(actual.rangeEnd).toBe(4)
  })

  it('returns an empty page when the number is past the end', () => {
    const actual = paginateItems({ items: ['a', 'b'], page: 5, pageSize: 2 })
    expect(actual.items).toEqual([])
    expect(actual.rangeStart).toBe(0)
    expect(actual.totalPages).toBe(1)
  })

  it('handles an empty catalog', () => {
    const actual = paginateItems({ items: [], page: 1, pageSize: 4 })
    expect(actual.totalPages).toBe(0)
    expect(actual.items).toEqual([])
  })
})
