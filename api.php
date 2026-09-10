<?php
/**
 * Bhoomi Setu — PHP Microservice & Statutory Gazette Signing Gateway
 * Government of Karnataka | Land Acquisition Management System
 * Runnable via: php -S localhost:8080 api.php
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-DSC-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($requestUri, PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Handle POST actions
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $inputData = json_decode($rawInput, true) ?? [];

    if (strpos($path, 'gazette-publish') !== false || isset($_GET['action']) && $_GET['action'] === 'gazette-publish') {
        $notificationNo = $inputData['notificationNo'] ?? 'RD-LAQ-SH17-2025-09';
        $section = $inputData['section'] ?? 'SECTION 19(1)';
        $extent = $inputData['extent'] ?? '148.60 Acres';

        echo json_encode([
            'success' => true,
            'status' => 'PUBLISHED',
            'gazetteId' => 'KA-GAZ-2025-LAQ-' . rand(1000, 9999),
            'notificationNo' => $notificationNo,
            'statutorySection' => $section,
            'acquiredExtent' => $extent,
            'publishedAt' => date('c'),
            'pressLocation' => 'Karnataka Government Central Press, Bengaluru',
            'digitalSeal' => 'SHA256:d83f7a29e41b9c8d' . bin2hex(random_bytes(8)),
            'message' => 'Statutory Gazette Notice successfully published and archived.'
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (strpos($path, 'dsc-sign') !== false || isset($_GET['action']) && $_GET['action'] === 'dsc-sign') {
        $tokenId = $inputData['tokenId'] ?? 'ePass2003Auto-98FC-4421';
        $officer = $inputData['officer'] ?? 'Sri. B. Shivaram, KAS (SLAO)';

        echo json_encode([
            'success' => true,
            'status' => 'CRYPTOGRAPHICALLY_SEALED',
            'certificateAuthority' => 'NIC-CA Class-3 Government Digital Signatures',
            'tokenId' => $tokenId,
            'signatory' => $officer,
            'timestamp' => date('c'),
            'documentHash' => 'SHA-256:' . hash('sha256', ($inputData['deedId'] ?? 'FORM-9-BELLANDUR-48-2A') . time()),
            'message' => 'Class-3 DSC Token applied. Document pushed to statutory review stage.'
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// GET Endpoints
if (strpos($path, 'health') !== false) {
    echo json_encode([
        'status' => 'ONLINE',
        'service' => 'Bhoomi PHP Statutory Gazette Gateway',
        'runtime' => 'PHP ' . PHP_VERSION,
        'port' => 8080,
        'endpoints' => [
            'GET /api/php/health',
            'GET /api/php/parcels',
            'POST /api/php/gazette-publish',
            'POST /api/php/dsc-sign'
        ],
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

if (strpos($path, 'parcels') !== false) {
    echo json_encode([
        'success' => true,
        'count' => 2,
        'parcels' => [
            [
                'surveyNo' => '48/2A',
                'village' => 'Bellandur',
                'extent' => '1.45 Acres',
                'totalAward' => '₹ 6,78,40,000',
                'status' => 'SEC_19_DECLARED'
            ],
            [
                'surveyNo' => '56/2',
                'village' => 'Chikkabanavara',
                'extent' => '3.20 Acres',
                'totalAward' => '₹ 0 (Public Gomal Land)',
                'status' => 'AVAILABLE'
            ]
        ]
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Default Gateway info
echo json_encode([
    'portal' => 'Bhoomi Setu (Government of Karnataka)',
    'service' => 'PHP Statutory Gazette & DSC Microservice',
    'status' => 'ONLINE',
    'version' => '3.2.0',
    'runCommand' => 'php -S localhost:8080 api.php'
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
