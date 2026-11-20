<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? 'Portfolio Inquiry');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide your name, email, and a message!'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid email address!'
    ]);
    exit;
}

// Log message to a local file for record keeping
$logFile = __DIR__ . '/messages.log';
$logEntry = date('Y-m-d H:i:s') . " | {$name} ({$email}) | Subj: {$subject} | Msg: {$message}\n";
@file_put_contents($logFile, $logEntry, FILE_APPEND);

echo json_encode([
    'status' => 'success',
    'message' => "Thank you {$name}! Your message was received by Ailyn Diez. I'll get back to you soon.",
    'timestamp' => date('c')
]);

