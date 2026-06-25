# Executive Summary

ATOC is not ready for deployment because the site still intentionally contains placeholder and review-only business facts. The current safety scan is doing its job: it fails on 15 blocker patterns in the compiled WordPress theme bundle.

Readiness verdict:

- GitHub/source workflow: partially ready.
- Placeholder clearance: not ready.
- Schema injection: not ready.
- Live deployment: blocked.

No files in `D:\Projects\ATOC-Website` were edited for this audit.

# Current Repo State

Inspected project:

`D:\Projects\ATOC-Website`

Observed state on 2026-06-25:

- Branch: `main`
- Remote: `https://github.com/TaitAtoc/atoc-bar-website.git`
- Theme wrapper exists: `atoc-bar-theme/`
- Safety scan exists: `tools/Test-ATOC-SafetyScan.ps1`
- Media checker exists: `tools/Test-ATOC-MediaReferences.ps1`
- Media manifest exists but remains `draft_public_crawl_incomplete`

# Safety Scan Result

Command run in read-only audit mode:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File D:\Projects\ATOC-Website\tools\Test-ATOC-SafetyScan.ps1
```

Result:

`SCAN FAILED - 15 issue(s) found`

All current findings are in:

`atoc-bar-theme\assets\js\app.js`

That means the placeholders are coming from the React source and have already been built into the deployable theme bundle.

# Placeholder And Blocker Inventory

| Source file | Exact text | Real data needed | Appears in preview | Deploy blocker | SEO/schema/contact impact |
|---|---|---:|---:|---:|---|
| `src/data/siteData.js:36` | `weekly fixtures once the schedule is confirmed` | Current sports/events schedule | Yes, home quick facts | Indirect | Events SEO, sports claims |
| `src/data/siteData.js:38` | `pending current menu approval` | Approved current menu categories/items | Yes, home quick facts | Indirect | Menus SEO, offer accuracy |
| `src/data/siteData.js:39` | `Address, hours, and contact details are being confirmed` | Address, hours, phone/WeChat | Yes, home quick facts | Indirect | Contact/local SEO/schema |
| `src/data/siteData.js:43` | `Schedule pending` | Weekly events/sports schedule | Yes, home/events cards | Yes | Events SEO |
| `src/data/siteData.js:43` | `Weekly schedule and event details are being confirmed` | Event schedule and update process | Yes | Indirect | Events SEO |
| `src/data/siteData.js:45` | `Capacity and booking rules are pending confirmation` | Capacity, table policy, booking rules | Yes | Yes via `pending confirmation` | Bookings/private events |
| `src/data/siteData.js:78` | `current menu is approved` | Approved cocktail/shooter menu | Yes, menus | Indirect | Menus SEO |
| `src/data/siteData.js:85` | `Legacy promo` | Current promo status or removal | Yes, promotions | Yes | Promotion claims |
| `src/data/siteData.js:85` | `Confirm current offer` | Current Guinness offer terms | Yes | Yes | Promotion claims |
| `src/data/siteData.js:86` | `Needs update` | Current Ladies Night status | Yes | Yes | Promotion claims |
| `src/data/siteData.js:86` | `Confirm day, terms, and availability` | Current weekday, dates, terms | Yes | Yes | Promotion claims |
| `src/data/siteData.js:87` | `Legacy promo` | Current Bloody Caesar status | Yes | Yes | Promotion/menu claims |
| `src/data/siteData.js:87` | `Confirm current menu and price` | Current menu item and price | Yes | Yes | Menu/promotional accuracy |
| `src/data/siteData.js:88` | `Needs update` | Current Tequila Special status | Yes | Yes | Promotion claims |
| `src/data/siteData.js:88` | `Confirm whether offer is active` | Whether offer exists now | Yes | Yes | Promotion claims |
| `src/data/siteData.js:92-94` | `Review image rights before launch` | Image ownership/usage approval | Yes, gallery captions | Yes | Media rights, launch safety |
| `src/data/siteData.js:96-99` | `Internal contact sheet - replace before publish` | Approved final venue photos | Yes, gallery captions | Yes | Media quality/rights |
| `src/data/siteData.js:103` | `[Confirm address]` | Confirmed English and optional Chinese address | Yes, contact panels/footer | Yes | Contact/local SEO/schema |
| `src/data/siteData.js:104` | `[Confirm opening hours]` | Current weekly opening hours | Yes | Yes | Contact/local SEO/schema |
| `src/data/siteData.js:105` | `[Confirm phone / WeChat]` | Phone and/or WeChat contact | Yes | Yes | Contact/schema/bookings |
| `src/data/siteData.js:106` | `[Confirm map link]` | Valid map URL/pin | Yes | Yes | Contact/local SEO/schema |
| `src/pages/Bookings.jsx:36` | `[Confirm workflow]` | Booking form workflow or replacement CTA | Yes, booking inputs | Not currently blocked | Booking UX/contact |
| `src/pages/Contact.jsx:29` | `Map placeholder` | Real embedded/static map decision | Yes | Indirect | Contact/local SEO |
| `src/pages/Contact.jsx:30` | `[Confirm map link]` | Valid map link | Yes | Yes | Contact/local SEO/schema |
| `src/seo/pageMeta.js:6` | `Address and hours are pending confirmation` | Address and hours | Meta only | Yes via bundle text if built | SEO description |
| `src/seo/pageMeta.js:24` | `current items and prices pending confirmation` | Approved menu and prices | Meta only | Indirect | Menus SEO |
| `src/seo/pageMeta.js:30` | `Current terms must be confirmed` | Promo terms | Meta only | Indirect | Promotions SEO |
| `src/seo/pageMeta.js:48` | `Details are pending confirmation` | Contact facts | Meta only | Yes via `pending confirmation` if matched | Contact SEO |
| `src/seo/schema.js:6` | `Address, opening hours, phone or WeChat, map link, and current social links are not confirmed.` | Full LocalBusiness facts | Internal status | Correct blocker | Schema readiness |
| `src/seo/schema.js:8-11` | `[Confirm address]`, `[Confirm opening hours]`, `[Confirm phone / WeChat]`, `[Confirm map link]` | Same as contact facts | Internal status | Should remain blocked | Schema readiness |
| `seo/ATOC_SEO_EXECUTIVE_SUMMARY.md:30` | `Add schema only after real address/hours/contact details are approved` | Approved local facts | No | Planning note only | SEO/schema |
| `seo/atoc-seo-clusters.json:65-67` | address-confirmation warnings | Exact district/address | No | Planning note only | Local SEO |

# Safety Scan Review

The scan blocks these strings:

- `Phase B`
- `Local Review Site`
- `review site`
- `legacy copy`
- `confirm before publishing`
- `Beijing`
- `Zhujiang`
- `Tianhe`
- `placeholder address`
- `fake opening hours`
- `unconfirmed schema`
- `Elementor-only layout dependency`
- `[Confirm address]`
- `[Confirm opening hours]`
- `[Confirm phone`
- `[Confirm map`
- `[Confirm event`
- `Internal contact sheet`
- `replace before publish`
- `Review image rights`
- `Confirm current offer`
- `Confirm day, terms`
- `Confirm current menu`
- `Confirm whether offer`
- `pending confirmation`
- `Schedule pending`
- `Needs update`
- `Legacy promo`

Assessment:

- Too strict: slightly, but appropriately for pre-launch. Blocking `Zhujiang` and `Tianhe` is only safe while the district is unconfirmed; after the real address is approved, these should become allowed only if they match the confirmed location.
- Too weak: yes in a few places. It does not currently block `[Confirm workflow]`, `Map placeholder`, `current terms still to confirm`, or `current details are confirmed` variants unless they compile into another blocked phrase.
- Correct behavior: yes. The scan blocks deployable theme output, not only source files.
- Recommendation: do not weaken it. Later, replace broad review text with structured data status fields and make release checks fail on `status !== "approved"` rather than prose strings alone.

# Preview vs Deployment Strategy

Keep preview clean by showing neutral copy such as:

- `Contact ATOC for current details`
- `Ask what is on this week`
- `Menu details available on request`

Keep deployment blocked through data flags such as:

- `businessFacts.status = "draft"`
- `businessFacts.approvedForLaunch = false`
- `schema.enabled = false`
- `mediaManifest.status !== "approved"`

That lets the preview stop displaying ugly bracket placeholders while still preventing fake or unknown facts from shipping.

# Media Gate

The media checker passes for local references, but it warns:

- manifest status is `draft_public_crawl_incomplete`
- the 48-image public crawl is not a complete source of truth
- full `wp-content/uploads` or Media Library export is still required

Deployment remains blocked until media source completeness and rights are confirmed.

# Final Finding

The current system is safe because it refuses deployment. The next step is not to weaken blockers; it is to gather real ATOC business facts, store them in one source of truth, and only then replace visible placeholder text.
