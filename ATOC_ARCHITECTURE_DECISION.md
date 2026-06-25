# ATOC Deployment Architecture Decision

**Date:** 2026-06-25
**Status:** Awaiting user approval — no implementation has started

---

## Current State

The ATOC project is a React + Vite SPA. The target is WordPress on the live server.
The ANZSBS reference deploys a pure PHP WordPress theme via FTP from GitHub Actions.

---

## Architecture Recommendation: WordPress Theme Wrapper

**Recommended approach:** Build the Vite SPA, then package the compiled output into a WordPress custom theme that serves the app as the site's front end.

### How It Works

```
Local project (React/Vite)
        │
        ▼
npm run build
        │
        ▼
dist/
  index.html         ← source of truth for HTML shell
  assets/
    index-xxx.js     ← compiled React app
    index-xxx.css    ← compiled styles
        │
        ▼
WordPress theme: atoc-bar-theme/
  style.css          ← WP theme header (name, version)
  functions.php      ← enqueue compiled JS/CSS, disable Elementor on front page
  index.php          ← fallback template
  front-page.php     ← outputs the HTML shell, loads compiled assets
  header.php         ← minimal WP head (wp_head hook)
  footer.php         ← wp_footer hook
  assets/            ← compiled JS, CSS, images, video copied from dist/
        │
        ▼
GitHub Actions
  1. npm ci && npm run build
  2. Copy dist/assets/ into atoc-bar-theme/assets/
  3. Mirror atoc-bar-theme/ to live server via FTP
  4. Verify live URL HTTP 200
        │
        ▼
Live server: public_html/wp-content/themes/atoc-bar-theme/
```

### Why This Approach

| Reason | Detail |
|---|---|
| Minimal code rewrite | All Phase A/B/C React work is preserved and reused |
| WordPress controls routing | WordPress handles `/`, `/about`, etc. via `front-page.php` and optional rewrite rules |
| Elementor bypassed | The custom theme's `front-page.php` template replaces Elementor on the front end. WordPress serves the page; React runs in the browser |
| Matches ANZSBS pattern | Same FTP deploy, same GitHub Actions structure, same secrets pattern |
| Build step is clean | Single `npm ci && npm run build` in CI, then copy assets into theme folder |
| No new dependencies | No Next.js, no Gatsby, no SSR framework required |
| Future-safe | PHP templates can be expanded later without touching the React layer |

### What "WordPress Theme Wrapper" Means in Practice

The WordPress PHP files are minimal shells:

**`front-page.php`** (the critical file):
```php
<?php get_header(); ?>
<div id="root"></div>
<?php get_footer(); ?>
```

**`header.php`** outputs:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body>
```

**`functions.php`** enqueues the compiled assets:
```php
wp_enqueue_style('atoc-app', get_template_directory_uri() . '/assets/index.css', [], ATOC_VERSION);
wp_enqueue_script('atoc-app', get_template_directory_uri() . '/assets/index.js', [], ATOC_VERSION, true);
```

The compiled CSS and JS filenames change with each Vite build (content hash). The build script must update the enqueue calls or use a manifest approach.

---

## Alternative: Pure PHP WordPress Theme (Not Recommended Now)

This would involve converting all React components to PHP/HTML templates.

| Consideration | Detail |
|---|---|
| Work required | Major rewrite — all 8 pages, all components, all data |
| Timeline impact | Adds significant Phase 3 work |
| Upside | Aligns exactly with ANZSBS pattern, no build step |
| Recommendation | **Defer** — only worth doing if the React SPA creates ongoing friction. The wrapper approach is faster and the codebase is already built. |

---

## Repo Structure (Target)

```
D:\Projects\ATOC-Website\
├── .github/
│   └── workflows/
│       └── deploy-atoc-theme.yml
├── .gitignore
├── atoc-bar-theme/              ← WordPress theme (deployed to live)
│   ├── style.css
│   ├── functions.php
│   ├── index.php
│   ├── header.php
│   ├── footer.php
│   ├── front-page.php
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── images/
│   │   └── video/
│   ├── inc/
│   └── template-parts/
├── src/                         ← React source (not deployed)
│   ├── App.jsx
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── seo/
│   └── styles.css
├── tools/
│   ├── Backup-ATOC-LiveTheme.ps1
│   ├── Build-ATOC-Theme.ps1
│   ├── Test-ATOC-SafetyScan.ps1
│   ├── Deploy-ATOC-Theme-Manual.ps1
│   └── Verify-ATOC-Live.ps1
├── dist/                        ← Vite build output (gitignored)
├── public/                      ← Vite static assets
├── index.html
├── package.json
└── vite.config.js               ← To be created (currently implicit)
```

---

## GitHub Secrets Required

These must be created in GitHub repository settings before any deployment run.

| Secret Name | Maps To | ANZSBS Equivalent |
|---|---|---|
| `ATOC_FTP_HOST` | FTP hostname or IP | `FTP_HOST` |
| `ATOC_FTP_USERNAME` | FTP username | `FTP_USERNAME` |
| `ATOC_FTP_PASSWORD` | FTP password | `FTP_PASSWORD` |
| `ATOC_FTP_PORT` | FTP port (21 or custom) | `FTP_PORT` |

**User must supply these values.** They cannot be guessed or derived.

**If ATOC is on the same hosting account as ANZSBS:** The host, username, and password may be the same. The deploy path (`ATOC_FTP_PATH`) would differ — `public_html/wp-content/themes/atoc-bar-theme/` vs ANZSBS's `public_html/wp-content/themes/anzsbs-custom/`.

**If ATOC is on a different hosting account:** All four secrets will be different.

---

## GitHub Repository

A new GitHub repository must be created before any secrets or Actions can be set up.

**Suggested repo name:** `atoc-bar-website` (or as user prefers)

**User action required:**
1. Create GitHub repo (public or private — private recommended)
2. Run `git init` locally
3. Add remote: `git remote add origin https://github.com/<org>/<repo>.git`
4. Add secrets in GitHub → Settings → Secrets → Actions

---

## Deployment Flow (Target)

```
git push origin main
        │
        ▼
GitHub Actions: deploy-atoc-theme.yml
  ├── Checkout code
  ├── npm ci
  ├── npm run build
  ├── Copy dist/assets/ → atoc-bar-theme/assets/
  ├── Safety scan (block forbidden strings)
  ├── Inspect remote theme folder via FTP
  ├── Mirror atoc-bar-theme/ → public_html/wp-content/themes/atoc-bar-theme/
  └── Verify https://www.atocbar.com/ returns HTTP 200
```

Manual fallback: `tools/Deploy-ATOC-Theme-Manual.ps1` (same logic, runs locally)

---

## Hard Limits Confirmed

Nothing below this line happens until user explicitly approves each phase:

- No `git init` until approved
- No GitHub repo creation until approved
- No WordPress theme files created until approved
- No GitHub Actions workflow created until approved
- No live deployment until explicitly approved
- No Elementor deletion
- No DNS changes
- No schema injection
- No firewall changes
- No Adobe/Photoshop internet
- No Century Bar assets copied

---

## What Is Needed From the User Before Phase 3

1. **Confirm architecture choice** — WordPress theme wrapper (recommended) or pure PHP rewrite
2. **GitHub repo name** — what to call the repository
3. **ATOC hosting details** — FTP host, username, password, port (for secrets setup)
4. **Live WordPress theme name** — confirm `atoc-bar-theme` as the target theme folder name, or provide the existing name
5. **Confirm Elementor bypass plan** — once the custom theme is activated, Elementor's front-page control is replaced. Confirm this is acceptable before activation.
6. **Confirm ATOC live domain** — assumed `www.atocbar.com` (from Phase A). Confirm for the post-deploy verification check.
