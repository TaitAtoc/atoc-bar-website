# ATOC Website Phase B Rebuild Report

Date: 2026-06-24
Project: D:\Projects\ATOC-Website
Status: Working local review build

## A. Verdict

Working. Phase B rebuilds the rejected flat one-page mockup into a local, multi-page, route-based ATOC bar website with stronger visual energy, page-specific content, sticky navigation, parallax-style heroes, scroll reveal sections, interactive gallery filtering, and safer placeholder handling.

## B. Build Discipline Evidence

Specialist roles were launched before and during implementation:

- Planner / Website Strategist
- Reference Site Auditor
- UX / Page Structure Designer
- Parallax / Interaction Designer
- Frontend Implementer
- Asset / Performance Reviewer
- Tester / Verifier
- Safety Reviewer

Pre-edit verification covered package setup, current source structure, CSS, copied local assets, legacy audit, asset manifest, local-only safety boundaries, and the public reference site direction.

## C. Why Phase A Was Rejected

Phase A looked like a flat one-page audit draft. It used anchor sections rather than real page routes, had weak page-level intent, and did not feel like an interactive sports/nightlife bar website.

Phase B replaces that with separate visitor tasks: decide on the vibe, check events and sports, inspect menus, review promotions, browse atmosphere, book a group, and find contact details.

## D. Reference Direction Used

The Century Bar site was used only as a reference for venue energy: photo-led first impression, simple navigation, promotions, gallery, and contact flow. No branding, copy, layout, images, promotions, or exact styling were copied.

## E. Pages / Routes Created

Routes now implemented:

- `/` - Home
- `/about` - About ATOC
- `/events` - Events & Sports
- `/menus` - Drinks & Menus
- `/promotions` - Promotions
- `/gallery` - Gallery & Atmosphere
- `/bookings` - Private Events / Bookings
- `/contact` - Find Us / Contact

The app uses a small internal pathname router rather than hash anchors or an added routing dependency.

## F. Parallax / Interaction Features Added

Added:

- Sticky navigation with active page state.
- Mobile menu toggle.
- Desktop parallax-style hero background movement.
- Hero entrance animation.
- Scroll reveal sections using `IntersectionObserver`.
- Hover motion on cards, buttons, promotions, and gallery panels.
- Gallery filter buttons.
- Placeholder booking form shell.
- Reduced-motion handling with animation and parallax disabled for users who prefer reduced motion.

## G. Assets Used

Local-only assets used from `public/assets`:

- ATOC logo: `public/assets/brand/atoc-logo-master.png`
- Legacy entrance hero image
- Legacy outdoor seating image
- Legacy bar interior image
- Legacy sports channels image
- Legacy promotion images
- Legacy coffee and shisha menu images
- Local ATOC contact-sheet reference images, marked as internal review / replace before publishing

No runtime hotlinks to the legacy WordPress site were added.

## H. Placeholder Facts Still Needing Confirmation

Still needs owner confirmation before publication:

- Current city / area positioning
- Full address
- Opening hours
- Phone / WeChat / booking channel
- Map link
- Social links
- Current promotions and terms
- Current menu items and prices
- Shisha availability and advertising rules
- Food ordering arrangement
- Sports schedule and event workflow
- Capacity, minimum spend, deposits, and private booking rules
- Image rights and people/likeness consent

## I. Build / Test Results

Build:

- `npm run build` passed.
- Vite transformed 43 modules.
- Output produced `dist/index.html`, CSS bundle, and JS bundle.

Route checks:

- `/`, `/about`, `/events`, `/menus`, `/promotions`, `/gallery`, `/bookings`, and `/contact` all returned HTTP 200 from the local Vite server.
- Browser verification confirmed visible content on all routes.
- Browser verification found page-specific `h1` content, 8 navigation links, hero CTAs, sections, and loaded local images.

Mobile:

- Mobile viewport check at 390x844 passed.
- No horizontal overflow detected.
- Mobile nav toggle visible.

Screenshots:

- `D:\Projects\ATOC-Website\atoc-phase-b-mobile.png`
- `D:\Projects\ATOC-Website\atoc-phase-b-gallery.png`

Notes:

- Browser log tooling retained old Phase A blank-screen errors by timestamp, but current DOM verification shows Phase B routes render successfully.

## J. Local Preview URL

Local preview:

```text
http://127.0.0.1:8789/
```

Commands:

```powershell
npm run dev -- --host 127.0.0.1 --port 8789
npm run build
```

## K. Safety Confirmation

Confirmed:

- No live WordPress changes.
- No WordPress login.
- No publishing.
- No deployment.
- No DNS or hosting changes.
- No Seedance call.
- No Ark call.
- No Comfy call.
- No AI image or video generation.
- No ANZSBS changes.
- No AI-Video changes.
- No secrets exposed.
- No external API calls added.
- No runtime hotlinks to WordPress assets added.

## L. Next Recommended Phase

Recommended Phase C:

- Confirm current address, hours, contact channel, and map link.
- Replace contact sheets with approved final individual venue photos.
- Optimize the logo into smaller nav/hero variants.
- Confirm live promotions and menus.
- Confirm event workflow and booking process.
- Add real contact submission only after the owner approves the destination and privacy handling.
- Run full visual QA across desktop, tablet, and mobile before any deployment discussion.

