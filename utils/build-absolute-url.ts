/**
 * Joins the public site origin with a path that starts with a slash.
 * @param siteUrl - Origin without a trailing path.
 * @param path - Absolute path on this site.
 * @returns An absolute URL for Snipcart validation.
 */
export function buildAbsoluteUrl(siteUrl: string, path: string): string {
  const origin: string = siteUrl.replace(/\/$/u, '')
  return `${origin}${path}`
}
