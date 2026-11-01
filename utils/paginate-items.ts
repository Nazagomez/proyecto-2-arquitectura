import type { PageResult } from '~/types/page-result'

interface PaginateItemsInput<T> {
  readonly items: readonly T[]
  readonly page: number
  readonly pageSize: number
}

/**
 * Slices a list into a single page.
 * Out-of-range pages return no items and keep the requested page number.
 * @param input - Full list, requested page and page size.
 * @returns The page plus counts for the pager.
 */
export function paginateItems<T>(input: PaginateItemsInput<T>): PageResult<T> {
  const pageSize: number = input.pageSize > 0 ? input.pageSize : 1
  const totalItems: number = input.items.length
  const totalPages: number = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize)
  const page: number = input.page < 1 ? 1 : input.page
  const start: number = (page - 1) * pageSize
  const items: readonly T[] = page > totalPages ? [] : input.items.slice(start, start + pageSize)
  const rangeStart: number = items.length === 0 ? 0 : start + 1
  const rangeEnd: number = items.length === 0 ? 0 : start + items.length
  return { items, page, pageSize, totalItems, totalPages, rangeStart, rangeEnd }
}
