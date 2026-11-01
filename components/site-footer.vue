<script setup lang="ts">
import { STORE_NAME, STUDENT_ID } from '~/constants/catalog'

const config = useRuntimeConfig()
const needsSnipcartKey: boolean = config.public.snipcartApiKey.trim().length === 0
</script>

<template>
  <footer class="site-footer">
    <div>
      <p class="brand">{{ STORE_NAME }}</p>
      <p>Tienda de equipos de audio. Proyecto 2 · {{ STUDENT_ID }}</p>
    </div>
    <nav aria-label="Información de compra">
      <NuxtLink to="/como-comprar">Cómo comprar</NuxtLink>
      <NuxtLink to="/envio">Envío</NuxtLink>
      <NuxtLink to="/devoluciones">Devoluciones</NuxtLink>
      <NuxtLink to="/privacidad">Privacidad</NuxtLink>
    </nav>
    <p v-if="needsSnipcartKey" class="setup-hint">
      El botón de carrito usa Snipcart. Agregá la API key pública en <code>.env</code> para abrirlo.
    </p>
    <p class="credit">Foto del estudio en el inicio: Unsplash.</p>
  </footer>
</template>
