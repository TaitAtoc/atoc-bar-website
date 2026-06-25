# Executive Summary

Claude Code should clear placeholders only after the user supplies real ATOC facts. The implementation should replace ugly preview placeholders with structured data and neutral fallback copy, while keeping deployment blocked until `approvedForLaunch` flags and safety checks pass.

# Files To Edit Later

Primary:

- `src/data/siteData.js`
- `src/seo/pageMeta.js`
- `src/seo/schema.js`
- `src/components/ContactPanel.jsx`
- `src/components/Footer.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Bookings.jsx`
- `src/pages/Home.jsx`
- `src/pages/Events.jsx`
- `src/pages/Menus.jsx`
- `src/pages/Promotions.jsx`
- `src/pages/Gallery.jsx`
- `tools/Test-ATOC-SafetyScan.ps1`
- `tools/Test-ATOC-MediaReferences.ps1`

Generated/deploy output after rebuild:

- `atoc-bar-theme/assets/js/app.js`
- `atoc-bar-theme/assets/css/app.css`
- `atoc-bar-theme/assets/photos/...`

# Implementation Steps

1. Add `businessFacts` to `src/data/siteData.js`.
2. Replace `contactPlaceholders` with data-derived contact display rows.
3. Replace promo placeholders with structured `status` and `approvedForLaunch` fields.
4. Replace event placeholders with structured draft/approved event data.
5. Keep neutral preview copy for unknown facts.
6. Remove bracket placeholders from visible UI only after data-state gates exist.
7. Update page metadata from confirmed facts.
8. Keep `schemaStatus.publishReady = false` until facts are approved.
9. Add schema injection only in a later task after explicit approval.
10. Run build, safety scan, and media reference check.

# Safety Scan Changes

Do not remove existing blockers now.

Later safe additions:

- Add `[Confirm workflow]`
- Add `Map placeholder`
- Add `current terms still to confirm`
- Add `pending current menu approval`
- Add data-state validation for `approvedForLaunch`
- Add media manifest status validation if not already enforced

Later conditional relaxation:

- Allow `Zhujiang` or `Tianhe` only if the confirmed address actually supports those terms.

# Expected Test Results

Before real data is supplied:

- `npm run build`: should pass.
- `tools/Build-ATOC-Theme.ps1`: should pass.
- `tools/Test-ATOC-SafetyScan.ps1`: should fail.
- `tools/Test-ATOC-MediaReferences.ps1`: should pass local references but warn/block production because manifest is not approved.

After real data is supplied and approved:

- `npm run build`: pass.
- `tools/Build-ATOC-Theme.ps1`: pass.
- `tools/Test-ATOC-SafetyScan.ps1`: pass only if no placeholder/review strings remain.
- `tools/Test-ATOC-MediaReferences.ps1`: pass only if manifest is approved and references resolve.

# Do Not Do

- Do not invent address, hours, phone, WeChat, map link, menu, promos, or events.
- Do not weaken the safety scan to pass.
- Do not inject schema during placeholder clearance.
- Do not deploy.
- Do not treat public-crawl media as complete.

# Patch Plan Summary

Implement data structure first, content second, schema last. The safest order is:

1. Data architecture.
2. User facts import.
3. Preview copy cleanup.
4. Safety scan tightening.
5. Media manifest approval.
6. Schema approval.
7. Deployment readiness review.
