<script setup lang="ts">
import type { Category } from '~/types/category'
import type { PageResult } from '~/types/page-result'
import type { Product } from '~/types/product'

const route = useRoute()
const catalog = useCatalog()
const slug: string = String(route.params.slug)
const found: Category | undefined = catalog.findCategory(slug)

if (!found) {
  throw createError({ statusCode: 404, message: 'Categoría no encontrada', fatal: true })
}

const category: Category = found
const page: number = readPageNumber(route.query.page)
const listing: PageResult<Product> = catalog.paginate(catalog.listProductsByCategory(category.slug), page)

useHead({
  title: category.name,
  meta: [{ name: 'description', content: category.description }],
})

/**
 * Builds the URL of a category page.
 * @param nextPage - 1-based page number.
 * @returns Path with a query only after the first page.
 */
function buildPageLink(nextPage: number): string {
  if (nextPage <= 1) {
    return `/categorias/${category.slug}`
  }
  return `/categorias/${category.slug}?page=${nextPage}`
}
</script>

<template>
  <article class="section">
    <p class="breadcrumb">
      <NuxtLink to="/">Inicio</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ category.name }}</span>
    </p>
    <div class="section-heading">
      <h1>{{ category.name }}</h1>
      <p>{{ category.description }}</p>
    </div>
    <p v-if="listing.totalItems > 0" class="result-count">
      Mostrando {{ listing.rangeStart }}–{{ listing.rangeEnd }} de {{ listing.totalItems }} artículos
    </p>
    <p v-if="listing.items.length === 0" class="empty-state">
      Esta página no tiene artículos.
      <NuxtLink :to="`/categorias/${category.slug}`">Volver a la primera</NuxtLink>
    </p>
    <div v-else class="product-grid">
      <ProductCard v-for="product in listing.items" :key="product.id" :product="product" />
    </div>
    <CatalogPagination
      :current-page="listing.page"
      :total-pages="listing.totalPages"
      :build-page-link="buildPageLink"
    />
  </article>
</template>
