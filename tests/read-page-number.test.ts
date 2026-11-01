import { describe, expect, it } from 'vitest'
import { readPageNumber } from '../utils/read-page-number'

describe('readPageNumber', () => {
  it('reads a positive integer', () => {
    expect(readPageNumber('3')).toBe(3)
  })

  it('falls back to the first page for invalid values', () => {
    expect(readPageNumber(undefined)).toBe(1)
    expect(readPageNumber('0')).toBe(1)
    expect(readPageNumber('-2')).toBe(1)
    expect(readPageNumber('dos')).toBe(1)
  })

  it('reads the first value of a repeated query parameter', () => {
    expect(readPageNumber(['4', '2'])).toBe(4)
  })
})
