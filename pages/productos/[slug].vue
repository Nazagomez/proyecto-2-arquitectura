<script setup lang="ts">
import type { Category } from '~/types/category'
import type { Product } from '~/types/product'
import { RETURN_WINDOW_DAYS } from '~/constants/catalog'

const route = useRoute()
const catalog = useCatalog()
const found: Product | undefined = catalog.findProduct(String(route.params.slug))

if (!found) {
  throw createError({ statusCode: 404, message: 'Artículo no encontrado', fatal: true })
}

const product: Product = found
const category: Category | undefined = catalog.findCategory(product.categorySlug)
const related: readonly Product[] = catalog.listRelated(product)
const quantity = ref<number>(1)
const isAvailable: boolean = product.stock > 0

useHead({
  title: product.name,
  meta: [{ name: 'description', content: product.summary }],
})

/**
 * Keeps the chosen quantity inside the available stock.
 * @param event - Change event from the number input.
 */
function updateQuantity(event: Event): void {
  const target: HTMLInputElement = event.target as HTMLInputElement
  const next: number = Number(target.value)
  if (!Number.isInteger(next) || next < 1) {
    quantity.value = 1
    return
  }
  quantity.value = Math.min(next, product.stock)
}
</script>

<template>
  <article class="section product-page">
    <p class="breadcrumb">
      <NuxtLink to="/">Inicio</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink v-if="category" :to="`/categorias/${category.slug}`">{{ category.name }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ product.name }}</span>
    </p>
    <div class="product-hero">
      <img :src="product.image" :alt="product.imageAlt" width="800" height="800">
      <div class="product-buy">
        <p class="eyebrow">{{ product.brand }}</p>
        <h1>{{ product.name }}</h1>
        <p class="rating">{{ product.rating.toFixed(1) }} de 5 · {{ product.reviewCount }} reseñas</p>
        <p class="price price-large">{{ formatPrice(product.price) }}</p>
        <StockStatus :stock="product.stock" />
        <dl class="option-list">
          <div>
            <dt>Color</dt>
            <dd>{{ product.color }}</dd>
          </div>
          <div>
            <dt>Conexión</dt>
            <dd>{{ product.connectivity }}</dd>
          </div>
          <div>
            <dt>Entrega</dt>
            <dd v-if="isAvailable">{{ product.deliveryDays }} días hábiles desde que sale el pedido</dd>
            <dd v-else>Sin fecha. Abajo hay opciones parecidas que sí están disponibles.</dd>
          </div>
          <div>
            <dt>Garantía</dt>
            <dd>{{ product.warrantyMonths }} meses</dd>
          </div>
        </dl>
        <label v-if="isAvailable" class="quantity-field">
          Cantidad
          <input
            type="number"
            min="1"
            :max="product.stock"
            :value="quantity"
            @change="updateQuantity"
          >
        </label>
        <BuyButton :product="product" :quantity="quantity" />
        <p class="quiet">No hace falta crear una cuenta. El pago ocurre en un checkout cifrado y no guardamos la tarjeta.</p>
        <ShippingNote />
        <p class="quiet">
          Devolución dentro de {{ RETURN_WINDOW_DAYS }} días.
          <NuxtLink to="/devoluciones">Leé la política antes de comprar</NuxtLink>
        </p>
      </div>
    </div>
    <section class="product-copy">
      <h2>Detalle</h2>
      <p>{{ product.description }}</p>
    </section>
    <section>
      <h2>Especificaciones</h2>
      <table class="spec-table">
        <tbody>
          <tr v-for="specification in product.specifications" :key="specification.label">
            <th scope="row">{{ specification.label }}</th>
            <td>{{ specification.value }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <ProductComments />
    <section v-if="related.length > 0">
      <h2>También en {{ category?.name ?? 'esta categoría' }}</h2>
      <div class="product-grid">
        <ProductCard v-for="item in related" :key="item.id" :product="item" />
      </div>
    </section>
  </article>
</template>
