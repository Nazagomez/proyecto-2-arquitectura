interface SnipcartSettings {
  publicApiKey: string
  currency: string
}

declare global {
  interface Window {
    SnipcartSettings?: SnipcartSettings
  }
}

/**
 * Loads the current Snipcart cart with the public test key.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const apiKey: string = config.public.snipcartApiKey.trim()
  if (apiKey.length === 0) {
    return
  }
  window.SnipcartSettings = {
    publicApiKey: apiKey,
    currency: 'usd',
  }
  const script: HTMLScriptElement = document.createElement('script')
  script.src = '/snipcart-loader.js'
  script.async = false
  document.body.appendChild(script)
})
