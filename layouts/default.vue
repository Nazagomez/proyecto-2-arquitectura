<template>
  <div class="site-shell">
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <SiteHeader />
    <main id="contenido">
      <slot />
    </main>
    <SiteFooter />
    <div
      id="snipcart"
      hidden
      :data-api-key="config.public.snipcartApiKey"
      data-currency="usd"
      data-config-language="es"
    />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>
