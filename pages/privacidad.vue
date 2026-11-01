<script setup lang="ts">
useHead({
  title: 'Privacidad',
  meta: [{ name: 'description', content: 'Qué datos pide Aural para comprar y comentar.' }],
})
</script>

<template>
  <article class="section prose">
    <h1>Privacidad y pago</h1>
    <p>Podés armar el carrito sin cuenta y sin decirnos tu nombre. Los datos de envío y de pago se piden solo al cerrar la compra.</p>
    <h2>Tarjeta</h2>
    <ul>
      <li>El pago lo procesa Snipcart en una página cifrada. El navegador muestra el candado en ese paso.</li>
      <li>Aural no guarda el número de tarjeta ni el código de seguridad.</li>
      <li>El formulario de pago pide solo lo necesario para cobrar y enviar.</li>
    </ul>
    <h2>Comentarios</h2>
    <p>
      Los comentarios de cada artículo usan utterances. Se publican como un issue en un repositorio de GitHub,
      así que son públicos y quedan asociados a tu usuario de GitHub. No los uses para datos de un pedido.
    </p>
    <p>Para un pedido, usá el número de orden del correo de confirmación.</p>
  </article>
</template>
