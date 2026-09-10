// Bhoomi Setu — Node.js REST API & Prototype Web Server
// Government of Karnataka | Revenue Department Land Acquisition Portal
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'bhoomi_db.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {}
  return { parcels: {}, objections: [] };
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

const requestHandler = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const reqPath = parsedUrl.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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
    const apiRoute = reqPath.replace(/\.js$/, '');

    // 1. Health
    if (apiRoute === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: "ONLINE",
        portal: "Bhoomi Setu (Government of Karnataka)",
        version: "3.2.0-PROD",
        engine: "Node.js REST API + JSON/SQLite Database",
        timestamp: new Date().toISOString()
      }, null, 2));
      return;
    }

    // 2. Stats
    if (apiRoute === '/api/stats') {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        data: {
          totalAcquisitionHa: 1420.5,
          disbursedCrores: 4820.4,
          pendingEscrowCrores: 1174.2,
          parcelsTracked: 348,
          activeMetroStations: 13
        }
      }));
      return;
    }

    // 3. GET /api/land/:surveyNo
    const landMatch = apiRoute.match(/^\/api\/land\/([^/]+)/);
    if (landMatch && req.method === 'GET') {
      const sKey = decodeURIComponent(landMatch[1]).replace('/', '-');
      const db = readDb();
      const parcel = db.parcels[sKey] || db.parcels['48-2A'];
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, parcel }));
      return;
    }

    // 4. GET /api/compensation/:surveyNo
    const compMatch = apiRoute.match(/^\/api\/compensation\/([^/]+)/);
    if (compMatch && req.method === 'GET') {
      const sKey = decodeURIComponent(compMatch[1]).replace('/', '-');
      const db = readDb();
      const parcel = db.parcels[sKey] || db.parcels['48-2A'];
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        surveyNo: parcel.surveyNo,
        guidanceValue: parcel.guidanceValue,
        solatium100: parcel.solatium100,
        interest12Pct: parcel.interest12Pct,
        totalAward: parcel.totalAward,
        pfmsRef: parcel.pfmsRef,
        pfmsStatus: parcel.pfmsStatus
      }));
      return;
    }

    // 5. POST /api/objection
    if (apiRoute === '/api/objection' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          const db = readDb();
          const newObj = {
            id: `OBJ-${Date.now().toString().slice(-4)}`,
            surveyNo: payload.surveyNo || '48/2A',
            claimant: payload.claimant || 'Sri. Rajesh Kumar',
            objectionType: payload.objectionType || 'Valuation Rectification',
            demandedExtra: payload.demandedExtra || 1850000,
            status: 'SCHEDULED_FOR_HEARING',
            createdAt: new Date().toISOString()
          };
          db.objections.push(newObj);
          writeDb(db);
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Section 15(1) Objection Registered in Gazette Docket', objection: newObj }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // Default API 404
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, error: `API route ${reqPath} not found` }));
    return;
  }

  // ==========================================
  // 🌐 Static Files & SPA Routing Fallback
  // ==========================================
  let normalizedPath = reqPath === '/' || reqPath === '' ? '/index.html' : reqPath;
  const safePath = path.normalize(normalizedPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const stitchPath = path.join(__dirname, 'stitch_bhoomi_setu_land_portal', safePath);
    if (fs.existsSync(stitchPath) && fs.statSync(stitchPath).isFile()) {
      filePath = stitchPath;
    } else {
      filePath = path.join(__dirname, 'index.html');
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(__dirname, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/html; charset=utf-8';

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
    console.log(`🏛️  Bhoomi Setu (ಭೂಮಿ ಸೇತು) Node.js Server Running`);
    console.log(`🌐 Local Web: http://localhost:${PORT}`);
    console.log(`🚀 REST API:  http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
}

module.exports = requestHandler;
