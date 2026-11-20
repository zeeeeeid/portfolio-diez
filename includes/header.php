<?php
// includes/header.php - PHP Header Component
if (!isset($PORTFOLIO_CONFIG)) {
    require_once __DIR__ . '/../config.php';
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="<?php echo htmlspecialchars($PORTFOLIO_CONFIG['theme_default']); ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($PORTFOLIO_CONFIG['title']); ?></title>
  
  <meta name="description" content="Front-end creative developer portfolio built with React, PHP, CSS3, and HTML5. Playful pink and black theme with animations and interactive media gallery.">
  <meta name="theme-color" content="<?php echo htmlspecialchars($PORTFOLIO_CONFIG['accent_color']); ?>">
  
  <!-- Favicon (Inline SVG Pink Dot) -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23ff2d75'/><circle cx='50' cy='50' r='20' fill='%23ffffff'/></svg>">
  
  <!-- CSS Stylesheet -->
  <link rel="stylesheet" href="assets/css/style.css">

  <!-- React 18 and Babel Standalone for Seamless Front-End Execution -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <!-- Confetti Canvas -->
  <canvas id="confetti-canvas"></canvas>

