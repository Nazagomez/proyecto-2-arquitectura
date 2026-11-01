<script setup lang="ts">
const route = useRoute()

const searchQuery = computed((): string => {
  const value: unknown = route.query.q
  return typeof value === 'string' ? value : ''
})
</script>

<template>
  <header class="site-header">
    <p class="utility-bar">Envío gratis desde $200 · Devoluciones en 30 días · Pago cifrado, sin crear cuenta</p>
    <div class="header-bar">
      <NuxtLink class="brand" to="/">Aural</NuxtLink>
      <nav class="main-nav" aria-label="Principal">
        <NuxtLink to="/">Inicio</NuxtLink>
        <a href="/#categorias">Categorías</a>
        <NuxtLink to="/como-comprar">Cómo comprar</NuxtLink>
      </nav>
      <form class="search-form" action="/buscar" method="get" role="search">
        <label class="sr-only" for="catalog-search">Buscar artículos</label>
        <input
          id="catalog-search"
          name="q"
          type="search"
          placeholder="Buscar marca, modelo o categoría"
          :value="searchQuery"
        >
        <button type="submit">Buscar</button>
      </form>
      <button type="button" class="cart-button snipcart-checkout">
        Carrito
        <span class="snipcart-items-count">0</span>
      </button>
    </div>
  </header>
</template>
