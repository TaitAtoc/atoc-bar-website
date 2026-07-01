const b = import.meta.env.BASE_URL

export const logo = `${b}assets/brand/atoc-logo-master.png`

export const images = {
  hero: `${b}assets/legacy/front-entrance.jpg`,
  outdoor: `${b}assets/legacy/outdoor-seating-legacy.jpg`,
  bar: `${b}assets/legacy/bar-interior-legacy.jpg`,
  sports: `${b}assets/legacy/sports-channels-legacy.jpg`,
  guinness: `${b}assets/legacy/guinness-promo-legacy.jpg`,
  ladies: `${b}assets/legacy/ladies-night-promo-legacy.jpg`,
  caesar: `${b}assets/legacy/bloody-caesar-promo-legacy.jpg`,
  tequila: `${b}assets/legacy/tequila-shots-promo-legacy.jpg`,
  coffee: `${b}assets/legacy/coffee-menu-legacy.jpg`,
  shisha: `${b}assets/legacy/shisha-menu-legacy.jpg`,
  barSheet: `${b}assets/references/bar-counter-contact-sheet.jpg`,
  mainRoomSheet: `${b}assets/references/main-room-contact-sheet.jpg`,
  terraceSheet: `${b}assets/references/outdoor-terrace-contact-sheet.jpg`,
  entranceSheet: `${b}assets/references/entrance-contact-sheet.jpg`,
  promotionsHero: `${b}assets/photos/hero/promotions-hero-bartender.png`,
  contactMap: `${b}assets/photos/Maps/${encodeURIComponent('ATOC MAP.png')}`,
}

const fd = `${b}assets/photos/food-drink/`

export const beers = [
  {
    title: 'Carlsberg',
    text: 'Carlsberg is a crisp Danish lager with a smooth finish and refreshing easy-drinking beer taste.',
    image: `${fd}Carlsberg-Beer.png`,
    alt: 'Bottle of Carlsberg Danish lager',
  },
  {
    title: 'Asahi',
    text: 'Asahi is a clean Japanese lager with a crisp dry finish and refreshing easy-drinking beer taste.',
    image: `${fd}Asahi.png`,
    alt: 'Bottle of Asahi Japanese lager',
  },
  {
    title: 'Brooklyn',
    text: 'Brooklyn is a smooth American craft beer with a balanced malt flavour and refreshing hoppy finish.',
    image: `${fd}Brooklyn.png`,
    alt: 'Bottle of Brooklyn American craft beer',
  },
  {
    title: 'Guinness',
    text: 'Guinness is a rich Irish stout with smooth roasted malt flavour and a creamy, distinctive finish.',
    image: `${fd}Guinness.png`,
    alt: 'Bottle of Guinness Irish stout',
  },
  {
    title: 'Hoegaarden',
    text: 'Hoegaarden is a refreshing Belgian wheat beer with smooth citrus notes and a light, cloudy finish.',
    image: `${fd}Hoegarrden.png`,
    alt: 'Bottle of Hoegaarden Belgian wheat beer',
  },
  {
    title: 'Jing-A',
    text: 'Jing-A is a bold Beijing craft beer with fresh hoppy flavour and a smooth, modern finish.',
    image: `${fd}${encodeURIComponent('Jing A.png')}`,
    alt: 'Bottle of Jing-A Beijing craft beer',
  },
  {
    title: 'Liefmans',
    text: 'Liefmans is a sweet Belgian fruit beer with smooth berry flavour and a refreshing, slightly tart finish.',
    image: `${fd}liefmans.png`,
    alt: 'Bottle of Liefmans Belgian fruit beer',
  },
]

const md = `${b}assets/photos/menu/`

export const menuCategories = [
  { key: 'all', label: 'All' },
  { key: 'beer', label: 'Beer' },
  { key: 'cocktails', label: 'Cocktails' },
  { key: 'wine', label: 'Wine' },
  { key: 'spirits', label: 'Spirits' },
  { key: 'soft-drinks-coffee', label: 'Soft Drinks & Coffee' },
  { key: 'shisha', label: 'Shisha' },
]

export const menuPages = [
  {
    title: 'Beer',
    image: `${md}menu-page-01-drinks.webp`,
    alt: 'ATOC drink menu cover and draught beer price list',
    categories: ['beer'],
  },
  {
    title: 'Coffee Cocktails',
    image: `${md}menu-page-02-coffee-cocktails.webp`,
    alt: 'ATOC coffee infused cocktails promotion',
    categories: ['cocktails'],
  },
  {
    title: 'Cocktails',
    image: `${md}menu-page-03-cocktails.webp`,
    alt: 'ATOC cocktails price list',
    categories: ['cocktails'],
  },
  {
    title: 'Wines & Champagne',
    image: `${md}menu-page-04-wines.webp`,
    alt: 'ATOC cocktails continued, wine and champagne price list',
    categories: ['cocktails', 'wine'],
  },
  {
    title: 'Cognac & Whiskey',
    image: `${md}menu-page-05-whiskey-cognac.webp`,
    alt: 'ATOC cognac and whiskey price list',
    categories: ['spirits'],
  },
  {
    title: 'Bourbon & Rum',
    image: `${md}menu-page-06-bourbon-rum.webp`,
    alt: 'ATOC bourbon and rum price list',
    categories: ['spirits'],
  },
  {
    title: 'Tequila, Vodka & Gin',
    image: `${md}menu-page-07-tequila-vodka-gin.webp`,
    alt: 'ATOC tequila, vodka and gin price list',
    categories: ['spirits'],
  },
  {
    title: 'Liqueurs',
    image: `${md}menu-page-08-liquors.webp`,
    alt: 'ATOC liqueurs and other spirits price list',
    categories: ['spirits'],
  },
  {
    title: 'Soft Drinks & Coffee',
    image: `${md}menu-page-09-soft-drinks-coffee.webp`,
    alt: 'ATOC soft drinks, juice, tea and coffee menu',
    categories: ['soft-drinks-coffee'],
  },
  {
    title: 'Shisha & Promotions',
    image: `${md}menu-page-10-shisha-promos.webp`,
    alt: 'ATOC shisha menu and ladies night promotion',
    categories: ['shisha'],
  },
]

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Sports', path: '/sports' },
  { label: 'Menus', path: '/menus' },
  { label: 'Promotions', path: '/promotions' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Bookings', path: '/bookings' },
  { label: 'Contact', path: '/contact' },
]

export const sports = ['Rugby', 'Football', 'Formula One', 'Basketball', 'MMA']

export const facts = [
  ['Opening hours', ['5pm – 3am', 'Open 7 days a week']],
  ['Location', ['2-107 Huaxun St', 'Zhujiang Newtown, Tianhe', 'Guangzhou, P.R.C.']],
  ['Bar focus', ['Live sports, drinks, group nights, indoor/outdoor seating']],
]

export const eventCards = [
  { title: 'This Week At ATOC', tag: 'Schedule pending', text: 'Weekly schedule and event details are being confirmed. Check back soon or enquire via the contact page.' },
  { title: 'Live Sports Nights', tag: 'Watch-party format', text: 'Rugby, football, F1, basketball, and MMA categories can anchor weekly sports nights once fixtures are confirmed.' },
  { title: 'Group Match Tables', tag: 'Private groups', text: 'Built for teams, dragon boat crews, birthdays, and casual watch groups. Capacity and booking rules are pending confirmation.' },
]

export const venueMoments = [
  {
    kicker: 'Bar counter',
    title: 'Close, social, and built around the room',
    alt: 'ATOC bar counter and warm venue interior',
    image: `${b}assets/photos/venue/ATOC BAR ASSETS.png`,
  },
  {
    kicker: 'Live sport',
    title: 'Screens, fixtures, and group watch energy',
    alt: 'ATOC sports screens for live match nights',
    image: images.sports,
  },
  {
    kicker: 'Outside air',
    title: 'Terrace feel without pretending to be luxury',
    alt: 'ATOC outdoor seating and terrace area',
    image: `${b}assets/photos/venue/ChatGPT Image Jun 26, 2026, 05_03_34 PM.png`,
  },
]

export const homeStory = {
  eyebrow: 'Real bar energy',
  title: 'Bar counter, live screens, terrace — the full ATOC feel',
  text: 'A compact Guangzhou bar built for live sports, group rounds, and easy nights out. Warm lighting, social seating, and a terrace that does not take itself too seriously.',
  cta: { label: 'See the venue photos', href: '/gallery' },
}

export const menuSections = [
  { title: 'Draught beers', text: 'Western and Chinese draught beer categories are ready for current taps and prices once approved.', image: images.bar },
  { title: 'Cocktails & shooters', text: 'Cocktail, shooter, and party-round sections can be filled after the current menu is approved.', image: images.tequila },
  { title: 'Coffee & tea', text: 'Coffee and tea give daytime visitors and relaxed groups a lighter option.', image: images.coffee },
  { title: 'Shisha', text: 'Shisha availability and advertising rules need current confirmation before launch.', image: images.shisha },
  { title: 'Food ordering', text: 'Food options can be listed after ATOC confirms the current kitchen or delivery arrangement.', image: images.outdoor },
]

const promo = `${b}assets/photos/promo/`

export const promotions = [
  {
    title: 'Happy Hour',
    status: 'Daily 2:30pm–10pm — discounted beer, wine, and house spirits.',
    image: `${promo}${encodeURIComponent('Happy Hour.jpg')}`,
  },
  {
    title: 'Ladies Night',
    status: 'Every Tuesday — free frozen margaritas, plus free shisha for groups of 4 ladies.',
    image: `${promo}${encodeURIComponent('Ladies Night.jpg')}`,
  },
  {
    title: 'Ice Cream Menu',
    status: 'Soft serve sundaes from RMB18, plus boozy Kahlua Baileys ice cream.',
    image: `${promo}${encodeURIComponent('Soft Serve Menu.jpg')}`,
  },
  {
    title: 'Affogato',
    status: 'Espresso poured over soft serve ice cream, RMB25.',
    image: `${promo}${encodeURIComponent('Affogato.jpg')}`,
  },
]

const lg = `${b}assets/photos/live-gallery/`

export const galleryPhotos = [
  { src: `${lg}${encodeURIComponent('Dalrymple Family.png')}`, alt: 'The Dalrymple family at ATOC' },
  { src: `${lg}IMG_0011-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_0065-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_0153.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1315-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1344-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1352-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1648-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1657-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1658-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1677-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1680-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1682-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1686-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
  { src: `${lg}IMG_1687-scaled.jpg`, alt: 'Guests enjoying a night out at ATOC' },
]

export const contactPlaceholders = [
  ['Address', ['2-107 Huaxun St', 'Zhujiang Newtown, Tianhe', 'Guangzhou, P.R.C.']],
  ['Opening hours', ['5pm – 3am', 'Open 7 days a week']],
  ['Phone', '15705867448'],
  ['WeChat', 'taitchina'],
]

// Same ATOC recipients used by AI Mission Control for finished sports poster emails
// (config/poster-email-delivery.json in AI-Ops-Hub). Public business addresses only.
export const bookingEnquiryRecipients = ['kiwidecadence@hotmail.com', '20501117@qq.com']
