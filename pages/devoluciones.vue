<script setup lang="ts">
import { RETURN_WINDOW_DAYS } from '~/constants/catalog'

useHead({
  title: 'Devoluciones',
  meta: [{ name: 'description', content: 'Cómo devolver un artículo comprado en Aural.' }],
})
</script>

<template>
  <article class="section prose">
    <h1>Devoluciones</h1>
    <p>
      Tenés {{ RETURN_WINDOW_DAYS }} días desde que recibís el paquete.
      Esta política está enlazada en cada ficha, no solo después de pagar.
    </p>
    <h2>Cómo pedirla</h2>
    <ol class="steps">
      <li>Abrí el correo de confirmación y copiá el número de orden.</li>
      <li>Respondé ese correo dentro del plazo. Indicá el artículo, si preferís cambio o reembolso, y el motivo.</li>
      <li>Te devolvemos las instrucciones o una etiqueta. Si la perdés, se puede enviar otra.</li>
      <li>Cuando el equipo llega y está completo, el reembolso sale al mismo medio de pago.</li>
    </ol>
    <h2>Quién paga el envío de vuelta</h2>
    <p>Si el artículo llegó dañado, incompleto o no es el que pediste, el envío de vuelta lo cubre Aural.</p>
    <p>Si cambiaste de opinión, el envío de vuelta corre por tu cuenta. El equipo tiene que volver sin daños de uso y con sus accesorios.</p>
    <p>Los audífonos y micrófonos se prueban en casa con calma: por eso el plazo es de un mes y no de una tarde.</p>
  </article>
</template>
