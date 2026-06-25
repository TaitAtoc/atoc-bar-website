# ATOC Phase 4: Visual Design Improvement Report

**Date:** 2026-06-25
**Project:** D:\Projects\ATOC-Website
**Phase:** 4 — Local visual design improvement pass
**Status:** Complete — awaiting user review

---

## A. Verdict

Phase 4 is complete. Three source files were changed. `npm run build` passes. The safety scan still fails with the same 16 intentional placeholder blockers from `siteData.js` — no new blockers were introduced. No deployment was performed.

---

## B. Files Changed

| File | Change |
|---|---|
| `src/styles.css` | Full redesign: design tokens, Manrope font, grain overlay, new card/hero/section styles |
| `src/components/ParallaxHero.jsx` | Stronger parallax, button variant (`className`) support |
| `src/pages/Home.jsx` | Reduced hero CTAs from 4 to 2, added atmosphere section and section dividers |

---

## C. What Changed and Why

### 1. Design Tokens (CSS custom properties)

All colours, shadows, and motion values are now defined as `:root` custom properties. Previously all values were hardcoded throughout the file.

```css
:root {
  --bg: #070605;  --bg-1: #0d0b08;  --bg-2: #13100a;
  --gold: #f5ab3e;  --gold-dim: rgba(245,171,62,.13);
  --txt-hi: #f8f0e6;  --txt-mid: #ccbca8;  --txt-lo: #8a7a6a;
  --bdr: rgba(245,171,62,.14);  --bdr-hi: rgba(245,171,62,.42);
  --shadow: 0 6px 24px rgba(0,0,0,.38);
  --shadow-lg: 0 18px 56px rgba(0,0,0,.55);
  --ease: cubic-bezier(.4,0,.2,1);
}
```

**Impact:** Consistent palette, easy to update globally.

---

### 2. Manrope Font

Added `@import` for Google Fonts Manrope (weights 400–900) with fallback stack `Inter, 'Segoe UI', system-ui`. If Google Fonts is unavailable (e.g. offline or blocked network), the fallback stack renders cleanly. The production WordPress site should self-host the font or load it via `functions.php` before going live — noted below.

---

### 3. Film Grain Overlay

Added a `body::after` pseudo-element with an SVG fractalNoise texture at `opacity: 0.038` and `mix-blend-mode: overlay`. This creates a subtle analog/film quality on dark backgrounds that distinguishes premium nightlife sites from generic dark themes. Disabled by `prefers-reduced-motion`.

---

### 4. Hero Improvements

| Property | Before | After |
|---|---|---|
| Parallax offset | `Math.min(24, scrollY * 0.035)` | `Math.min(50, scrollY * 0.075)` |
| Background scale | `scale(1.04)` | `scale(1.1)` — more room for travel |
| Hero CTAs | 4 undifferentiated links | 2 links: primary (gold fill) + ghost (outline) |
| Gold accent | None | 48px horizontal gold line above headline |
| Shade gradient | Left-to-right soft | Stronger angular + bottom-up double gradient |

Hero CTA change: 4 undifferentiated CTAs cluttered the hero. Reduced to 2 decisive actions: **"See What's On"** (primary — goes to `/events`) and **"Find ATOC"** (ghost — goes to `/contact`). The other routes (menus, bookings) are reachable via nav.

---

### 5. Button Variants

`ParallaxHero` now passes `action.className` to `Link`. The `hero-actions` section uses `.btn-primary` (gold filled, uppercase, 52px height) and `.btn-ghost` (transparent, gold border, 52px height). Nav CTA (`.nav-cta`) continues to use its existing style.

---

### 6. Atmosphere Section (new)

A new full-bleed section added to `Home.jsx` between the quick-facts strip and the events section:

```jsx
<ScrollReveal className="atmo-section" as="section">
  <div className="atmo-bg" style={{ backgroundImage: `url(${images.bar})` }} />
  <div className="atmo-content">
    <span className="atmo-eyebrow">Guangzhou / Est. 2019</span>
    <h2 className="atmo-headline">Where sport meets the night</h2>
  </div>
</ScrollReveal>
```

- Uses the existing `images.bar` asset (no new image needed)
- `min-height: 60vh` with a dark-overlay and warm radial glow
- Large display type (`clamp(46px, 9vw, 114px)`) — cinematic break between data sections
- The `atmo-bg` div extends 8% beyond the container (`inset: -8%`) for a slight depth effect
- Fades in via `ScrollReveal` on entering viewport

**No placeholder text, no confirmation required** — "Where sport meets the night" is generic enough to publish.

---

### 7. Section Dividers

Added `<hr className="section-divider">` elements between major sections. These render as a thin horizontal gradient line (transparent → gold → transparent), creating visual rhythm without adding visual weight.

---

### 8. Section Backgrounds

Added `bg-alt` (`var(--bg-1)`) alternating class to the events and split-feature sections. This creates a subtle light/dark rhythm that breaks up the flat single-dark-background problem.

---

### 9. Quick Facts Strip

Added a 2px gold accent pin (`::before` pseudo-element) at the top of each fact article. Changed label typography to uppercase + letter-spacing 0.1em to improve scannability.

---

### 10. Feature Cards

| Property | Before | After |
|---|---|---|
| Image height | 210px (estimated) | 250px |
| Card background | `rgba(255,255,255,.07)` | `linear-gradient(155deg, var(--bg-2), #0d0906)` — opaque dark warm |
| Border top accent | None | 2px gold (full strength on hover) |
| Hover lift | Scale only | `translateY(-6px)` + `box-shadow` escalation |
| Image hover scale | 1.035 | 1.07 |

---

### 11. Event Tiles and Big Event Cards

Same treatment as feature cards: warm dark gradient background, gold top border that brightens on hover, and a `translateY(-4px)` lift.

---

### 12. Gallery Grid

- Added `figure::after` dark gradient overlay that fades in on hover
- Image hover scale increased from none → 1.05
- `aspect-ratio: 3/2` on images for consistent grid proportions

---

### 13. Footer

- Added `::before` pseudo-element: a gold gradient line across the top of the footer (narrower than full width for visual elegance)
- Footer background uses a gradient from `var(--bg-1)` to `var(--bg)` for a natural fade-out
- Two-column link grid layout for better footer typography

---

### 14. Accessibility

No regressions:
- All interactive elements retain visible focus states
- `prefers-reduced-motion` disables grain, animations, reveal transitions, and hero parallax
- `prefers-reduced-motion` also freezes hero parallax (`transform: none !important`)
- `body::after` grain layer is `pointer-events: none`
- Atmosphere section background div has `aria-hidden="true"`

---

## D. Build Result

```
vite v5.4.21 building for production
49 modules transformed
dist/index.html                   1.02 kB  (gzip: 0.52 kB)
dist/assets/index-CPYgsQcQ.css   16.89 kB  (gzip: 4.27 kB)
dist/assets/index-Dsw90UIy.js   167.40 kB  (gzip: 52.80 kB)
built in 460ms
```

CSS: 9.4 kB → 16.9 kB (the new design system + component styles). JS: unchanged at 167 kB. Both are within acceptable bounds for a bar/hospitality site.

---

## E. Safety Scan Result

```
=== SCAN FAILED - 16 issue(s) found ===
```

All 16 are in `atoc-bar-theme/assets/js/app.js` (compiled React bundle). All 16 are the same intentional placeholder blockers present since Phase 3A. Phase 4 introduced zero new forbidden strings.

---

## F. Git Commit

```
commit 9f4e9ce
Phase 4: visual design improvement pass

Add CSS design tokens, Manrope font stack, film grain overlay, stronger
parallax, primary/secondary hero CTAs, gold-accented cards and facts
strip, atmosphere section, section dividers, and improved gallery hover.
No placeholder blockers added. Safety scan unchanged at 16 (intentional).
```

---

## G. What Was NOT Changed

Per Phase 4 scope constraints:

- No live deployment
- No GitHub Actions / FTP credentials
- No DNS changes
- No Elementor deletion
- No schema injection
- No firewall changes
- No Adobe / Photoshop / internet services used
- No placeholder content removed from `siteData.js`
- No safety scan weakened
- No Century Bar assets or copy used

---

## H. Known Items for Future Phases

### Manrope font — WordPress production
The `@import` in `styles.css` works during local dev and when the user's browser can reach Google Fonts. For the production WordPress deployment, the font should be loaded via `functions.php`:

```php
wp_enqueue_style(
  'atoc-manrope',
  'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap',
  [], null
);
```

Or self-hosted via `@font-face` using the font files downloaded from fonts.google.com. Recommended for mainland China hosting where Google Fonts may be blocked.

### Route HTTP status
Sub-routes (`/about`, `/events`, etc.) still return HTTP 404 from WordPress (served by `404.php`). Acceptable while `noindex,nofollow` is active. Resolve before enabling indexing.

### Images
`public/assets/photos/` remains empty. All images are still legacy/reference shots. When confirmed ATOC photography is available, drop files into `public/assets/photos/` and update `siteData.js`.

---

## I. Local Preview

```powershell
npm run dev
# Visit http://127.0.0.1:8789
```

All pages (Home, About, Events, Menus, Promotions, Gallery, Bookings, Contact) render correctly. The atmosphere section, card hover effects, parallax, and section rhythm are all visible in the local Vite dev server.

---

PHASE 4 VISUAL PASS COMPLETE — AWAITING USER REVIEW
