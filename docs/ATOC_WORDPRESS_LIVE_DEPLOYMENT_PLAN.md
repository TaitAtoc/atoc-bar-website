# ATOC WordPress Live Deployment Plan

## Deployment State

- Repository: `D:\Projects\ATOC-Website`
- Working tree: modified before this preparation; all existing changes must be preserved.
- Remote: `origin` points to the ATOC website GitHub repository.
- Live deployment status: **NOT PERFORMED**
- GitHub push status: **NOT PERFORMED**

## Build And Package

- Build command: `npm ci` followed by `npm run build`
- Build output: `dist/`
- WordPress theme package: `deploy/wordpress-theme/atoc-bar-v2/`
- Theme slug: `atoc-bar-v2`
- Production asset base: `/wp-content/themes/atoc-bar-v2/`
- The Vite manifest maps the React entry point to hashed JavaScript and CSS files.
- The complete `dist/` output, including required public assets, is copied into the theme package.

## Routing

The React application exposes `/sports` as the public sports route. `/events` remains an alias to the same page for compatibility.

The theme's `template_redirect` handler is limited to:

- `/`
- `/about`
- `/sports`
- `/events`
- `/menus`
- `/promotions`
- `/gallery`
- `/bookings`
- `/contact`

Only these exact routes receive HTTP 200 and render the React entry template. WordPress admin, login, REST API, uploads, plugin files, theme files, and assets are excluded. Unknown paths continue through normal WordPress handling.

## Artifact Checks

Before any release, scan `dist/` and `deploy/wordpress-theme/atoc-bar-v2/` for:

- Local filesystem paths
- `localhost` and `127.0.0.1`
- development ports `8787`, `8789`, `8790`, and `8791`
- `AI-Ops-Hub`
- the obsolete `atoc-bar-theme` production base

The preparation-time scan passed.

## GitHub Deployment Secrets

Configure these GitHub environment or repository secrets:

- `WP_DEPLOY_HOST`
- `WP_DEPLOY_USER`
- `WP_DEPLOY_PORT`
- `WP_THEME_REMOTE_PATH` set to the remote WordPress themes parent directory
- One authentication method: `WP_DEPLOY_PASSWORD` or `WP_DEPLOY_SSH_KEY`

Do not place credentials, private keys, host details, or passwords in source files or workflow logs.

## Backup Plan

1. Back up the WordPress database through the hosting control panel or an established database backup process.
2. Archive the currently active theme directory and record its exact theme slug.
3. Back up `wp-content/uploads` and any host-level WordPress configuration required for recovery.
4. Verify the backups can be downloaded and opened before uploading the new theme.
5. Upload `atoc-bar-v2` as a separate directory. Do not overwrite the active theme.

## Controlled Activation

1. Run the manual GitHub Actions workflow or upload the prepared package manually.
2. Confirm `atoc-bar-v2` exists beside the active theme and is not active.
3. Use WordPress staging or theme preview where available.
4. Decide whether search indexing is approved. Production defaults to `index,follow`; set `VITE_ROBOTS_NOINDEX=true` only for staging or private builds.
5. Validate page rendering, browser console, assets, mobile navigation, and all known routes.
6. Activate only during an approved maintenance window after backup verification.

## Rollback Plan

1. Reactivate the previously active WordPress theme in the dashboard.
2. If the dashboard is unavailable, rename `atoc-bar-v2` through the host file manager or SSH so WordPress falls back to an installed theme.
3. Restore the database only if activation changed stored configuration that cannot be reversed normally.
4. Retain logs and the failed package for diagnosis; do not overwrite the backup.

## AI Mission Control Protection

- `D:\Projects\AI-Ops-Hub` is outside this deployment scope and must not be read, modified, packaged, or deployed.
- Do not reuse Mission Control runtime files, ports, secrets, workflows, or deployment paths.
- Verify deployment artifacts contain neither `AI-Ops-Hub` nor its known local service ports.

## Final Pre-Live Checklist

- [ ] Existing website working tree reviewed and preserved
- [ ] `npm ci` completed in CI
- [ ] `npm run build` passed
- [ ] Artifact scan passed
- [ ] PHP files linted in an environment with PHP CLI
- [ ] WordPress and active theme backups verified
- [ ] Required GitHub secrets configured
- [ ] `WP_THEME_REMOTE_PATH` confirmed as the themes parent directory
- [ ] Workflow remains `workflow_dispatch` only
- [ ] Upload confirmed to affect only `atoc-bar-v2`
- [ ] Staging or preview validation completed
- [ ] Production indexing decision completed; `VITE_ROBOTS_NOINDEX` is unset for public production
- [ ] `/sports` and `/events` return HTTP 200
- [ ] WordPress admin, login, REST API, uploads, and assets remain accessible
- [ ] Rollback owner and maintenance window approved
- [ ] Explicit authorization received for live deployment

**Live deployment was not performed during preparation.**
