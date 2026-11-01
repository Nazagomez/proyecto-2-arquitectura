<script setup lang="ts">
interface StockStatusProps {
  readonly stock: number
}

const props = defineProps<StockStatusProps>()

const label = computed((): string => {
  if (props.stock <= 0) {
    return 'Agotado'
  }
  if (props.stock <= 3) {
    return `Quedan ${props.stock}`
  }
  return 'En stock'
})

const tone = computed((): string => {
  if (props.stock <= 0) {
    return 'sold'
  }
  if (props.stock <= 3) {
    return 'low'
  }
  return 'ready'
})
</script>

<template>
  <p class="stock" :data-tone="tone">{{ label }}</p>
</template>
