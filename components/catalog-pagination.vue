<script setup lang="ts">
interface CatalogPaginationProps {
  readonly currentPage: number
  readonly totalPages: number
  readonly buildPageLink: (page: number) => string
}

const props = defineProps<CatalogPaginationProps>()

const pages = computed((): number[] => {
  return Array.from({ length: props.totalPages }, (_, index) => index + 1)
})
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="Paginación">
    <NuxtLink v-if="currentPage > 1" v-slot="{ href, navigate }" custom :to="buildPageLink(currentPage - 1)">
      <a :href="href" @click="navigate">Anterior</a>
    </NuxtLink>
    <span v-else class="pagination-edge">Anterior</span>
    <NuxtLink
      v-for="page in pages"
      :key="page"
      v-slot="{ href, navigate }"
      custom
      :to="buildPageLink(page)"
    >
      <a :href="href" :aria-current="page === currentPage ? 'page' : undefined" @click="navigate">{{ page }}</a>
    </NuxtLink>
    <NuxtLink v-if="currentPage < totalPages" v-slot="{ href, navigate }" custom :to="buildPageLink(currentPage + 1)">
      <a :href="href" @click="navigate">Siguiente</a>
    </NuxtLink>
    <span v-else class="pagination-edge">Siguiente</span>
  </nav>
</template>
