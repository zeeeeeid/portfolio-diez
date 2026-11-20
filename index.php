<?php
// ===================================================================
// AILYN DIEZ // PORTFOLIO (PHP ENTRY POINT)
// React, PHP, CSS3, and HTML5 Front-End Portfolio
// ===================================================================

$PORTFOLIO_TITLE = 'Ailyn Diez | Portfolio';
$ACCENT_COLOR = '#ff2d75';
$THEME_DEFAULT = 'dark';

// Read and serve the portfolio HTML
$htmlPath = __DIR__ . '/index.html';
if (file_exists($htmlPath)) {
    include $htmlPath;
} else {
    echo "<h1>Portfolio index.html not found.</h1>";
}
?>
