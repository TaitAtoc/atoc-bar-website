# Executive Summary

The live ATOC site at https://www.atocbar.com/ exposes a useful but incomplete public set of WordPress image URLs. I found and staged 48 publicly discoverable images from the homepage HTML, including venue photos, gallery photos, menu/product imagery, promo graphics, thumbnails, and one Elementor thumbnail. The staged files and draft manifest are local-only and do not modify the live site or the local ATOC repo.

Final recommendation: **NEED LIVE WP UPLOADS / MEDIA EXPORT FIRST**.

The public crawl is good enough for review and triage, but it is not a complete preservation source. Before replacing the gallery or media references in the React/Vite site, obtain a full `wp-content/uploads` copy, hosting backup, or WordPress Media Library export.

# Detailed Findings

## Local Project State

Audited read-only project: `D:\Projects\ATOC-Website`.

The current site is a React + Vite SPA with a WordPress theme wrapper. Current image references are centralized in `src\data\siteData.js`, and the gallery page renders from the exported `gallery` array. This is the right shape for a future media migration because media paths can stay editable in one data file.

Existing local media currently present:

- `public\assets\brand\atoc-logo-master.png`
- `public\assets\legacy\*.jpg`
- `public\assets\references\*.jpg`
- matching copies under `atoc-bar-theme\assets\...`

The current `siteData.js` references resolve to existing local files. The active gallery still uses legacy/reference images rather than the newly staged public-crawl images.

## Current Local Gallery References

Current gallery entries point to:

- `assets/legacy/front-entrance.jpg`
- `assets/legacy/outdoor-seating-legacy.jpg`
- `assets/legacy/bar-interior-legacy.jpg`
- `assets/legacy/sports-channels-legacy.jpg`
- `assets/references/bar-counter-contact-sheet.jpg`
- `assets/references/main-room-contact-sheet.jpg`
- `assets/references/outdoor-terrace-contact-sheet.jpg`
- `assets/references/entrance-contact-sheet.jpg`

These are locally present, but several are marked as review/internal references in the data. They should remain blocked from launch until image rights and suitability are confirmed.

## Live Public Crawl

The live site was crawled from publicly visible HTML only. The crawl discovered 48 image URLs from `wp-content/uploads` and `wp-content/uploads/elementor/thumbs`.

Staged category counts:

- `gallery`: 15
- `venue`: 4
- `menu`: 8
- `promo`: 4
- `archive`: 17

Important limitation: this does not prove the full Media Library has only 48 images. Images not present in the rendered homepage, unpublished media, alternate sizes, PDFs, videos, and removed-but-still-needed uploads may be missing.

## Staged Output

Staged folder:

`C:\Users\HP\Documents\Codex\2026-06-24\files-mentioned-by-the-user-you\outputs\ATOC_MEDIA_STAGED_FILES`

Draft media manifest:

`C:\Users\HP\Documents\Codex\2026-06-24\files-mentioned-by-the-user-you\outputs\ATOC_MEDIA_MANIFEST_DRAFT.json`

The manifest status is `draft_public_crawl_incomplete`. Each entry records original filename, source URL, source path, proposed local path, category, dimensions, byte size, SHA-256 checksum, discovery source, and notes.

## Preservation Risks

- Public crawl may miss Media Library items not rendered on the homepage.
- WordPress generated sizes may not include the original source file for every image.
- Elementor thumbnails should not be treated as source originals.
- Some visible promotional images contain prices or offers that may be stale.
- Some files have spaces, uppercase, or WordPress-generated suffixes; preserve originals first, then create cleaned derivative filenames later.
- Do not point production data to staged assets until owner approval and source completeness are confirmed.

# Blockers

- Full `wp-content/uploads` or Media Library export has not been verified.
- Image rights/ownership are not confirmed.
- Current address, hours, and promotions remain safety-scan blockers elsewhere in the site.
- Live WordPress/Elementor content is untouched and should remain untouched.

# Recommendation

Use the staged public crawl only as an audit draft. Next step should be copying or exporting the full WordPress uploads library, then reconciling it against this manifest.

**NEED LIVE WP UPLOADS / MEDIA EXPORT FIRST**
