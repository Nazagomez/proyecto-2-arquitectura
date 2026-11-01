<script setup lang="ts">
import type { NuxtError } from '#app'

interface ErrorPageProps {
  readonly error: NuxtError
}

defineProps<ErrorPageProps>()

/**
 * Leaves the error screen and returns to the catalog home.
 */
function goHome(): void {
  clearError({ redirect: '/' })
}
</script>

<template>
  <main class="error-page">
    <p class="brand-mark">Aural</p>
    <p class="eyebrow">{{ error.statusCode ?? 500 }}</p>
    <h1>No encontramos esta página</h1>
    <p>Ese artículo o esa categoría no está en el catálogo.</p>
    <button type="button" class="buy-button" @click="goHome">Volver al inicio</button>
  </main>
</template>
