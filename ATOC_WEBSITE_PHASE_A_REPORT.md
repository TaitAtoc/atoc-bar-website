# ATOC Website Phase A Report

Date: 2026-06-24
Project: D:\Projects\ATOC-Website
Status: Local review build complete

## A. Verdict

Phase A is complete as a local-only review site. The Vite + React build is working, legacy public WordPress content has been audited, selected assets have been copied locally, and the site can be reviewed without touching the live WordPress site.

No publishing, hosting, DNS, WordPress login, AI generation, Seedance, Ark, Comfy, or protected project modification was performed.

## B. Build Discipline Evidence

Specialist planning was used before implementation:

- Planner / UX: defined the local review architecture and section plan.
- Legacy auditor / asset harvester: identified public WordPress content and candidate assets.
- Brand / visual / content: separated reusable facts from stale or risky copy.
- Frontend / tester / safety: scoped validation and local-only safety checks.

Pre-build checks confirmed:

- The public legacy site was reachable at https://www.atocbar.com/.
- The ATOC master logo existed in the AI-Ops-Hub brand assets.
- Local ATOC reference contact sheets existed and were copied, not modified.
- The target project folder was isolated at D:\Projects\ATOC-Website.

Validation completed:

- npm install completed.
- npm run build completed successfully.
- Local asset existence checks passed.
- package.json and docs/legacy-assets-manifest.json parse as valid JSON and have no UTF-8 BOM.
- Runtime source scan found no external API calls, WordPress API calls, Seedance, Ark, Comfy, or secret-bearing code.

Note: npm install reported 2 dependency audit findings from the package tree. No automatic fix was run because the task forbids unapproved changes beyond the local build.

## C. Legacy Site Audit Summary

The legacy WordPress site provided the starting content structure:

- Home
- About Us
- Promotions
- Menus
- Gallery
- Contact
- Guangzhou Nightlife

Reusable public facts found:

- ATOC was described as founded in 2019.
- Legacy copy identifies the founders as Tait Dalrymple and Cai Endi.
- Legacy positioning is an expatriate-friendly sports bar with indoor and outdoor seating.
- Legacy sports coverage mentions rugby, football, Formula One, basketball, and MMA.
- Legacy drink/menu categories include draught beer, cocktails, shooters, coffee/tea, and shisha.
- Legacy site links to Facebook and Instagram.

Human confirmation is still needed before publication because the legacy public copy appears location-specific and may be stale. In particular, the legacy site references Guangzhou, while newer local project context may point to a Beijing-facing direction.

Full audit file:

- docs/legacy-site-audit.md

## D. Files Created

Core site:

- package.json
- package-lock.json
- index.html
- src/main.jsx
- src/App.jsx
- src/styles.css

Public local assets:

- public/assets/brand/
- public/assets/legacy/
- public/assets/references/

Documentation:

- README.md
- docs/legacy-site-audit.md
- docs/legacy-assets-manifest.json
- ATOC_WEBSITE_PHASE_A_REPORT.md

Build output:

- dist/

## E. Assets Copied Locally

AI-Ops-Hub source assets copied into the local review site:

- public/assets/brand/atoc-logo-master.png
- public/assets/references/bar-counter-contact-sheet.jpg
- public/assets/references/main-room-contact-sheet.jpg
- public/assets/references/outdoor-terrace-contact-sheet.jpg
- public/assets/references/entrance-contact-sheet.jpg
- public/assets/references/capture-runs-overview.jpg

Legacy WordPress assets copied into the local review site:

- public/assets/legacy/front-entrance.jpg
- public/assets/legacy/outdoor-seating-legacy.jpg
- public/assets/legacy/bar-interior-legacy.jpg
- public/assets/legacy/sports-channels-legacy.jpg
- public/assets/legacy/guinness-promo-legacy.jpg
- public/assets/legacy/ladies-night-promo-legacy.jpg
- public/assets/legacy/bloody-caesar-promo-legacy.jpg
- public/assets/legacy/tequila-shots-promo-legacy.jpg
- public/assets/legacy/coffee-menu-legacy.jpg
- public/assets/legacy/shisha-menu-legacy.jpg

The manifest records original source, local copied path, intended use, and review flags:

- docs/legacy-assets-manifest.json

## F. Sections Built

The local review site includes:

- Home
- About
- Events / Sports
- Promotions
- Drinks / Menus
- Gallery / Atmosphere
- Location / Contact
- Private Events / Bookings

The first viewport is an actual usable ATOC page, not a marketing placeholder. It uses the real ATOC logo and a locally copied legacy venue image.

## G. Placeholders Needing Confirmation

These should be confirmed before any public launch:

- Current city and venue address.
- Phone, email, WeChat, WhatsApp, or booking channel.
- Opening hours.
- Current promotions and prices.
- Current drinks/menu details.
- Current food partner or kitchen status.
- Whether shisha is still offered and allowed to advertise.
- Whether legacy founder/location copy should remain.
- Social media links and preferred outbound links.
- Map embed or map link.
- Private event capacity.
- Image rights and consent for any people-visible photos.

## H. Local Preview Instructions

From D:\Projects\ATOC-Website:

```powershell
npm install
npm run dev
```

Configured local URL:

```text
http://127.0.0.1:8789/
```

Production build command:

```powershell
npm run build
```

## I. Build And Test Results

npm install:

- Completed successfully.
- Reported 2 audit findings.
- No audit fix was run.

Initial build:

- Failed once because package.json contained a UTF-8 BOM.
- package.json and the JSON manifest were rewritten without BOM.

Final build:

- Passed.
- Vite transformed 26 modules.
- dist/index.html was produced.
- CSS and JavaScript bundles were produced under dist/assets/.

Asset checks:

- All referenced local brand, reference, and legacy images exist.
- No hotlinked runtime images are used.

Safety scan:

- No runtime fetch, axios, XMLHttpRequest, WordPress API call, Seedance, Ark, Comfy, or secret-bearing implementation was found.
- Documentation intentionally contains source URLs and safety notes.

## J. Safety Confirmation

Confirmed:

- No WordPress login.
- No WordPress modification.
- No publishing or deployment.
- No DNS or hosting change.
- No Seedance call.
- No Ark call.
- No Comfy call.
- No AI image or video generation.
- No secrets added.
- No protected project writes.
- No modification to AI-Ops-Hub source brand assets.
- No modification to ANZSBS, AI-Video, W.2B/W.2C image/reference/capture-run outputs.

## K. Recommended Next Phase

Recommended Phase B:

- Confirm current ATOC location, contact details, hours, and city direction.
- Confirm which legacy promotions are still active and legally safe to show.
- Replace placeholder copy with approved current copy.
- Decide whether bilingual English / Chinese content is required.
- Add final SEO metadata and social preview imagery.
- Add a map link or embed after the current address is confirmed.
- Add a booking/contact workflow only after the preferred channel is confirmed.
- Run mobile visual QA and browser QA before any deployment discussion.

## L. Correction: Blank Screen Found During Human Review And Fixed

Human review found that the local preview at http://127.0.0.1:8789/ loaded the page title but showed a black blank page.

Root cause:

- React was crashing at runtime with `ReferenceError: React is not defined` in `src/App.jsx`.
- The Vite production build passed, but the browser runtime failed before painting the app.
- Because the root stayed empty, the page showed only the dark body background.

Files changed:

- `src/App.jsx`: added the required React import.
- `src/main.jsx`: added a defensive root mount check so a missing `#root` fails loudly.
- `src/styles.css`: added anchor scroll offset so fixed navigation does not cover section headings after clicking nav links.
- `index.html`, `src/main.jsx`, `src/App.jsx`, `src/styles.css`, `README.md`, and this report were normalized to UTF-8 without BOM after the served HTML showed a BOM marker.

Validation evidence:

- `npm run build` passes after the fix.
- Local preview URL responds at `http://127.0.0.1:8789/`.
- Browser DOM verification confirms visible content:
  - title: `ATOC Bar - Local Review Site`
  - `h1`: `ATOC Bar`
  - 7 navigation links
  - 4 hero CTA links
  - 9 main sections
  - 16 of 16 page images loaded
  - hero section visible
  - React root has rendered content
- Screenshot evidence saved at:
  - `D:\Projects\ATOC-Website\atoc-phase-a-blank-screen-fixed.png`

Remaining issues:

- Browser tooling retained old console entries from the pre-fix crash, but the live DOM is rendering and no new blank-screen behavior was observed after reload.
- Publication facts remain unconfirmed: address, hours, contact channel, map link, current promotions, current menu, and image rights.
- No live WordPress, deployment, DNS, hosting, Seedance, Ark, Comfy, or external generation action was performed.

## M. Phase B Rebuild - Multi-page Interactive / Parallax Direction

Human review rejected the Phase A one-page direction as too flat and draft-like. Phase B rebuilds the local review site as a proper multi-page React site with pathname routes:

- `/`
- `/about`
- `/events`
- `/menus`
- `/promotions`
- `/gallery`
- `/bookings`
- `/contact`

The rebuild adds sticky navigation, mobile menu behavior, parallax-style hero backgrounds, scroll reveal sections, image-led cards, gallery filtering, promotion review badges, and dedicated contact / booking pages.

Validation summary:

- `npm run build` passes.
- All required local routes return HTTP 200.
- Browser verification confirmed visible content on all routes.
- Mobile check at 390x844 passed without horizontal overflow.
- Screenshot evidence:
  - `D:\Projects\ATOC-Website\atoc-phase-b-mobile.png`
  - `D:\Projects\ATOC-Website\atoc-phase-b-gallery.png`

Safety remains local-only: no live WordPress changes, no publishing, no deployment, no DNS/hosting change, no Seedance/Ark/Comfy, no AI image/video generation, no ANZSBS changes, no AI-Video changes, and no secrets exposed.

Full Phase B report:

- `D:\Projects\ATOC-Website\ATOC_WEBSITE_PHASE_B_REBUILD_REPORT.md`
