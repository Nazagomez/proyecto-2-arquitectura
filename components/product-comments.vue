<script setup lang="ts">
const config = useRuntimeConfig()
const container = ref<HTMLElement | null>(null)
const repo: string = config.public.utterancesRepo.trim()
const hasRepo: boolean = /^[\w.-]+\/[\w.-]+$/u.test(repo)

onMounted((): void => {
  mountUtterances()
})

/**
 * Injects the utterances script for the current product path.
 */
function mountUtterances(): void {
  if (!hasRepo || container.value === null) {
    return
  }
  const script: HTMLScriptElement = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', repo)
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('label', 'comentario')
  script.setAttribute('theme', 'github-light')
  container.value.appendChild(script)
}
</script>

<template>
  <section id="comentarios" class="comments" aria-labelledby="comments-title">
    <h2 id="comments-title">Comentarios</h2>
    <p v-if="!hasRepo" class="setup-hint">
      Los comentarios de cada artículo se publican con utterances. Indicá el repositorio
      <code>usuario/proyecto</code> en <code>NUXT_PUBLIC_UTTERANCES_REPO</code>.
    </p>
    <div ref="container" />
  </section>
</template>
