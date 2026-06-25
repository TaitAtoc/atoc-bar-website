# Executive Summary

ATOC should move from scattered placeholder strings to one structured source of truth in `src/data/siteData.js`. Components, page metadata, contact panels, booking CTAs, and future schema should all read from that same data.

# Recommended Structure

Add a top-level `businessFacts` object:

```js
export const businessFacts = {
  status: 'draft',
  approvedForLaunch: false,
  identity: {
    officialName: '',
    displayName: 'ATOC Bar',
    shortName: 'ATOC',
    description: '',
    foundedYear: '',
  },
  location: {
    addressEnglish: '',
    addressChinese: '',
    district: '',
    city: 'Guangzhou',
    province: 'Guangdong',
    country: 'China',
    postalCode: '',
    directionsNote: '',
  },
  contact: {
    phone: '',
    wechatId: '',
    email: '',
    bookingMethod: '',
    enquiryMethod: '',
  },
  mapLinks: {
    google: '',
    apple: '',
    baidu: '',
    amap: '',
    dianping: '',
  },
  hours: {
    timezone: 'Asia/Shanghai',
    weekly: [],
    holidayNote: '',
    kitchen: '',
    shisha: '',
  },
  socialLinks: [],
  paymentMethods: [],
}
```

# Promotions And Events

Replace current promo placeholders with structured records:

```js
export const promotions = [
  {
    title: '',
    status: 'draft',
    approvedForLaunch: false,
    summary: '',
    terms: '',
    validFrom: '',
    validTo: '',
    image: '',
  },
]
```

Replace schedule placeholders with structured event records:

```js
export const events = [
  {
    title: '',
    status: 'draft',
    approvedForLaunch: false,
    day: '',
    time: '',
    description: '',
    bookingRecommended: false,
  },
]
```

# Contact Display Model

Replace `contactPlaceholders` with a derived helper:

```js
export function getContactFacts() {
  return [
    ['Address', businessFacts.location.addressEnglish || 'Contact ATOC for current address'],
    ['Opening hours', formatHours(businessFacts.hours) || 'Contact ATOC for current hours'],
    ['Phone / WeChat', formatContact(businessFacts.contact) || 'Contact ATOC for current booking details'],
    ['Map', bestMapLinkLabel(businessFacts.mapLinks) || 'Map link coming after pin verification'],
  ]
}
```

For deployment, do not rely on display text alone. Use `approvedForLaunch` flags as hard release gates.

# Page Metadata

Update `src/seo/pageMeta.js` so descriptions are generated from confirmed facts where needed:

- Contact description should use confirmed address/hours only after approval.
- Menus should not mention prices until approved.
- Promotions should not mention active offers until approved.
- Location/district terms should only appear after address confirmation.

# Schema Source

Update `src/seo/schema.js` later to read from:

- `businessFacts.identity`
- `businessFacts.location`
- `businessFacts.contact`
- `businessFacts.mapLinks`
- `businessFacts.hours`
- `businessFacts.socialLinks`
- approved media data

Schema should not have separate hardcoded address/hours fields.

# Safety Gate Recommendation

Keep string blockers, but add data-state blockers:

- fail if `businessFacts.approvedForLaunch !== true`
- fail if any public `promotions[].approvedForLaunch !== true` and the promo is shown as active
- fail if `schemaStatus.publishReady !== true` when schema injection is enabled
- fail if media manifest status is not `approved`

# Goal

One source of truth. No duplicated address, hours, phone, map, promo, or schema facts in page components.
