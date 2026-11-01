<script setup lang="ts">
import type { Product } from '~/types/product'

interface BuyButtonProps {
  readonly product: Product
  readonly quantity: number
}

const props = defineProps<BuyButtonProps>()
const config = useRuntimeConfig()

const isAvailable = computed((): boolean => props.product.stock > 0)
const productUrl = computed((): string => buildAbsoluteUrl(config.public.siteUrl, `/productos/${props.product.slug}`))
const imageUrl = computed((): string => buildAbsoluteUrl(config.public.siteUrl, props.product.image))
const maxQuantity = computed((): number => Math.max(props.product.stock, 0))
</script>

<template>
  <button
    v-if="isAvailable"
    type="button"
    class="buy-button snipcart-add-item"
    :data-item-id="product.id"
    :data-item-name="product.name"
    :data-item-price="formatSnipcartPrice(product.price)"
    :data-item-url="productUrl"
    :data-item-description="product.summary"
    :data-item-image="imageUrl"
    :data-item-quantity="quantity"
    :data-item-max-quantity="maxQuantity"
    data-item-shippable="true"
    data-item-custom1-name="Color"
    :data-item-custom1-options="product.color"
    data-item-custom2-name="Conexión"
    :data-item-custom2-options="product.connectivity"
  >
    Agregar al carrito
  </button>
  <button v-else type="button" class="buy-button" disabled>
    Agotado
  </button>
</template>
