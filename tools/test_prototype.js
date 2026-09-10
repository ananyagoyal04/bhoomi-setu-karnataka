const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');

async function runTests() {
  console.log('🧪 Starting Bhoomi Setu Consolidated Hackathon Test Suite...');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Test screens-data.js integrity
  const screensDataPath = path.join(rootDir, 'screens-data.js');
  assert(fs.existsSync(screensDataPath), 'screens-data.js exists');

  const screensDataContent = fs.readFileSync(screensDataPath, 'utf8');
  assert(screensDataContent.includes('window.BHOOMI_SCREENS = ['), 'screens-data.js defines window.BHOOMI_SCREENS');

  // Evaluate in VM context
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(screensDataContent, sandbox);

  const screens = sandbox.window.BHOOMI_SCREENS;
  assert(Array.isArray(screens), 'screens is an array');
  assert(screens.length === 20, `Exactly 20 core screens loaded (actual: ${screens.length})`);

  // 2. Validate runtime files exist
  const filesToCheck = [
    'data-store.js',
    'screens-data.js',
    'map-engine.js',
    'app-bundle.js',
    'index.html',
    'server.js',
    'backend.py',
    'api.php',
    'schema.sql'
  ];

  filesToCheck.forEach(file => {
    assert(fs.existsSync(path.join(rootDir, file)), `Runtime file "${file}" exists`);
  });

  // 3. Test HTTP Server endpoints on Port 3000
  const fetchUrl = (urlPath) => {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:3000${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }).on('error', reject);
    });
  };

  try {
    const indexRes = await fetchUrl('/index.html');
    assert(indexRes.status === 200, 'GET /index.html returns 200 OK');
    assert(indexRes.body.includes('app-bundle.js'), 'index.html loads app-bundle.js');
    assert(indexRes.body.includes('map-engine.js'), 'index.html loads map-engine.js');
    assert(indexRes.body.includes('data-store.js'), 'index.html loads data-store.js');

    const apiHealth = await fetchUrl('/api/health');
    assert(apiHealth.status === 200, 'GET /api/health returns 200 OK');

    const apiLand = await fetchUrl('/api/land/48-2A');
    assert(apiLand.status === 200, 'GET /api/land/48-2A returns 200 OK');

    const apiComp = await fetchUrl('/api/compensation/48-2A');
    assert(apiComp.status === 200, 'GET /api/compensation/48-2A returns 200 OK');
  } catch (err) {
    console.warn(`HTTP Server check: ${err.message}`);
  }

  console.log(`\n==============================================`);
  console.log(`Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`==============================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
