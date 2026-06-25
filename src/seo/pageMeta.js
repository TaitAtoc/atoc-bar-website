export const siteBaseUrl = 'https://www.atocbar.com'

export const pageMeta = {
  '/': {
    title: 'ATOC Bar | Guangzhou Bar, Sports & Nightlife',
    description: 'ATOC is a Guangzhou bar for live sports, drinks, international-friendly nights, group bookings, and relaxed nightlife. Address and hours are pending confirmation.',
    h1: 'ATOC Bar Guangzhou',
    keywords: ['Guangzhou bar', 'Guangzhou nightlife', 'sports bar Guangzhou', 'expat bar Guangzhou'],
  },
  '/about': {
    title: 'About ATOC | Expat & International Bar in Guangzhou',
    description: 'Learn about ATOC, an international-friendly Guangzhou bar with sports nights, casual drinks, a social crowd, and indoor-outdoor atmosphere.',
    h1: 'An International Bar in Guangzhou',
    keywords: ['expat bar Guangzhou', 'international bar Guangzhou', 'English speaking bar Guangzhou'],
  },
  '/events': {
    title: 'Events at ATOC | Live Sports Bar in Guangzhou',
    description: 'Watch rugby, football, Formula 1, basketball, MMA, and other live sports at ATOC in Guangzhou. Ask what is on this week before visiting.',
    h1: 'Live Sports in Guangzhou',
    keywords: ['sports bar Guangzhou', 'live sports bar Guangzhou', 'watch rugby Guangzhou', 'watch football Guangzhou', 'watch Formula 1 Guangzhou'],
  },
  '/menus': {
    title: 'ATOC Menus | Cocktails, Beer & Match-Night Drinks',
    description: 'Browse ATOC drinks and menu categories, including beer, cocktails, shooters, coffee, tea, and shisha, with current items and prices pending confirmation.',
    h1: 'Drinks and Menus at ATOC',
    keywords: ['cocktails Guangzhou', 'beer bar Guangzhou', 'happy hour Guangzhou', 'Guangzhou bar menu'],
  },
  '/promotions': {
    title: 'ATOC Promotions | Happy Hour & Bar Offers in Guangzhou',
    description: 'Check ATOC promotion candidates, happy hour ideas, sports-night offers, and bar specials in Guangzhou. Current terms must be confirmed.',
    h1: 'ATOC Promotions',
    keywords: ['happy hour Guangzhou', 'bar promotions Guangzhou', 'drink specials Guangzhou'],
  },
  '/gallery': {
    title: 'ATOC Gallery | Guangzhou Bar Photos & Atmosphere',
    description: 'View ATOC bar photos, terrace images, sports screen atmosphere, and venue references for a Guangzhou nightlife setting.',
    h1: 'ATOC Bar Photos',
    keywords: ['Guangzhou bar atmosphere', 'ATOC bar photos', 'nightlife venue Guangzhou', 'Guangzhou bar photos'],
  },
  '/bookings': {
    title: 'Book ATOC | Private Party Bar & Group Bookings Guangzhou',
    description: 'Book ATOC for private events, group drinks, sports watch parties, birthdays, company nights, and casual table bookings in Guangzhou.',
    h1: 'Book a Bar Table or Private Event in Guangzhou',
    keywords: ['private party bar Guangzhou', 'party venue Guangzhou', 'group bookings Guangzhou'],
  },
  '/contact': {
    title: 'Contact ATOC | Guangzhou Bar Address, Hours & Bookings',
    description: 'Contact ATOC for address, opening hours, map directions, phone, WeChat, bookings, and event enquiries. Details are pending confirmation.',
    h1: 'Find ATOC in Guangzhou',
    keywords: ['Guangzhou bar contact', 'ATOC Guangzhou address'],
  },
}

export function getPageMeta(path) {
  return pageMeta[path] || pageMeta['/']
}

export function canonicalFor(path, origin = siteBaseUrl) {
  const cleanOrigin = origin.replace(/\/$/, '')
  return `${cleanOrigin}${path === '/' ? '/' : path}`
}
