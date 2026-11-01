import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const products = JSON.parse(readFileSync(resolve(root, 'data/products.json'), 'utf8'))
const outputDirectory = resolve(root, 'public/images/products')
mkdirSync(outputDirectory, { recursive: true })

const palettes = [
  ['#2c211c', '#e07a4c', '#f3eadf'],
  ['#1d2623', '#8eae98', '#f3eadf'],
  ['#241c18', '#d7a15e', '#f6efe4'],
  ['#1c2430', '#d27b63', '#f4efe8'],
  ['#2a221c', '#c9b59a', '#f7f1e8'],
  ['#241820', '#d48b9a', '#f6eee8'],
  ['#1a2428', '#7f9eae', '#f3eee6'],
]

/**
 * Escapes text placed inside the SVG.
 * @param {string} value
 * @returns {string}
 */
function escapeXml(value) {
  return value.replace(/[&<>"]/g, (character) => {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }
    return entities[character]
  })
}

/**
 * Draws a line icon for a catalog category.
 * @param {string} categorySlug
 * @param {number} variant
 * @returns {string}
 */
function renderGlyph(categorySlug, variant) {
  const stroke = 'fill="none" stroke="#f6f1e8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"'
  if (categorySlug === 'audifonos') {
    const scale = variant % 2 === 0 ? 1 : 0.84
    return `<g ${stroke} transform="scale(${scale})"><path d="M-140 -10c0-110 62-180 140-180s140 70 140 180"/><rect x="-176" y="-16" width="74" height="146" rx="37"/><rect x="102" y="-16" width="74" height="146" rx="37"/></g>`
  }
  if (categorySlug === 'parlantes' && variant % 3 === 1) {
    return `<g ${stroke}><rect x="-150" y="-130" width="120" height="250" rx="8"/><rect x="30" y="-130" width="120" height="250" rx="8"/><circle cx="-90" cy="10" r="34"/><circle cx="90" cy="10" r="34"/></g>`
  }
  if (categorySlug === 'parlantes' && variant % 3 === 2) {
    return `<g ${stroke}><rect x="-170" y="-64" width="340" height="128" rx="64"/><circle cx="-78" cy="0" r="34"/><circle cx="96" cy="0" r="18"/></g>`
  }
  if (categorySlug === 'parlantes') {
    return `<g ${stroke}><rect x="-90" y="-150" width="180" height="290" rx="10"/><circle cx="0" cy="28" r="64"/><circle cx="0" cy="-72" r="20"/></g>`
  }
  if (categorySlug === 'amplificadores') {
    return `<g ${stroke}><rect x="-190" y="-78" width="380" height="168" rx="12"/><circle cx="-108" cy="8" r="30"/><circle cx="-24" cy="8" r="30"/><circle cx="64" cy="8" r="14"/><circle cx="112" cy="8" r="14"/></g>`
  }
  if (categorySlug === 'tornamesas') {
    return `<g ${stroke}><rect x="-168" y="-136" width="336" height="262" rx="14"/><circle cx="-8" cy="-8" r="88"/><circle cx="-8" cy="-8" r="7" fill="#f6f1e8" stroke="none"/><path d="M78 -108l62 18"/></g>`
  }
  if (categorySlug === 'interfaces') {
    return `<g ${stroke}><rect x="-180" y="-72" width="360" height="150" rx="18"/><circle cx="-88" cy="4" r="26"/><circle cx="-12" cy="4" r="26"/><path d="M64 -8h92"/><path d="M64 22h68"/></g>`
  }
  if (categorySlug === 'microfonos') {
    return `<g ${stroke}><rect x="-40" y="-158" width="80" height="176" rx="40"/><path d="M0 18v92"/><path d="M-68 110h136"/></g>`
  }
  return `<g ${stroke}><path d="M-150 36c36-88 74-88 110 0s74 88 110 0 48-64 78-28"/><circle cx="-158" cy="44" r="14"/><circle cx="164" cy="-6" r="14"/></g>`
}

products.forEach((product, index) => {
  const palette = palettes[index % palettes.length]
  const numberLabel = String(index + 1).padStart(2, '0')
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img">
  <title>${escapeXml(product.name)}</title>
  <rect width="800" height="800" fill="${palette[0]}"/>
  <circle cx="590" cy="160" r="190" fill="${palette[1]}" opacity="0.2"/>
  <circle cx="150" cy="640" r="130" fill="${palette[1]}" opacity="0.12"/>
  <rect x="46" y="46" width="708" height="708" fill="none" stroke="${palette[2]}" stroke-opacity="0.28"/>
  <g transform="translate(400 355)">${renderGlyph(product.categorySlug, index)}</g>
  <text x="72" y="700" fill="${palette[2]}" font-family="Georgia, serif" font-size="28">${escapeXml(product.brand)}</text>
  <text x="728" y="700" fill="${palette[1]}" font-family="Georgia, serif" font-size="22" text-anchor="end">${numberLabel}</text>
</svg>
`
  writeFileSync(resolve(outputDirectory, `${product.slug}.svg`), svg)
})
