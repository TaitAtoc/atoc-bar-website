<?php
defined('ABSPATH') || exit;

define('ATOC_BAR_V2_VERSION', '2.0.0');

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('html5', ['style', 'script']);
});

add_action('wp_enqueue_scripts', function () {
    $manifest_path = get_template_directory() . '/.vite/manifest.json';

    if (!is_readable($manifest_path)) {
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);
    $entry = null;
    foreach ($manifest as $candidate) {
        if (!empty($candidate['isEntry'])) {
            $entry = $candidate;
            break;
        }
    }

    if (!$entry || empty($entry['file'])) {
        return;
    }

    foreach (($entry['css'] ?? []) as $index => $stylesheet) {
        wp_enqueue_style(
            'atoc-bar-v2-' . $index,
            get_template_directory_uri() . '/' . ltrim($stylesheet, '/'),
            [],
            ATOC_BAR_V2_VERSION
        );
    }

    wp_enqueue_script(
        'atoc-bar-v2-app',
        get_template_directory_uri() . '/' . ltrim($entry['file'], '/'),
        [],
        ATOC_BAR_V2_VERSION,
        true
    );
});

add_filter('script_loader_tag', function ($tag, $handle) {
    if ($handle !== 'atoc-bar-v2-app') {
        return $tag;
    }

    $tag = preg_replace('/\s+type=(["\']).*?\1/', '', $tag);
    return str_replace('<script ', '<script type="module" ', $tag);
}, 10, 2);

add_action('template_redirect', function () {
    if (is_admin()) {
        return;
    }

    $request_path = wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    $request_path = '/' . trim((string) $request_path, '/');
    $request_path = $request_path === '/' ? '/' : untrailingslashit($request_path);

    $protected_prefixes = [
        '/wp-admin',
        '/wp-login.php',
        '/wp-json',
        '/wp-content/uploads',
        '/wp-content/themes',
        '/wp-content/plugins',
        '/assets',
    ];

    foreach ($protected_prefixes as $prefix) {
        if ($request_path === $prefix || strpos($request_path, $prefix . '/') === 0) {
            return;
        }
    }

    $react_routes = [
        '/',
        '/about',
        '/sports',
        '/events',
        '/menus',
        '/promotions',
        '/gallery',
        '/bookings',
        '/contact',
    ];

    if (!in_array($request_path, $react_routes, true)) {
        return;
    }

    status_header(200);
    nocache_headers();
    include get_template_directory() . '/index.php';
    exit;
}, 0);
