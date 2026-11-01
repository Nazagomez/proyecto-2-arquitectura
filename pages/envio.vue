<script setup lang="ts">
import { FREE_SHIPPING_FROM_USD, REGIONAL_SHIPPING_USD, STANDARD_SHIPPING_USD } from '~/constants/catalog'

useHead({
  title: 'Envío',
  meta: [{ name: 'description', content: 'Costos y plazos de envío de Aural dentro de Costa Rica.' }],
})
</script>

<template>
  <article class="section prose">
    <h1>Envío</h1>
    <p>Los costos se informan antes del pago. No aparecen por primera vez en la última pantalla.</p>
    <table class="spec-table">
      <thead>
        <tr>
          <th scope="col">Destino</th>
          <th scope="col">Costo</th>
          <th scope="col">Plazo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Gran Área Metropolitana</th>
          <td>{{ formatPrice(STANDARD_SHIPPING_USD) }}</td>
          <td>2 a 4 días hábiles</td>
        </tr>
        <tr>
          <th scope="row">Resto de Costa Rica</th>
          <td>{{ formatPrice(REGIONAL_SHIPPING_USD) }}</td>
          <td>4 a 7 días hábiles</td>
        </tr>
        <tr>
          <th scope="row">Compras desde {{ formatPrice(FREE_SHIPPING_FROM_USD) }}</th>
          <td>Gratis en envío estándar</td>
          <td>2 a 4 días hábiles</td>
        </tr>
      </tbody>
    </table>
    <p>El plazo empieza cuando el pedido sale, no cuando se paga. Un artículo agotado no entra a un pedido: la ficha lo marca y desactiva la compra.</p>
    <p>Revisá la dirección en el resumen. El carrito deja cambiarla antes de confirmar.</p>
  </article>
</template>
