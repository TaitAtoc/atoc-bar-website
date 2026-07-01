# ATOC Selective Commit Plan

Target commit:

```text
Prepare ATOC WordPress theme deployment
```

This plan does not stage, commit, push, or deploy anything.

## Repository Build Strategy

- `dist/` is ignored, is not currently tracked, and has no tracked history in this checkout.
- `deploy/wordpress-theme/atoc-bar-v2/` is not currently tracked.
- The manual GitHub Actions workflow runs `npm ci`, runs `npm run build`, removes generated package content, copies `dist/` into the package, and deploys only `atoc-bar-v2`.
- Therefore, do not commit `dist/`.
- Commit only the four hand-maintained theme source files under `deploy/wordpress-theme/atoc-bar-v2/`: `style.css`, `functions.php`, `index.php`, and `404.php`.
- Do not commit generated package files (`.vite/`, `assets/`, `data/`, `media/`, or `index.html`). CI recreates them from `dist/`.

## Change Classification

### A. Required For The Live Website Update

Stage the current React implementation because CI builds the deployed bundle from source:

- `index.html`
- `vite.config.js`
- `src/App.jsx`
- `src/styles.css`
- `src/seo/pageMeta.js`
- All changed files under `src/components/`
- All changed files under `src/pages/`
- `src/data/siteData.js`
- `src/data/sportsScheduleSample.js`
- `src/utils/assetUrl.js`

These changes include `/sports`, the `/events` alias, production robots behavior, theme-aware asset URLs, current page content, menus, gallery, promotions, bookings, and sports UI.

### B. Required For WordPress Deployment

- `.github/workflows/deploy-atoc-wordpress-theme.yml`
- `deploy/wordpress-theme/atoc-bar-v2/style.css`
- `deploy/wordpress-theme/atoc-bar-v2/functions.php`
- `deploy/wordpress-theme/atoc-bar-v2/index.php`
- `deploy/wordpress-theme/atoc-bar-v2/404.php`
- `.gitignore`
- `docs/ATOC_WORDPRESS_LIVE_DEPLOYMENT_PLAN.md`

The `.gitignore` changes protect production environment files, secrets, runtime data, and local sports bridge output.

### C. Generated Build Output

Do not stage:

- `dist/`
- `deploy/wordpress-theme/atoc-bar-v2/.vite/`
- `deploy/wordpress-theme/atoc-bar-v2/assets/`
- `deploy/wordpress-theme/atoc-bar-v2/data/`
- `deploy/wordpress-theme/atoc-bar-v2/media/`
- `deploy/wordpress-theme/atoc-bar-v2/index.html`

### D. Public Media Intentionally Used By The Current Site

Stage these source assets because React or the public sports manifests currently reference them:

- `public/assets/photos/Maps/ATOC MAP.png`
- `public/assets/photos/food-drink/`
- `public/assets/photos/hero/`
- `public/assets/photos/live-gallery/Dalrymple Family.png`
- `public/assets/photos/gallery/Dalrymple Family.png`
- `public/assets/photos/menu/menu-page-01-drinks.webp` through `menu-page-10-shisha-promos.webp`
- `public/assets/photos/posters/Sports Generic Poster.png`
- `public/assets/photos/posters/Coffee Poster.png`
- `public/assets/photos/posters/ChatGPT Image Jun 26, 2026, 06_01_22 PM.png`
- `public/assets/photos/promo/Affogato.jpg`
- `public/assets/photos/promo/Happy Hour.jpg`
- `public/assets/photos/promo/Ladies Night.jpg`
- `public/assets/photos/promo/Soft Serve Menu.jpg`
- `public/assets/photos/venue/ATOC BAR ASSETS.png`
- `public/assets/photos/venue/ATOC Entrance.jpg`
- `public/assets/photos/venue/ChatGPT Image Jun 26, 2026, 05_03_34 PM.png`
- `public/data/`
- `public/media/`

The two sports JSON manifests and their referenced poster images must be staged together if the current sports carousel content is approved.

### E. Old Or Removed Media Requiring Explicit Approval

Do not stage these deletions without confirming that the replacements are correct:

- Fourteen deleted thumbnails under `public/assets/photos/archive/`
- Deleted `public/assets/photos/live-gallery/IMG_0472.jpg`
- Deleted `public/assets/photos/live-crawl/Brooklyn.jpg`
- Deleted `public/assets/photos/live-crawl/Carlsberg-Beer.jpg`
- Deleted `public/assets/photos/live-crawl/Lervig.jpg`
- Deleted `public/assets/photos/live-crawl/jing-a-new.jpg`
- Deleted `public/assets/photos/live-crawl/liefmans.jpg`
- Deleted `public/assets/photos/promo/Caesar-212x300.jpg`
- Deleted `public/assets/photos/promo/Guinness-212x300.jpg`
- Deleted `public/assets/photos/promo/Ladies-Night-212x300.jpg`
- Deleted `public/assets/photos/promo/Tequila-Shots-212x300.jpg`

The current site does not directly reference these exact deleted paths, but deleting tracked source media is irreversible in the commit and should be reviewed separately.

### F. Documentation Only

Recommended deployment documentation:

- `docs/ATOC_WORDPRESS_LIVE_DEPLOYMENT_PLAN.md`
- `ATOC_ARCHITECTURE_DECISION.md`
- `ATOC_GITHUB_DEPLOY_AUDIT.md`
- `ATOC_PHASE_3A_THEME_WRAPPER_REPORT.md`
- `docs/ATOC_SELECTIVE_COMMIT_PLAN.md`

Review separately:

- `docs/legacy-site-audit.md`
- `docs/sports-live-collectors-plan.md`
- `docs/sports-schedule-widget-plan.md`

### G. Should Not Be Committed In This Deployment Commit

- `dist/`
- Generated content inside the v2 package
- `.env.production`
- `secrets/`
- `runtime/`
- Sports bridge keys, logs, and runtime collector outputs
- Any file outside `D:\Projects\ATOC-Website`

### H. User Review Before Staging

- `package.json`: adds sports collector/bridge scripts and couples the commit to `tools/sports/`.
- `tools/sports/`: 20 untracked operational files; separate from the WordPress theme deployment mechanism.
- `docs/sports-live-collectors-plan.md` and `docs/sports-schedule-widget-plan.md`.
- Modified but currently unreferenced menu images: `Brooklyn.jpg`, `Carlsberg-Beer.jpg`, `Lervig.jpg`, and `liefmans.jpg`.
- Other untracked menu images: `IMG_0020.JPG`, `IMG_1544.JPG`, and `jing a new.jpg`.
- Untracked `public/assets/photos/events/`.
- Untracked `public/assets/photos/archive/IMG_0472.jpg`.
- Untracked gallery thumbnails other than `gallery/Dalrymple Family.png`.
- Untracked poster `ChatGPT Image Jun 26, 2026, 05_40_16 PM.png`.
- Untracked venue images other than the three explicitly listed in group D.
- All deletions listed in group E.

## Recommended Git Add Commands

Run these only after approving this plan:

```powershell
git add -- .gitignore index.html vite.config.js
git add -- src
git add -- .github/workflows/deploy-atoc-wordpress-theme.yml
git add -- deploy/wordpress-theme/atoc-bar-v2/style.css deploy/wordpress-theme/atoc-bar-v2/functions.php deploy/wordpress-theme/atoc-bar-v2/index.php deploy/wordpress-theme/atoc-bar-v2/404.php
git add -- docs/ATOC_WORDPRESS_LIVE_DEPLOYMENT_PLAN.md docs/ATOC_SELECTIVE_COMMIT_PLAN.md
git add -- ATOC_ARCHITECTURE_DECISION.md ATOC_GITHUB_DEPLOY_AUDIT.md ATOC_PHASE_3A_THEME_WRAPPER_REPORT.md
git add -- "public/assets/photos/Maps/ATOC MAP.png"
git add -- public/assets/photos/food-drink public/assets/photos/hero
git add -- "public/assets/photos/live-gallery/Dalrymple Family.png" "public/assets/photos/gallery/Dalrymple Family.png"
git add -- public/assets/photos/menu/menu-page-01-drinks.webp public/assets/photos/menu/menu-page-02-coffee-cocktails.webp public/assets/photos/menu/menu-page-03-cocktails.webp public/assets/photos/menu/menu-page-04-wines.webp public/assets/photos/menu/menu-page-05-whiskey-cognac.webp public/assets/photos/menu/menu-page-06-bourbon-rum.webp public/assets/photos/menu/menu-page-07-tequila-vodka-gin.webp public/assets/photos/menu/menu-page-08-liquors.webp public/assets/photos/menu/menu-page-09-soft-drinks-coffee.webp public/assets/photos/menu/menu-page-10-shisha-promos.webp
git add -- "public/assets/photos/posters/Sports Generic Poster.png" "public/assets/photos/posters/Coffee Poster.png" "public/assets/photos/posters/ChatGPT Image Jun 26, 2026, 06_01_22 PM.png"
git add -- "public/assets/photos/promo/Affogato.jpg" "public/assets/photos/promo/Happy Hour.jpg" "public/assets/photos/promo/Ladies Night.jpg" "public/assets/photos/promo/Soft Serve Menu.jpg"
git add -- "public/assets/photos/venue/ATOC BAR ASSETS.png" "public/assets/photos/venue/ATOC Entrance.jpg" "public/assets/photos/venue/ChatGPT Image Jun 26, 2026, 05_03_34 PM.png"
git add -- public/data public/media
```

Do not use `git add .`, `git add -A`, or `git add -u`; those commands would capture unapproved deletions and unrelated changes.

After staging, verify the checkpoint before committing:

```powershell
git status --short
git diff --cached --stat
git diff --cached --check
git diff --cached --name-status
```

Do not commit until the staged file list and media decisions are approved.
