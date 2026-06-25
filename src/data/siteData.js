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
}

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Events', path: '/events' },
  { label: 'Menus', path: '/menus' },
  { label: 'Promotions', path: '/promotions' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Bookings', path: '/bookings' },
  { label: 'Contact', path: '/contact' },
]

export const sports = ['Rugby', 'Football', 'Formula One', 'Basketball', 'MMA']

export const facts = [
  ['Sports focus', 'Live match nights, watch-party energy, and weekly fixtures once the schedule is confirmed.'],
  ['Venue feel', 'Compact bar, indoor/outdoor seating, warm lights, and social layout.'],
  ['Drinks', 'Draught beer, cocktails, shooters, coffee/tea, and shisha categories pending current menu approval.'],
  ['Contact', 'Address, hours, and contact details are being confirmed — use the contact page for enquiries.'],
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
    image: images.bar,
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
    image: images.outdoor,
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

export const promotions = [
  { title: 'Guinness', badge: 'Legacy promo', status: 'Confirm current offer', image: images.guinness },
  { title: 'Ladies Night', badge: 'Needs update', status: 'Confirm day, terms, and availability', image: images.ladies },
  { title: 'Bloody Caesar', badge: 'Legacy promo', status: 'Confirm current menu and price', image: images.caesar },
  { title: 'Tequila Special', badge: 'Needs update', status: 'Confirm whether offer is active', image: images.tequila },
]

export const gallery = [
  { title: 'Front entrance', group: 'Venue', image: images.hero, review: 'Review image rights before launch' },
  { title: 'Outdoor seating', group: 'Terrace', image: images.outdoor, review: 'Review image rights before launch' },
  { title: 'Bar interior', group: 'Interior', image: images.bar, review: 'Review image rights before launch' },
  { title: 'Sports screens', group: 'Sports', image: images.sports, review: 'Brand/channel review needed' },
  { title: 'Bar counter reference', group: 'Reference', image: images.barSheet, review: 'Internal contact sheet - replace before publish' },
  { title: 'Main room reference', group: 'Reference', image: images.mainRoomSheet, review: 'Internal contact sheet - replace before publish' },
  { title: 'Terrace reference', group: 'Reference', image: images.terraceSheet, review: 'Internal contact sheet - replace before publish' },
  { title: 'Entrance reference', group: 'Reference', image: images.entranceSheet, review: 'Internal contact sheet - replace before publish' },
]

export const contactPlaceholders = [
  ['Address', '[Confirm address]'],
  ['Opening hours', '[Confirm opening hours]'],
  ['Phone / WeChat', '[Confirm phone / WeChat]'],
  ['Map', '[Confirm map link]'],
]
