<?php
defined('ABSPATH') || exit;

$atoc_meta = atoc_bar_v2_current_meta();
$atoc_canonical = atoc_bar_v2_canonical_url();
$atoc_schema = atoc_bar_v2_local_business_schema();

ob_start();
wp_head();
$atoc_wp_head = ob_get_clean();
$atoc_wp_head = preg_replace('#<title\b[^>]*>.*?</title>\s*#is', '', $atoc_wp_head);
$atoc_wp_head = preg_replace(
    '#<meta\b(?=[^>]*(?:name|property)=["\'](?:description|robots|og:[^"\']+|twitter:[^"\']+)["\'])[^>]*>\s*#i',
    '',
    $atoc_wp_head
);
$atoc_wp_head = preg_replace(
    '#<link\b(?=[^>]*rel=["\']canonical["\'])[^>]*>\s*#i',
    '',
    $atoc_wp_head
);
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo esc_html($atoc_meta['title']); ?></title>
  <meta name="description" content="<?php echo esc_attr($atoc_meta['description']); ?>">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="<?php echo esc_url($atoc_canonical); ?>">
  <meta property="og:site_name" content="ATOC BAR">
  <meta property="og:type" content="website">
  <meta property="og:title" content="<?php echo esc_attr($atoc_meta['title']); ?>">
  <meta property="og:description" content="<?php echo esc_attr($atoc_meta['description']); ?>">
  <meta property="og:url" content="<?php echo esc_url($atoc_canonical); ?>">
  <meta property="og:image" content="<?php echo esc_url(ATOC_BAR_V2_SOCIAL_IMAGE); ?>">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?php echo esc_attr($atoc_meta['title']); ?>">
  <meta name="twitter:description" content="<?php echo esc_attr($atoc_meta['description']); ?>">
  <meta name="twitter:image" content="<?php echo esc_url(ATOC_BAR_V2_SOCIAL_IMAGE); ?>">
  <script type="application/ld+json"><?php echo wp_json_encode($atoc_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE); ?></script>
  <?php echo $atoc_wp_head; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</head>
<body <?php body_class('atoc-bar-v2'); ?>>
<?php wp_body_open(); ?>
<div id="root">
  <main class="atoc-server-fallback">
    <h1><?php echo esc_html($atoc_meta['h1']); ?></h1>
    <p><?php echo esc_html($atoc_meta['description']); ?></p>
    <nav aria-label="ATOC BAR pages">
      <?php foreach (atoc_bar_v2_route_meta() as $route => $route_meta) : ?>
        <a href="<?php echo esc_url(ATOC_BAR_V2_CANONICAL_ORIGIN . ($route === '/' ? '/' : $route)); ?>">
          <?php echo esc_html($route_meta['h1']); ?>
        </a>
      <?php endforeach; ?>
    </nav>
  </main>
</div>
<?php wp_footer(); ?>
</body>
</html>
