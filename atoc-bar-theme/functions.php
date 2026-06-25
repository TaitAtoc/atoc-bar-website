<?php
defined('ABSPATH') || exit;

define('ATOC_THEME_VERSION', '1.0.0');

// ------------------------------------------------------------------
// Theme supports
// ------------------------------------------------------------------
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('html5', ['comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
});

// ------------------------------------------------------------------
// Enqueue compiled app stylesheet; remove unused WordPress defaults
// ------------------------------------------------------------------
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_script('jquery');
    wp_dequeue_script('wp-embed');
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('classic-theme-styles');
    wp_dequeue_style('global-styles');

    wp_enqueue_style(
        'atoc-app',
        get_template_directory_uri() . '/assets/css/app.css',
        [],
        ATOC_THEME_VERSION
    );
}, 100);

// ------------------------------------------------------------------
// Inject compiled React app as an ES module before </body>
// ------------------------------------------------------------------
add_action('wp_footer', function () {
    $src = esc_url(get_template_directory_uri() . '/assets/js/app.js?v=' . ATOC_THEME_VERSION);
    echo '<script type="module" src="' . $src . '"></script>' . "\n";
}, 20);

// ------------------------------------------------------------------
// Remove unnecessary WordPress head noise
// ------------------------------------------------------------------
add_action('init', function () {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_resource_hints', 2);
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
});
