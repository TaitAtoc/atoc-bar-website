# Executive Summary

The ATOC media migration should preserve originals first, then build optimized local web-ready assets for the React/Vite site. The staged crawl provides a useful starter manifest, but it is incomplete by definition because it came from public homepage HTML rather than the full WordPress Media Library.

Final recommendation: **NEED LIVE WP UPLOADS / MEDIA EXPORT FIRST**.

# Migration Plan

## 1. Preserve the Source Library

Preferred source order:

1. Hosting backup or direct copy of `wp-content/uploads`.
2. WordPress Media Library export.
3. Public crawl fallback, only for visible images and only with incomplete status.

Preserve source files under an archive folder before renaming, resizing, compressing, or selecting images for the new site.

Recommended local structure:

```text
public/
  assets/
    photos/
      live-gallery/
      venue/
      menu/
      promo/
      archive/
      media-manifest.json
```

## 2. Reconcile Against Draft Manifest

Use `ATOC_MEDIA_MANIFEST_DRAFT.json` as the initial checklist:

- Match each public URL to a source file from `wp-content/uploads`.
- Prefer original uploads over WordPress resized derivatives.
- Keep thumbnails and Elementor-generated images in `archive`, not as hero/gallery source media.
- Record ownership/rights status before enabling launch.

## 3. Select Images for the Website

Recommended use:

- `venue`: hero, contact, location, atmosphere sections.
- `live-gallery`: gallery page and homepage mosaic.
- `menu`: drinks/menu visual support only after menu copy is approved.
- `promo`: keep blocked until current offers, prices, dates, and terms are confirmed.
- `archive`: retain for reference, do not wire into public UI unless intentionally selected.

Do not use fake stock imagery. Do not mix old promo graphics with current claims unless the owner confirms they remain valid.

## 4. Update Editable Data

Keep media references in `src\data\siteData.js`:

- Add a `media` or expanded `images` map for selected files.
- Keep gallery entries as data objects with `title`, `group`, `image`, `alt`, `sourceStatus`, and `review`.
- Avoid hard-coded image paths inside page components.
- Keep blocked or review-needed images visibly marked in data, not hidden in component logic.

Example future shape:

```js
export const media = {
  venue: {
    entrance: `${b}assets/photos/venue/Front-Entrance.jpg`,
    bar: `${b}assets/photos/venue/Bar-Pic.jpg`,
  },
  gallery: [
    {
      title: 'ATOC venue photo',
      group: 'Interior',
      image: `${b}assets/photos/live-gallery/IMG_0472.jpg`,
      sourceStatus: 'public-crawl-needs-original',
      review: 'Confirm source original and rights before launch',
    },
  ],
}
```

## 5. Add Reference Checking

Add `tools\Test-ATOC-MediaReferences.ps1` to check:

- Manifest `local_path` files exist.
- `siteData.js` asset references resolve under `public`.
- The check runs locally and uses no internet.

The staged script is included in:

`outputs\ATOC_MEDIA_STAGED_FILES\tools\Test-ATOC-MediaReferences.ps1`

## 6. Keep Safety Scan Strict

The safety scan must continue blocking:

- Placeholder address, hours, promotions, phone, and map details.
- Unconfirmed promotional claims, prices, dates, and terms.
- Internal contact sheets or image references marked “replace before publish”.
- Image rights review flags.
- Missing local media references.
- Any external dependency on live WordPress media URLs for the built theme.

Do not weaken existing blockers to make a build pass.

# Do Not Deploy Yet

Do not deploy until:

- Full uploads export is preserved.
- Selected images have confirmed rights/owner approval.
- Promo/menu claims are verified.
- The manifest is updated from `draft_public_crawl_incomplete` to an approved migration state.
- Reference-check and safety-scan both pass.

# Final Recommendation

**NEED LIVE WP UPLOADS / MEDIA EXPORT FIRST**
