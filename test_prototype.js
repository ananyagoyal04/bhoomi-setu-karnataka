const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

async function runTests() {
  console.log('🧪 Starting Bhoomi Setu Plain-English & Frames Verification Suite...');
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

  // 1. Test screens-data.js file integrity
  const screensDataPath = path.join(__dirname, 'screens-data.js');
  assert(fs.existsSync(screensDataPath), 'screens-data.js exists');

  const screensDataContent = fs.readFileSync(screensDataPath, 'utf8');
  assert(screensDataContent.includes('window.BHOOMI_SCREENS = ['), 'screens-data.js defines window.BHOOMI_SCREENS');

  // Evaluate in a VM context
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(screensDataContent, sandbox);

  const screens = sandbox.window.BHOOMI_SCREENS;
  assert(Array.isArray(screens), 'screens is an array');
  assert(screens.length === 32, `Exactly 32 screens loaded (actual: ${screens.length})`);

  // 2. Validate all modules exist
  const filesToCheck = [
    'backend-api.js',
    'data-store.js',
    'page-guide.js',
    'frames-engine.js',
    'map-engine.js',
    'simulations.js',
    'modals.js',
    'interactions.js',
    'prototype-nav.js',
    'router.js',
    'index.html',
    'server.js'
  ];

  filesToCheck.forEach(file => {
    assert(fs.existsSync(path.join(__dirname, file)), `File "${file}" exists`);
  });

  // 3. Test HTTP Server endpoints
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
    assert(indexRes.body.includes('leaflet.js'), 'index.html includes Leaflet JS');
    assert(indexRes.body.includes('backend-api.js'), 'index.html loads backend-api.js');
    assert(indexRes.body.includes('page-guide.js'), 'index.html loads page-guide.js');
    assert(indexRes.body.includes('frames-engine.js'), 'index.html loads frames-engine.js');
    assert(indexRes.body.includes('map-engine.js'), 'index.html loads map-engine.js');
    assert(indexRes.body.includes('simulations.js'), 'index.html loads simulations.js');
    assert(indexRes.body.includes('modals.js'), 'index.html loads modals.js');

    const pgRes = await fetchUrl('/page-guide.js');
    assert(pgRes.status === 200, 'GET /page-guide.js returns 200 OK');
    assert(pgRes.body.includes('class PageGuide'), 'page-guide.js contains PageGuide');

    const frRes = await fetchUrl('/frames-engine.js');
    assert(frRes.status === 200, 'GET /frames-engine.js returns 200 OK');
    assert(frRes.body.includes('class FramesEngine'), 'frames-engine.js contains FramesEngine');
  } catch (err) {
    assert(false, `HTTP Server test failed: ${err.message}`);
  }

  console.log(`\n==============================================`);
  console.log(`Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`==============================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
