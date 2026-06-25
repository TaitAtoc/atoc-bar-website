# ATOC Media Preservation Integration Report

## What Codex Found

Codex crawled the publicly visible homepage HTML at https://www.atocbar.com/ and discovered 48 image URLs from `wp-content/uploads` (March 2021 and April 2023 upload batches) plus one Elementor thumbnail. The crawl was HTML-only -- no authenticated WordPress access, no Media Library export.

**Critical limitation confirmed by Codex:**
> The public crawl is good enough for review and triage, but it is not a complete preservation source. Images not present in the rendered homepage, unpublished media, alternate sizes, PDFs, videos, and removed-but-still-needed uploads may be missing.

Crawl categories found:

| Category | Count | Notes |
|---|---|---|
| gallery (IMGxxxx-scaled) | 15 | Full-resolution scaled images from live gallery |
| archive (IMGxxxx-150x150, favicons, Elementor thumb) | 17 | Thumbnails and derivative sizes -- not originals |
| menu (beer, coffee, shisha product images) | 8 | Sized derivatives (614x1024, 768x1086) |
| promo (Caesar, Guinness, Ladies Night, Tequila) | 4 | Small 212x300 promotional graphics |
| venue (Bar-Pic, Front-Entrance, Tv-Channels, Mobile-Phone-Hero) | 4 | Wide-format venue images (1440x516) |

**Manifest status:** `draft_public_crawl_incomplete`

## What Was Copied Into the Repo

### Report files (repo root)

| File | Source |
|---|---|
| `ATOC_LIVE_MEDIA_PRESERVATION_REPORT.md` | Codex outputs |
| `ATOC_MEDIA_MIGRATION_PLAN.md` | Codex outputs |
| `ATOC_MEDIA_REFERENCE_CHECK_SPEC.md` | Codex outputs |

### New tool

`tools/Test-ATOC-MediaReferences.ps1` -- checks manifest `local_path` entries exist on disk; checks all `assets/` references in `siteData.js` resolve under `public/`; prints mandatory WARN about incomplete crawl and not-approved manifest status; prints PASS/FAIL clearly.

## Where the 48 Public Crawl Images Were Placed

Images are stored in two locations:

**Categorized (matching manifest `local_path` entries, validated by media checker):**
- `public/assets/photos/live-gallery/` -- 15 gallery images (IMGxxxx-scaled.jpg, IMGxxxx.jpg)
- `public/assets/photos/venue/` -- 4 venue images (Bar-Pic.jpg, Front-Entrance.jpg, Tv-Channels.jpg, Mobile-Phone-Hero-Pic-724x1024.jpg)
- `public/assets/photos/menu/` -- 8 menu images (beer, coffee, shisha)
- `public/assets/photos/promo/` -- 4 promo images (Caesar, Guinness, Ladies-Night, Tequila)
- `public/assets/photos/archive/` -- 17 thumbnails/derivatives/elementor thumb

**Raw flat dump (all 48 images, filename-only, no subdirs):**
- `public/assets/photos/live-crawl/` -- 48 files flat

**Note:** The current `siteData.js` gallery and media references were NOT changed. The crawl images are staged in `public/assets/photos/` for reference only. Nothing in the site UI points to them yet.

## Whether media-manifest.json Was Added

YES. Added at `public/assets/photos/media-manifest.json`.

Every entry has:
- `"status": "draft_public_crawl_incomplete"` at the top level
- `"discovered_from": "public homepage crawl https://www.atocbar.com/ (incomplete fallback)"` per entry
- `"notes": "Downloaded from public crawl; verify against WordPress Media Library/wp-content/uploads before relying on this as complete."` per entry

The manifest from the staged files (which matched the Codex draft manifest exactly) was used.

## Whether Test-ATOC-MediaReferences.ps1 Was Added

YES. Added at `tools/Test-ATOC-MediaReferences.ps1`.

The Codex-staged script was used as the base and extended with:
- Mandatory WARN banner printed on every run (incomplete crawl, WP uploads export required)
- Manifest `status` field check with WARN if not `approved`
- PASS/FAIL output clearly states that PASS only means local references exist, not that rights are cleared or the crawl is complete

## Build Result

```
vite v5.4.21 building for production...
50 modules transformed.
dist/index.html                   1.02 kB
dist/assets/index-BrRRFv9i.css  18.67 kB
dist/assets/index-Dm7bJdPH.js  169.04 kB
built in 531ms
```

**BUILD PASSED.**

## Safety Scan Result

```
=== SCAN FAILED - 15 issue(s) found ===

  atoc-bar-theme\assets\js\app.js
    x  [Confirm address]
    x  [Confirm opening hours]
    x  [Confirm phone
    x  [Confirm map
    x  Internal contact sheet
    x  replace before publish
    x  Review image rights
    x  Confirm current offer
    x  Confirm day, terms
    x  Confirm current menu
    x  Confirm whether offer
    x  pending confirmation
    x  Schedule pending
    x  Needs update
    x  Legacy promo
```

**INTENTIONAL.** Same 15 pre-existing placeholder blockers as before. No new blocked patterns introduced by the media integration. The media-manifest.json is synced to `atoc-bar-theme/assets/photos/` by the build script (top-level files only), but JSON files are not scanned by the safety scan (which only checks `.php`, `.css`, and compiled `.js`).

## Media Checker Result

```
=== ATOC MEDIA REFERENCE CHECK ===

  IMPORTANT - FULL WP UPLOADS / MEDIA EXPORT STILL REQUIRED
  The 48-image public crawl is an INCOMPLETE snapshot of the live WordPress
  Media Library...
  Next required step: copy or export full wp-content/uploads from the host.

[INFO] Manifest status: draft_public_crawl_incomplete
[WARN] Manifest is not approved for production use (status: draft_public_crawl_incomplete)
[INFO] Checking siteData asset references: src\data\siteData.js

[PASS] All checked media references resolve to local files.

  NOTE: PASS means all LOCAL references are present.
  It does NOT confirm the crawl is complete or image rights are cleared.
  Obtain the full wp-content/uploads export before deployment.
```

**PASS** (with expected WARN about incomplete crawl status).

## Commit Hash

`fed549f`

Full message: `Media preservation integration: 48-image public crawl staged, manifest, reference checker`

## Why Deployment Is Still Blocked

1. **Safety scan fails on 15 intentional blockers** -- address, hours, phone/WeChat, map, promotions, image rights, and contact details are all unconfirmed.
2. **Media manifest is `draft_public_crawl_incomplete`** -- the 48-image crawl does not represent the full WordPress Media Library.
3. **Image rights not confirmed** -- no owner sign-off on which crawled images are approved for the new site.
4. **Crawl images not wired into site UI** -- `siteData.js` gallery and hero references still use the current `legacy/` and `references/` images.
5. **Menu/promo claims unconfirmed** -- promotional images in `promo/` contain prices or offers that may be stale.
6. **Full wp-content/uploads not preserved** -- the authoritative media source (hosting backup or WordPress Media Library XML export) has not been obtained.

## Exact Next User Action to Obtain Full WordPress Uploads/Media Export

**Option A -- Hosting control panel (preferred):**
1. Log into the web hosting account for atocbar.com.
2. Use cPanel File Manager, FTP, or SFTP to download the full `wp-content/uploads/` directory tree.
3. Place the downloaded directory at `public/assets/photos/wp-uploads-export/` (or similar) for local triage.
4. Update `media-manifest.json` to reconcile each public-crawl entry against the found source originals.

**Option B -- WordPress admin export:**
1. Log into the WordPress admin at https://www.atocbar.com/wp-admin/.
2. Go to Tools > Export > Media only.
3. Download the XML export file (this records post IDs, filenames, and attachment metadata but does not include the actual image files).
4. Use the XML to confirm which upload paths exist and map them against the 48-image draft manifest.
5. Still need FTP/SFTP for the actual image files.

**Option C -- Provide FTP credentials for a future automated sync:**
This is not being set up in this phase (no credentials, no GitHub Actions yet). When ready, the FTP sync can be added following the ANZSBS pattern documented in `ATOC_ARCHITECTURE_DECISION.md`.

**After obtaining the upload export:**
1. Reconcile against `media-manifest.json` -- mark `source_path` for each entry once the original file is confirmed.
2. Update manifest `status` from `draft_public_crawl_incomplete` to `approved` for each confirmed file.
3. Re-run `tools/Test-ATOC-MediaReferences.ps1` -- it will WARN until `status` is `approved`.
4. Update `src/data/siteData.js` to reference confirmed images in `assets/photos/venue/` and `assets/photos/live-gallery/` once owner-approved.
5. Re-run safety scan -- `Review image rights` and `replace before publish` blockers must be resolved before deployment.
