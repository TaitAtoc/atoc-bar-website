# ATOC GitHub Deploy Audit

**Date:** 2026-06-25
**Project:** `D:\Projects\ATOC-Website`
**Phase:** Audit only — no implementation
**Status:** Awaiting user review

---

## 1. Is This Folder a Git Repo?

**No.**

```
fatal: not a git repository (or any of the parent directories): .git
```

The entire project exists only on local disk. There is no version history, no offsite backup, and no deployment pipeline. This is the most urgent gap before any GitHub-controlled workflow can be set up.

---

## 2. Project Type

**React + Vite SPA — not a WordPress theme, not PHP, not a hybrid.**

| Property | Finding |
|---|---|
| Framework | React 18.3 + Vite 5.4 |
| Entry point | `index.html` → `src/main.jsx` → `src/App.jsx` |
| Build command | `npm run build` |
| Build output folder | `dist/` |
| Dev server | `npm run dev` → `http://127.0.0.1:8789` |
| Routing | Custom SPA router via `window.location.pathname` (no React Router) |
| Pages | Home, About, Events, Menus, Promotions, Gallery, Bookings, Contact |

---

## 3. Build System

**Vite 5.4 with `@vitejs/plugin-react`.**

```
npm run build → dist/index.html + dist/assets/index-[hash].js + dist/assets/index-[hash].css
```

Latest confirmed build (Phase C, 2026-06-25):
- 44 modules transformed, zero errors
- JS bundle: 166 kB (52 kB gzip)
- CSS bundle: 9.4 kB (2.8 kB gzip)

No `vite.config.js` exists yet — Vite is running on implicit defaults. A config file should be added before CI.

---

## 4. Output Folder

`dist/` — produced by `npm run build`.

Contents:
```
dist/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
    brand/       (logo)
    legacy/      (images from public/)
    references/  (internal contact sheets)
```

The asset filenames include a content hash that changes with every build. The WordPress theme wrapper's `functions.php` must handle this (see architecture recommendation below).

---

## 5. WordPress Theme Wrapper

**None.** There are no PHP files and no `style.css` WordPress theme header anywhere in the project.

The live site (`www.atocbar.com`) is WordPress-based with Elementor likely still active and controlling the front end. That live site has not been touched at any point during Phase A/B/C.

---

## 6. `.github/workflows` Folder

**Does not exist.** No CI/CD pipeline of any kind.

---

## 7. Deployment Scripts

**None.** No `tools/` directory, no PowerShell deploy scripts, no FTP scripts.

The ANZSBS reference project has `tools/package-current-theme.ps1`. ATOC has nothing equivalent yet.

---

## 8. Elementor / WordPress Indicators in Local Project

None. The local project is pure React/Vite with no PHP, no Elementor, no WordPress dependencies.

Elementor is likely still active on the **live** server — it has not been modified, disabled, or uninstalled. Any deployment of a custom theme must be planned to bypass or replace Elementor's front-page template.

---

## 9. Safest Architecture to Make GitHub the Source of Truth

**Recommended: WordPress Theme Wrapper** (mirrors the ANZSBS pattern with a Vite build step added).

### How it works

```
Local: React/Vite source
    │
    ▼ npm run build
dist/
    │
    ▼ Build script copies assets into theme
atoc-bar-theme/          ← WordPress custom theme (this is what gets deployed)
  style.css              ← WP theme header (name, version, author)
  functions.php          ← wp_enqueue_style / wp_enqueue_script for compiled assets
  index.php              ← fallback template
  front-page.php         ← outputs <div id="root"></div>, loads compiled JS/CSS
  header.php             ← <!doctype html> ... <?php wp_head(); ?>
  footer.php             ← <?php wp_footer(); ?>
  assets/
    index.css            ← copied from dist/assets/index-[hash].css (renamed, stable)
    index.js             ← copied from dist/assets/index-[hash].js (renamed, stable)
    brand/
    legacy/
    references/
    │
    ▼ GitHub Actions deploys via FTP
Live: public_html/wp-content/themes/atoc-bar-theme/
```

### Why this approach

| Reason | Detail |
|---|---|
| Preserves all Phase A/B/C work | No rewrite — all React source is reused as-is |
| Matches ANZSBS deploy pattern | Same FTP mirror via `lftp`, same secrets structure, same safety checks |
| Elementor bypassed safely | WordPress serves the page via `front-page.php`; Elementor is not called for the front end |
| Build step is single-command | `npm ci && npm run build` in CI, then asset copy |
| No new framework needed | No Next.js, no Gatsby, no SSR |
| Future-safe | PHP templates can expand without touching React layer |

### Asset filename problem and fix

Vite hashes asset filenames. `functions.php` cannot hardcode `index-BPYHYNf1.js`.

**Fix (simplest):** the build script renames the hashed files to stable names (`index.css`, `index.js`) when copying into `atoc-bar-theme/assets/`. `functions.php` references the stable names.

---

## 10. Secrets and Actions Needed for GitHub Actions Deploy

The GitHub repository does not exist yet. Before any deployment workflow can run:

### GitHub secrets required

| Secret Name | Purpose |
|---|---|
| `ATOC_FTP_HOST` | Hostname or IP of the ATOC live server |
| `ATOC_FTP_USERNAME` | FTP username |
| `ATOC_FTP_PASSWORD` | FTP password |
| `ATOC_FTP_PORT` | FTP port (usually 21) |

**These values must come from the user. They cannot be guessed or derived.**

If ATOC shares a hosting account with ANZSBS: host/username/password may be the same, but the deploy path will differ (`public_html/wp-content/themes/atoc-bar-theme/`).

### GitHub Actions workflow (to be created, not created yet)

```yaml
# .github/workflows/deploy-atoc-theme.yml
# Trigger: push to main, or workflow_dispatch
# Steps:
#   1. Checkout
#   2. npm ci
#   3. npm run build
#   4. Copy dist/assets/ → atoc-bar-theme/assets/ (rename hashed files)
#   5. Safety scan (block forbidden strings before deploy)
#   6. Backup live theme via FTP list
#   7. lftp mirror atoc-bar-theme/ → live server
#   8. curl live URL, assert HTTP 200
```

---

## 11. What Should Happen Next Before Any Live Deployment

In order:

1. **User confirms architecture choice** — WordPress theme wrapper (recommended) or pure PHP rewrite
2. **User confirms GitHub repo name** — e.g. `atoc-bar-website`
3. **`git init` locally** — initialise repo, add `.gitignore`, first commit
4. **Create GitHub repo** — push local branch to remote
5. **Build WordPress theme wrapper** — create `atoc-bar-theme/` PHP shell files
6. **Build PowerShell tools** — `Build-ATOC-Theme.ps1`, `Test-ATOC-SafetyScan.ps1`, `Deploy-ATOC-Theme-Manual.ps1`, `Verify-ATOC-Live.ps1`
7. **User supplies FTP credentials** — add as GitHub repo secrets
8. **Create GitHub Actions workflow** — `.github/workflows/deploy-atoc-theme.yml`
9. **Dry-run safety scan locally** — confirm no forbidden strings block deployment
10. **Manual FTP deploy test** — deploy to staging or test path first, verify HTTP 200
11. **First live deployment** — only after all above confirmed and user explicitly approves

---

## Summary

| Check | Result |
|---|---|
| Git repo initialized | No |
| GitHub remote | No |
| GitHub Actions / `.github/` | No |
| WordPress theme in local project | No |
| Build system | Vite 5.4 — working |
| Build output folder | `dist/` |
| Elementor in local project | No |
| Elementor on live site | Likely still active (untouched) |
| Deployment credentials | None — user must supply |
| Deployment scripts | None |
| ANZSBS secrets reusable for ATOC | No — different deploy path; new secrets needed |
| Forbidden strings in source | None (Phase C clean) |
| Placeholder copy remaining | Yes (`[Confirm address]` etc. — intentional, not publishable) |
| Schema injected into DOM | No (draft only) |
| New venue photography | No (`public/assets/photos/` is empty) |

---

AUDIT COMPLETE — AWAITING USER REVIEW
