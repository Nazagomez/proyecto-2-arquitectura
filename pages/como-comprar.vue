<script setup lang="ts">
useHead({
  title: 'Cómo comprar',
  meta: [{ name: 'description', content: 'Los cuatro pasos para comprar en Aural, sin crear una cuenta.' }],
})
</script>

<template>
  <article class="section prose">
    <h1>Cómo comprar</h1>
    <p>El pedido tiene cuatro pasos. En todos se ve el carrito y no hay que registrarse.</p>
    <ol class="steps">
      <li>
        <h2>Elegí los artículos</h2>
        <p>Agregalos desde la ficha o desde la categoría. Podés cambiar la cantidad antes de sumarlos y también dentro del carrito.</p>
      </li>
      <li>
        <h2>Revisá el envío</h2>
        <p>El costo y el plazo están en cada ficha y en la página de envío, antes del pago. El carrito debe cobrar esas mismas tarifas.</p>
      </li>
      <li>
        <h2>Pagá con el resumen a la vista</h2>
        <p>Snipcart muestra los artículos, el envío y el total. El pago va cifrado. Aural no guarda el número de tarjeta ni el código de seguridad.</p>
      </li>
      <li>
        <h2>Confirmá el pedido</h2>
        <p>Al terminar ves el número de orden y te llega un correo con el mismo resumen. Guardalo: sirve para preguntar por el envío o para una devolución.</p>
      </li>
    </ol>
    <p><NuxtLink to="/#categorias">Volver a las categorías</NuxtLink></p>
  </article>
</template>
