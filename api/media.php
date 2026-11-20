<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Directory for media uploads / assets
$mediaDir = __DIR__ . '/../assets/media/';

$files = [];

if (is_dir($mediaDir)) {
    $scanned = scandir($mediaDir);
    foreach ($scanned as $file) {
        if ($file === '.' || $file === '..' || $file === 'README.txt') continue;
        
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        $type = in_array($ext, ['mp4', 'webm', 'ogg', 'mov']) ? 'video' : 'image';
        
        $files[] = [
            'id' => md5($file),
            'title' => ucwords(str_replace(['-', '_'], ' ', pathinfo($file, PATHINFO_FILENAME))),
            'filename' => $file,
            'url' => 'assets/media/' . $file,
            'type' => $type,
            'extension' => $ext,
            'size' => filesize($mediaDir . $file)
        ];
    }
}

echo json_encode([
    'status' => 'success',
    'count' => count($files),
    'media' => $files
]);

