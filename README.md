# Aural

Tienda de equipos de audio para el Proyecto 2 (carné 504430491). El sitio está hecho con Nuxt 3 y el catálogo vive en JSON.

## Qué incluye

- Categorías, ficha de cada artículo y artículos relacionados.
- Búsqueda por marca, modelo, categoría y especificaciones.
- Paginación de 4 artículos en categorías y en la búsqueda.
- Botón de compra y carrito con [Snipcart](https://snipcart.com/).
- Comentarios por artículo con [utterances](https://utteranc.es/).
- Envío, devoluciones y privacidad visibles antes de pagar.

## Catálogo

- `data/categories.json`
- `data/products.json`

Las ilustraciones de `public/images/products` se regeneran con:

```bash
npm run generate:art
```

## Desarrollo

Requiere Node 22.12 o superior.

```bash
cp .env.example .env
npm install
npm run dev
```

Abrí http://localhost:3000.

```bash
npm test
```

## Snipcart

1. Creá una cuenta y copiá la API key pública de prueba.
2. Ponela en `.env`:

```bash
NUXT_PUBLIC_SNIPCART_API_KEY=tu_api_key_publica
NUXT_PUBLIC_SITE_URL=https://tu-sitio.netlify.app
```

3. En el panel de Snipcart configurá el envío para que coincida con la tienda:
   - GAM: 8 USD, 2 a 4 días hábiles.
   - Resto de Costa Rica: 14 USD, 4 a 7 días hábiles.
   - Envío estándar gratis desde 200 USD.

Snipcart valida cada artículo leyendo la página publicada. `NUXT_PUBLIC_SITE_URL` tiene que ser la URL pública **antes** de generar el sitio. En local el carrito agrega productos, pero la validación del pedido funciona cuando el sitio ya está en línea.

## Comentarios

1. Subí este proyecto a un repositorio público de GitHub.
2. Instalá la app [utterances](https://github.com/apps/utterances) en ese repositorio.
3. En `.env`:

```bash
NUXT_PUBLIC_UTTERANCES_REPO=usuario/repositorio
```

Cada ficha abre un issue distinto según su ruta.

## Publicar

El entregable es el código, no la carpeta generada. Netlify puede generarla:

- Build command: `npm run generate`
- Publish directory: `.output/public`
- Node 22
- Las tres variables `NUXT_PUBLIC_...` en el panel del sitio

`netlify.toml` ya trae el comando y la carpeta. No subas `.output`, `.nuxt` ni `node_modules`.
