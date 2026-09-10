// Bhoomi Setu — Enterprise Node.js & REST API Gateway Server
// Government of Karnataka | Land Acquisition & Statutory Revenue System
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

// In-Memory & File Database Store
let DB_STORE = {
  stats: {
    totalAcquisitionHa: 1420.5,
    disbursedCrores: 4820.4,
    pendingEscrowCrores: 1174.2,
    activeLitigations: 2,
    projectsTracked: 2,
    syncTimestamp: new Date().toISOString()
  },
  auditLogs: [
    { id: 1, timestamp: new Date().toISOString(), action: "SYSTEM_INITIALIZED", user: "SYSTEM_DAEMON", ip: "127.0.0.1" }
  ]
};

const requestHandler = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let reqPath = parsedUrl.pathname;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-DSC-Token');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ==========================================
  // 🚀 REST API Endpoints (Node.js Engine)
  // ==========================================
  if (reqPath.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 1. System Health & Metadata
    if (reqPath === '/api/health' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: "ONLINE",
        portal: "Bhoomi Setu (Government of Karnataka)",
        version: "3.2.0-PROD",
        engine: "Node.js / V8 + SQLite & GIS Leaflet",
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
      }, null, 2));
      return;
    }

    // 2. Telemetry & Macro Statistics
    if (reqPath === '/api/stats' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: DB_STORE.stats }));
      return;
    }

    // 3. Aadhaar 3-Role Demo Authentication
    if (reqPath === '/api/auth/aadhaar-login' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const aadhaar = (payload.aadhaar || '').replace(/[\s-]/g, '');
          
          let userProfile = null;
          if (aadhaar.includes('4819') || payload.role === 'citizen') {
            userProfile = { role: 'citizen', name: 'Sri. Rajesh Kumar', aadhaar: '5489-1204-4819', primarySurveyNo: '48/2A' };
          } else if (aadhaar.includes('0894') || payload.role === 'officer') {
            userProfile = { role: 'officer', name: 'Sri. B. Shivaram, KAS', dscToken: 'ePass2003Auto-98FC-4421' };
          } else {
            userProfile = { role: 'executive', name: 'Chief Secretary', department: 'Cabinet Secretariat' };
          }

          DB_STORE.auditLogs.unshift({
            id: DB_STORE.auditLogs.length + 1,
            timestamp: new Date().toISOString(),
            action: `AADHAAR_AUTH_SUCCESS:${userProfile.role.toUpperCase()}`,
            user: userProfile.name,
            ip: req.socket.remoteAddress || '127.0.0.1'
          });

          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token: `BHOOMI_JWT_${Buffer.from(JSON.stringify(userProfile)).toString('base64')}`,
            user: userProfile
          }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: "Invalid JSON Payload" }));
        }
      });
      return;
    }

    // 4. Audit Log
    if (reqPath === '/api/audit-logs' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, count: DB_STORE.auditLogs.length, logs: DB_STORE.auditLogs }));
      return;
    }

    // 404 for unknown API routes
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: `API route ${reqPath} not found` }));
    return;
  }

  // ==========================================
  // 🌐 Static Files Delivery
  // ==========================================
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'stitch_bhoomi_setu_land_portal', safePath);
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
};

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🏛️  Bhoomi Setu (ಭೂಮಿ ಸೇತು) Multi-Tier Server Running`);
    console.log(`🌐 Local URL: http://localhost:${PORT}`);
    console.log(`🚀 REST API: http://localhost:${PORT}/api/health`);
    console.log(`📱 32 Interactive UI Screens with 2 Clean Demo Records`);
    console.log(`=======================================================`);
  });
}

module.exports = requestHandler;
