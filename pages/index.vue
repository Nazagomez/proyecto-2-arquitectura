<script setup lang="ts">
import { STUDENT_ID } from '~/constants/catalog'

useHead({
  title: 'Tienda de equipos de audio',
})

const catalog = useCatalog()
const categories = catalog.categories
const featured = catalog.listFeaturedProducts()
</script>

<template>
  <div>
    <section class="hero">
      <div>
        <p class="eyebrow">Costa Rica · {{ STUDENT_ID }}</p>
        <h1>Escuchá con el equipo correcto.</h1>
        <p class="lede">
          Audífonos, monitores, tornamesas e interfaces. El precio está en la ficha,
          el envío se ve antes de pagar y podés comprar sin crear una cuenta.
        </p>
        <a class="text-link" href="#categorias">Ver las categorías</a>
      </div>
      <img
        src="/images/hero-studio.jpg"
        alt="Estudio con consola de mezcla, monitores y guitarras"
        width="1200"
        height="800"
      >
    </section>
    <section class="trust-row" aria-label="Condiciones de compra">
      <p><strong>Sin cuenta.</strong> El carrito no pide registro.</p>
      <p><strong>Envío desde $8.</strong> Gratis desde $200.</p>
      <p><strong>30 días</strong> para devolver.</p>
    </section>
    <section id="categorias" class="section">
      <div class="section-heading">
        <h2>Categorías</h2>
        <p>Elegí un grupo y después el artículo. Cada listado está paginado.</p>
      </div>
      <div class="category-grid">
        <CategoryCard
          v-for="(category, index) in categories"
          :key="category.slug"
          :category="category"
          :index="index"
          :product-count="catalog.countInCategory(category.slug)"
        />
      </div>
    </section>
    <section class="section">
      <div class="section-heading">
        <h2>Selección</h2>
        <p>Equipos para estudio, sala y vinilo.</p>
      </div>
      <div class="product-grid">
        <ProductCard v-for="product in featured" :key="product.id" :product="product" />
      </div>
    </section>
  </div>
</template>
