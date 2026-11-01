<script setup lang="ts">
import type { Product } from '~/types/product'

interface ProductCardProps {
  readonly product: Product
}

const props = defineProps<ProductCardProps>()
const catalog = useCatalog()
const categoryName = computed((): string => catalog.findCategory(props.product.categorySlug)?.name ?? '')
</script>

<template>
  <article class="product-card">
    <NuxtLink class="product-card-media" :to="`/productos/${product.slug}`" :aria-label="product.name">
      <img :src="product.image" :alt="product.imageAlt" width="800" height="800" loading="lazy" decoding="async">
    </NuxtLink>
    <div class="product-card-body">
      <p class="eyebrow">{{ categoryName }} · {{ product.brand }}</p>
      <p class="product-name">
        <NuxtLink :to="`/productos/${product.slug}`">{{ product.name }}</NuxtLink>
      </p>
      <p class="price">{{ formatPrice(product.price) }}</p>
      <StockStatus :stock="product.stock" />
      <BuyButton :product="product" :quantity="1" />
    </div>
  </article>
</template>
