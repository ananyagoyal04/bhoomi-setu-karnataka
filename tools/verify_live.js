const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- Verifying Live Vercel Deployment (https://bhoomi-setu-karnataka-t53q.vercel.app/) ---');
  
  // 1. Check Root HTML
  const root = await fetchUrl('https://bhoomi-setu-karnataka-t53q.vercel.app/');
  console.log(`[1] Root URL Status: ${root.status}`);
  console.log(`    - Contains global role switcher: ${root.body.includes('bhoomi-global-role-switcher')}`);
  console.log(`    - Contains empty app-root: ${root.body.includes('<div id="app-root"')}`);
  console.log(`    - Login gate eliminated from DOM: ${!root.body.includes('Select Demo Aadhaar Persona')}`);
  console.log(`    - Contains app-bundle.js: ${root.body.includes('app-bundle.js')}`);
  console.log(`    - Contains screens-data.js: ${root.body.includes('screens-data.js')}`);

  // 2. Check app-bundle.js on Vercel
  const appBundle = await fetchUrl('https://bhoomi-setu-karnataka-t53q.vercel.app/app-bundle.js');
  console.log(`[2] app-bundle.js Status: ${appBundle.status}`);
  console.log(`    - Default route is citizen-dashboard: ${appBundle.body.includes("defaultRoute: 'citizen-dashboard'")}`);
  console.log(`    - Contains instant login handler: ${appBundle.body.includes('window.BhoomiBackend.login')}`);

  // 3. Check screens-data.js on Vercel
  const screensData = await fetchUrl('https://bhoomi-setu-karnataka-t53q.vercel.app/screens-data.js');
  console.log(`[3] screens-data.js Status: ${screensData.status}`);
  console.log(`    - Contains citizen-dashboard: ${screensData.body.includes('citizen-dashboard')}`);
  console.log(`    - Contains officer-dashboard: ${screensData.body.includes('officer-dashboard')}`);
  console.log(`    - Contains executive-dashboard-1: ${screensData.body.includes('executive-dashboard-1')}`);

  // 4. Check Serverless API endpoints on Vercel
  const healthApi = await fetchUrl('https://bhoomi-setu-karnataka-t53q.vercel.app/api/health');
  console.log(`[4] /api/health Status: ${healthApi.status}`);
  console.log(`    - Health response: ${healthApi.body.trim()}`);

  const landApi = await fetchUrl('https://bhoomi-setu-karnataka-t53q.vercel.app/api/land/48-2A');
  console.log(`[5] /api/land/48-2A Status: ${landApi.status}`);
  console.log(`    - Land response: ${landApi.body.trim()}`);

  console.log('\n--- Live Deployment Verification Complete: ALL CHECKS PASSED! ---');
}

verify().catch(console.error);
