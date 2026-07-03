<?php
defined('ABSPATH') || exit;

define('ATOC_BAR_V2_VERSION', '2.0.0');
define('ATOC_BAR_V2_CANONICAL_ORIGIN', 'https://www.atocbar.com');
define(
    'ATOC_BAR_V2_SOCIAL_IMAGE',
    ATOC_BAR_V2_CANONICAL_ORIGIN . '/wp-content/themes/atoc-bar-v2/assets/legacy/front-entrance.jpg'
);

function atoc_bar_v2_request_path() {
    $path = wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    $path = '/' . trim((string) $path, '/');
    return $path === '/' ? '/' : untrailingslashit($path);
}

function atoc_bar_v2_route_meta() {
    return [
        '/' => [
            'title' => 'ATOC Bar | Guangzhou Bar, Sports & Nightlife',
            'description' => 'ATOC BAR is a Guangzhou bar for live sports, drinks, international-friendly nights, group bookings, and relaxed nightlife.',
            'h1' => 'ATOC Bar Guangzhou',
        ],
        '/about' => [
            'title' => 'About ATOC | Expat & International Bar in Guangzhou',
            'description' => 'Learn about ATOC BAR, an international-friendly Guangzhou bar with sports nights, casual drinks, a social crowd, and indoor-outdoor atmosphere.',
            'h1' => 'An International Bar in Guangzhou',
        ],
        '/sports' => [
            'title' => 'Events at ATOC | Live Sports Bar in Guangzhou',
            'description' => 'Watch rugby, football, Formula 1, basketball, MMA, and other live sports at ATOC BAR in Guangzhou. Ask what is on this week before visiting.',
            'h1' => 'Live Sports in Guangzhou',
        ],
        '/menus' => [
            'title' => 'ATOC Menus | Cocktails, Beer & Match-Night Drinks',
            'description' => 'Browse ATOC BAR drinks and menu categories, including beer, cocktails, shooters, coffee, tea, and shisha in Guangzhou.',
            'h1' => 'Drinks and Menus at ATOC',
        ],
        '/promotions' => [
            'title' => 'ATOC Promotions | Happy Hour & Bar Offers in Guangzhou',
            'description' => 'See ATOC BAR happy hour, bar promotions, sports-night offers, and special nights in Guangzhou.',
            'h1' => 'ATOC Promotions',
        ],
        '/gallery' => [
            'title' => 'ATOC Gallery | Guangzhou Bar Photos & Atmosphere',
            'description' => 'View ATOC BAR photos, terrace images, sports-screen atmosphere, and venue highlights from Guangzhou.',
            'h1' => 'ATOC Bar Photos',
        ],
        '/bookings' => [
            'title' => 'Book ATOC | Private Party Bar & Group Bookings Guangzhou',
            'description' => 'Book ATOC BAR for private events, group drinks, sports watch parties, birthdays, company nights, and casual table bookings in Guangzhou.',
            'h1' => 'Book a Bar Table or Private Event in Guangzhou',
        ],
        '/contact' => [
            'title' => 'Contact ATOC | Guangzhou Bar Address, Hours & Bookings',
            'description' => 'Contact ATOC BAR for its Guangzhou address, opening hours, map directions, phone, WeChat, bookings, and event enquiries.',
            'h1' => 'Find ATOC in Guangzhou',
        ],
    ];
}

function atoc_bar_v2_current_meta() {
    $routes = atoc_bar_v2_route_meta();
    $path = atoc_bar_v2_request_path();
    return $routes[$path] ?? $routes['/'];
}

function atoc_bar_v2_canonical_url() {
    $path = atoc_bar_v2_request_path();
    return ATOC_BAR_V2_CANONICAL_ORIGIN . ($path === '/' ? '/' : $path);
}

function atoc_bar_v2_is_https_request() {
    if (is_ssl()) {
        return true;
    }

    $forwarded_proto = strtolower((string) ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? ''));
    return strpos($forwarded_proto, 'https') !== false;
}

function atoc_bar_v2_local_business_schema() {
    return [
        '@context' => 'https://schema.org',
        '@type' => 'BarOrPub',
        '@id' => ATOC_BAR_V2_CANONICAL_ORIGIN . '/#bar',
        'name' => 'ATOC BAR',
        'url' => ATOC_BAR_V2_CANONICAL_ORIGIN . '/',
        'image' => ATOC_BAR_V2_SOCIAL_IMAGE,
        'telephone' => '+8615705867448',
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => '2-107 Huaxun St',
            'addressLocality' => 'Guangzhou',
            'addressRegion' => 'Guangdong',
            'addressCountry' => 'CN',
        ],
        'openingHours' => 'Mo-Su 17:00-03:00',
    ];
}

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

    $request_path = atoc_bar_v2_request_path();
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $host = preg_replace('/:\d+$/', '', $host);

    if ($host !== 'www.atocbar.com' || !atoc_bar_v2_is_https_request()) {
        $query = (string) wp_parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_QUERY);
        $destination = ATOC_BAR_V2_CANONICAL_ORIGIN . ($request_path === '/' ? '/' : $request_path);
        if ($query !== '') {
            $destination .= '?' . $query;
        }
        wp_redirect($destination, 301, 'ATOC canonical host');
        exit;
    }

    if ($request_path === '/events') {
        wp_redirect(ATOC_BAR_V2_CANONICAL_ORIGIN . '/sports', 301, 'ATOC route consolidation');
        exit;
    }

    if ($request_path === '/sitemap.xml') {
        status_header(200);
        header('Content-Type: application/xml; charset=UTF-8');
        header('X-Robots-Tag: noindex, follow', true);

        $urls = array_keys(atoc_bar_v2_route_meta());
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $route) {
            $url = ATOC_BAR_V2_CANONICAL_ORIGIN . ($route === '/' ? '/' : $route);
            echo '  <url><loc>' . esc_url($url) . '</loc></url>' . "\n";
        }
        echo '</urlset>';
        exit;
    }

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
}, -100);

add_filter('robots_txt', function () {
    return "User-agent: *\nAllow: /\n\nSitemap: " . ATOC_BAR_V2_CANONICAL_ORIGIN . "/sitemap.xml\n";
}, 999);

add_filter('pre_get_document_title', function ($title) {
    $routes = atoc_bar_v2_route_meta();
    $path = atoc_bar_v2_request_path();
    return isset($routes[$path]) ? $routes[$path]['title'] : $title;
}, 999);
