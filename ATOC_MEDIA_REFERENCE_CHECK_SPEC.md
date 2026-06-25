# Executive Summary

The media reference check should be a local-only guardrail that prevents the React/Vite site and WordPress theme wrapper from pointing at missing files or unreviewed live WordPress URLs. It should complement the existing safety scan, not replace or weaken it.

# Check Scope

The check should verify:

- `public/assets/photos/media-manifest.json` parses as JSON when present.
- Every manifest `local_path` exists under the project root.
- Every `assets/brand`, `assets/legacy`, `assets/references`, or `assets/photos` reference in `src/data/siteData.js` resolves under `public`.
- No selected production media path points to `https://www.atocbar.com/wp-content/uploads/...`.
- No gallery item marked as internal/reference/review-only is allowed through a launch check.

# Staged Script

A PowerShell 5.1-compatible draft script is staged at:

`outputs\ATOC_MEDIA_STAGED_FILES\tools\Test-ATOC-MediaReferences.ps1`

Suggested future repo path:

`D:\Projects\ATOC-Website\tools\Test-ATOC-MediaReferences.ps1`

Example usage after copying staged media into the project:

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\tools\Test-ATOC-MediaReferences.ps1 -ProjectRoot .
```

# Integration With Existing Safety Scan

Recommended Phase 4 safety behavior:

- Run the existing ATOC safety scan unchanged.
- Run `Test-ATOC-MediaReferences.ps1` before packaging the WordPress theme.
- Fail the release if either check fails.
- Keep image rights as an explicit launch blocker until confirmed.

# Reporting Format

The script should print readable timestamped lines:

- `INFO` for paths checked.
- `WARN` for optional files not present.
- `FAIL` for missing local media.
- `PASS` only when every checked reference resolves.

# Non-Goals

The check must not:

- Download media.
- Call WordPress, Elementor, Adobe, or any external API.
- Modify firewall, DNS, credentials, or deployment settings.
- Replace missing files with placeholders.
- Rewrite `siteData.js`.

# Recommendation

Add this check after the full uploads export has been copied locally and before any deployment workflow is introduced.
