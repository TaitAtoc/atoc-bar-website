<?php
// SPA catch-all: React router handles unknown paths client-side.
// WordPress may return a 404 HTTP status for sub-routes (/about, /events, etc.)
// because no matching WordPress page exists. This template still renders the
// React root so navigation works. Create matching WordPress pages (or add a
// server rewrite rule) to return HTTP 200 for those paths before going live.
defined('ABSPATH') || exit;
get_header();
?>
<div id="root"></div>
<?php
get_footer();
