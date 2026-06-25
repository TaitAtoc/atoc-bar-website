# ATOC Website Phase C SEO Patch Apply and Build Report

## A. Verdict

**PASS.** Phase C SEO changes applied manually and build succeeds cleanly.

The Codex session that produced the patch was blocked by its own sandbox write policy — not by any filesystem or ACL issue on the real project. Claude Code applied all changes directly with full write access.

---

## B. Patch Status

Original patch:
- `C:\Users\HP\Documents\Codex\2026-06-24\files-mentioned-by-the-user-you\outputs\ATOC_PHASE_C_SEO_IMPLEMENTATION.utf8.patch`

Strategy: manual implementation (project is not a git repository; `git apply` is not available).

All changes from the patch were applied file-by-file against the live source.

---

## C. Backup

```
D:\Projects\ATOC-Website-backups\phase-c-before-patch-20260625-162604\
```

Contains `index.html` and full `src/` tree as of pre-patch state.

---

## D. Files Changed

| File | Change |
|---|---|
| `index.html` | Updated title, added description/OG/Twitter meta tags |
| `src/App.jsx` | Route-aware metadata via `getPageMeta`, `upsertMeta`, `upsertCanonical` |
| `src/components/Footer.jsx` | Removed "Phase B" wording |
| `src/data/siteData.js` | Cleaned all "legacy copy" / "Phase B" wording from facts, eventCards, menuSections, gallery |
| `src/pages/Home.jsx` | Guangzhou H1/eyebrow, SEO copy, internal links |
| `src/pages/About.jsx` | International bar H1, Guangzhou copy, internal links |
| `src/pages/Events.jsx` | Live sports H1, Guangzhou copy, internal link row |
| `src/pages/Menus.jsx` | Drinks/menus H1, Guangzhou copy, internal link row |
| `src/pages/Promotions.jsx` | Promotions H1, Guangzhou copy, internal link row |
| `src/pages/Gallery.jsx` | Bar photos H1, Guangzhou copy, internal link row |
| `src/pages/Bookings.jsx` | Group booking H1, Guangzhou copy, internal links |
| `src/pages/Contact.jsx` | Find ATOC H1, Guangzhou copy, internal links |
| `src/seo/pageMeta.js` | **NEW** — per-route title, description, H1, keywords, canonical helper |
| `src/seo/schema.js` | **NEW** — draft schema status object, `createDraftRouteSchema` (not injected into DOM) |

---

## E. Build Result

```
vite v5.4.21 building for production...
✓ 44 modules transformed.
dist/index.html                   0.95 kB │ gzip:  0.51 kB
dist/assets/index-CMr6X4qd.css   9.39 kB │ gzip:  2.78 kB
dist/assets/index-BPYHYNf1.js  166.49 kB │ gzip: 52.48 kB
✓ built in 697ms
```

No errors. No warnings.

---

## F. Route Checks

Dev server started on `http://127.0.0.1:8789`.

Routes present in app router: `/`, `/about`, `/events`, `/menus`, `/promotions`, `/gallery`, `/bookings`, `/contact`.

All routes load the correct page component. Per-route metadata updates on navigation via `upsertMeta` / `upsertCanonical` in `App.jsx`.

---

## G. SEO / City / Location Safety Checks

Grep scan over `src/` and `index.html` for:
`Beijing|Peking|北京|Phase B|Local Review Site|Zhujiang|Tianhe|streetAddress|telephone|openingHours|ld+json`

**Result: zero matches.**

- No Beijing/Peking/北京 references.
- No "Phase B" or "Local Review Site" wording in public source.
- No hard Zhujiang or Tianhe district claims.
- No live LocalBusiness JSON-LD injected.
- All contact details remain `[Confirm ...]` placeholders.
- No invented address, phone, opening hours, prices, or active promotion claims.

---

## H. Schema Status

`src/seo/schema.js` exists as a draft helper only. `schemaStatus.publishReady = false`.

`createDraftRouteSchema` is defined but **not called anywhere in the render tree** — no JSON-LD is injected into any page. This is correct per the brief: do not publish LocalBusiness / BarOrPub schema until address, hours, phone/WeChat, map link, and social links are confirmed.

---

## I. Remaining Facts Needing Confirmation Before Launch

- Exact address
- District (Zhujiang New Town / Tianhe / other — do not hard-code until confirmed)
- Phone / WeChat
- Opening hours
- Map link / pin
- Current menu items and prices
- Current promotions and valid dates
- Weekly sports fixtures and booking channel
- Image rights for legacy assets
- Preferred social media links

---

## J. Safety Confirmation

- No live WordPress changes
- No WordPress login
- No deploy or publish
- No DNS changes
- No Seedance / Ark / Comfy calls
- No AI image or video generation
- No ANZSBS changes
- No secrets exposed
- No invented address, phone, opening hours, prices, promotions, or hard Zhujiang/Tianhe claims
