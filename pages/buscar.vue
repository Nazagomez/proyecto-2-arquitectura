<script setup lang="ts">
import type { PageResult } from '~/types/page-result'
import type { Product } from '~/types/product'

const route = useRoute()
const catalog = useCatalog()
const query: string = typeof route.query.q === 'string' ? route.query.q : ''
const page: number = readPageNumber(route.query.page)
const matches: readonly Product[] = catalog.search(query)
const listing: PageResult<Product> = catalog.paginate(matches, page)
const hasQuery: boolean = query.trim().length > 0

useHead({
  title: hasQuery ? `Búsqueda: ${query}` : 'Buscar',
})

/**
 * Keeps the current keywords when moving between result pages.
 * @param nextPage - 1-based page number.
 * @returns Search URL.
 */
function buildPageLink(nextPage: number): string {
  const params = new URLSearchParams()
  if (hasQuery) {
    params.set('q', query)
  }
  if (nextPage > 1) {
    params.set('page', String(nextPage))
  }
  const search: string = params.toString()
  return search.length > 0 ? `/buscar?${search}` : '/buscar'
}
</script>

<template>
  <section class="section">
    <div class="section-heading">
      <h1>Búsqueda</h1>
      <p v-if="!hasQuery">Escribí una marca, un modelo o una categoría. Por ejemplo, “tornamesa” o “shure”.</p>
      <p v-else-if="listing.totalItems === 0">No hay artículos para «{{ query }}».</p>
      <p v-else>
        {{ listing.totalItems }} artículos para «{{ query }}».
        Mostrando {{ listing.rangeStart }}–{{ listing.rangeEnd }}.
      </p>
    </div>
    <div v-if="listing.items.length > 0" class="product-grid">
      <ProductCard v-for="product in listing.items" :key="product.id" :product="product" />
    </div>
    <CatalogPagination
      :current-page="listing.page"
      :total-pages="listing.totalPages"
      :build-page-link="buildPageLink"
    />
  </section>
</template>
