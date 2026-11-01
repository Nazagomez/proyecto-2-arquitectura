<script setup lang="ts">
import { FREE_SHIPPING_FROM_USD, REGIONAL_SHIPPING_USD, STANDARD_SHIPPING_USD } from '~/constants/catalog'
</script>

<template>
  <p class="shipping-note">
    Envío estándar {{ formatPrice(STANDARD_SHIPPING_USD) }} en el GAM, de 2 a 4 días hábiles.
    Al resto del país, {{ formatPrice(REGIONAL_SHIPPING_USD) }}, de 4 a 7 días.
    Gratis en compras desde {{ formatPrice(FREE_SHIPPING_FROM_USD) }}.
    <NuxtLink to="/envio">Ver envío</NuxtLink>
  </p>
</template>
