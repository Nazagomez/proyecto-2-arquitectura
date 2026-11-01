import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { CATALOG_PAGE_SIZE } from './constants/catalog'

interface ProductRouteSource {
  readonly slug: string
  readonly categorySlug: string
}

interface CategoryRouteSource {
  readonly slug: string
}

const routeProducts = JSON.parse(
  readFileSync(fileURLToPath(new URL('./data/products.json', import.meta.url)), 'utf8'),
) as ProductRouteSource[]
const routeCategories = JSON.parse(
  readFileSync(fileURLToPath(new URL('./data/categories.json', import.meta.url)), 'utf8'),
) as CategoryRouteSource[]

/**
 * Builds the static paths Nuxt should prerender from the JSON catalog.
 * @returns Absolute routes, including category pages after the first.
 */
function buildPrerenderRoutes(): string[] {
  const staticRoutes: string[] = ['/', '/envio', '/devoluciones', '/privacidad', '/como-comprar', '/buscar']
  const productRoutes: string[] = routeProducts.map((product) => `/productos/${product.slug}`)
  const categoryRoutes: string[] = routeCategories.flatMap((category) => {
    const count: number = routeProducts.filter((product) => product.categorySlug === category.slug).length
    const totalPages: number = Math.max(1, Math.ceil(count / CATALOG_PAGE_SIZE))
    return Array.from({ length: totalPages }, (_, index) => {
      const page: number = index + 1
      if (page === 1) {
        return `/categorias/${category.slug}`
      }
      return `/categorias/${category.slug}?page=${page}`
    })
  })
  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Tienda de equipos de audio',
      titleTemplate: '%s · Aural',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Aural vende audífonos, parlantes, amplificadores, tornamesas, interfaces y micrófonos en Costa Rica.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,520;9..144,640&family=Outfit:wght@400;500;600&display=swap',
        },
        { rel: 'preconnect', href: 'https://app.snipcart.com' },
        { rel: 'preconnect', href: 'https://cdn.snipcart.com' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      snipcartApiKey: '',
      utterancesRepo: '',
      siteUrl: 'http://localhost:3000',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: buildPrerenderRoutes(),
    },
  },
})
