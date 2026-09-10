<?php
/**
 * Bhoomi Setu — PHP REST API Gateway
 * Government of Karnataka | Land Acquisition Management System
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

$demoData = [
    'portal' => 'Bhoomi Setu (Government of Karnataka)',
    'version' => '3.2.0-PHP',
    'status' => 'ONLINE',
    'demoUsers' => [
        'citizen' => [
            'name' => 'Sri. Rajesh Kumar',
            'aadhaar' => '5489-1204-4819',
            'surveyNo' => '48/2A',
            'village' => 'Bellandur',
            'totalAward' => '₹ 6,78,40,000'
        ],
        'officer' => [
            'name' => 'Sri. B. Shivaram, KAS',
            'aadhaar' => '8921-4421-0894',
            'designation' => 'Special Land Acquisition Officer (SLAO)'
        ],
        'executive' => [
            'name' => 'Chief Secretary',
            'aadhaar' => '1102-9934-0001',
            'department' => 'Cabinet Secretariat'
        ]
    ],
    'parcels' => [
        [
            'surveyNo' => '48/2A',
            'village' => 'Bellandur',
            'extent' => '1.45 Acres',
            'award' => '₹ 6,78,40,000',
            'stage' => 'Section 19(1) Final Declaration Published'
        ],
        [
            'surveyNo' => '56/2',
            'village' => 'Chikkabanavara',
            'extent' => '3.20 Acres',
            'award' => '₹ 0 (Public Gomal Land)',
            'stage' => 'Available for Civic Allotment'
        ]
    ]
];

if (strpos($path, '/api/php/health') !== false) {
    echo json_encode([
        'success' => true,
        'runtime' => 'PHP ' . PHP_VERSION,
        'status' => 'ONLINE',
        'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Bhoomi PHP Microservice',
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

if (strpos($path, '/api/php/parcels') !== false) {
    echo json_encode([
        'success' => true,
        'count' => count($demoData['parcels']),
        'parcels' => $demoData['parcels']
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

if (strpos($path, '/api/php/users') !== false) {
    echo json_encode([
        'success' => true,
        'users' => $demoData['demoUsers']
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Default response
echo json_encode($demoData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
