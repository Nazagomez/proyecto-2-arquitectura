<script setup lang="ts">
import type { Category } from '~/types/category'

interface CategoryCardProps {
  readonly category: Category
  readonly index: number
  readonly productCount: number
}

defineProps<CategoryCardProps>()
</script>

<template>
  <NuxtLink class="category-card" :to="`/categorias/${category.slug}`">
    <span class="category-index">{{ String(index + 1).padStart(2, '0') }}</span>
    <span>
      <span class="category-name">{{ category.name }}</span>
      <span class="category-summary">{{ category.summary }}</span>
    </span>
    <span class="category-count">{{ productCount }} artículos</span>
  </NuxtLink>
</template>
