import { canonicalFor, getPageMeta } from './pageMeta.js'
import { images } from '../data/siteData.js'

export const schemaStatus = {
  publishReady: false,
  reason: 'Address, opening hours, phone or WeChat, map link, and current social links are not confirmed.',
  requiredConfirmations: [
    '[Confirm address]',
    '[Confirm opening hours]',
    '[Confirm phone / WeChat]',
    '[Confirm map link]',
  ],
}

export function createDraftRouteSchema(path, origin) {
  const meta = getPageMeta(path)
  const canonical = canonicalFor(path, origin)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ATOC Bar',
    url: canonical,
    image: `${origin.replace(/\/$/, '')}${images.hero}`,
    description: meta.description,
    areaServed: {
      '@type': 'City',
      name: 'Guangzhou',
    },
    knowsAbout: meta.keywords,
  }
}
