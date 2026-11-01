/** One page of a longer list. */
export interface PageResult<T> {
  readonly items: readonly T[]
  readonly page: number
  readonly pageSize: number
  readonly totalItems: number
  readonly totalPages: number
  readonly rangeStart: number
  readonly rangeEnd: number
}
