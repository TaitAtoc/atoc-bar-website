# Executive Summary

ATOC schema is not ready to publish. The code currently has a draft schema helper, but there is no evidence that JSON-LD is injected into the app. This is the correct state until address, hours, contact, map, social links, and business identity are confirmed.

# Current Schema State

File:

`src/seo/schema.js`

Current status:

```js
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
```

The helper exports `createDraftRouteSchema(path, origin)`, which returns a `WebPage` schema object. It does not currently create a complete `LocalBusiness`, `BarOrPub`, `Restaurant`, or `FoodEstablishment` schema.

# Is Schema Currently Injected?

No injection was found.

Search targets checked:

- `src`
- `atoc-bar-theme`

No usage found for:

- `createDraftRouteSchema`
- `schemaStatus`
- `application/ld+json`
- `json-ld`
- `ld+json`

The app currently updates ordinary meta tags and canonical URLs in `src/App.jsx`, but does not inject JSON-LD.

# Appropriate Future Schema

Likely future schema types:

- `BarOrPub`
- `LocalBusiness`
- `WebSite`
- `WebPage`
- possibly `FoodEstablishment` only if food/kitchen offering is confirmed

Use `BarOrPub` as the primary local business type if owner approves the venue positioning as a bar/pub.

# Required Before Injection

Do not inject schema until these are confirmed:

- Official business/display name.
- Exact street address.
- City, region/province, country.
- Phone or approved contact method.
- Opening hours.
- Map URL and verified map pin.
- Website URL.
- Approved logo URL.
- Approved primary image.
- Social profiles.
- Price range, only if owner approves.
- Accepted payment methods, only if accurate.
- SameAs links, only if official.

# Must Remain Blocked

Keep schema blocked while any of these remain true:

- `schemaStatus.publishReady === false`
- `[Confirm address]` exists anywhere in source or bundle.
- `[Confirm opening hours]` exists.
- `[Confirm phone / WeChat]` exists.
- `[Confirm map link]` exists.
- Address district is uncertain.
- Media rights are unapproved.
- Public-crawl images are treated as complete.

# Recommendation

Keep `schema.js` draft-only for now. Later, generate schema from the same `businessFacts` object used by visible contact sections so address/hours/contact details cannot drift between UI and JSON-LD.
