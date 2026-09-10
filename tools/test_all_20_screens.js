const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.join(__dirname, '..');
const screensData = fs.readFileSync(path.join(rootDir, 'screens-data.js'), 'utf8');
const dataStore = fs.readFileSync(path.join(rootDir, 'data-store.js'), 'utf8');
const appBundle = fs.readFileSync(path.join(rootDir, 'app-bundle.js'), 'utf8');

// Simulated Browser DOM & Window Context
const dom = {
  innerHTML: '',
  title: '',
  className: '',
  style: {},
  classList: { add: () => {}, remove: () => {}, toggle: () => false },
  setAttribute: () => {},
  getAttribute: () => null,
  querySelectorAll: () => [],
  querySelector: () => null,
  getElementById: function(id) {
    if (id === 'app-root') return this;
    if (id === 'bhoomi-toast-container') return { appendChild: () => {} };
    return null;
  },
  createElement: function(tag) {
    return {
      id: '', className: '', style: {}, innerHTML: '',
      appendChild: () => {}, remove: () => {},
      classList: { add: () => {}, remove: () => {} },
      setAttribute: () => {}, getAttribute: () => null
    };
  },
  body: { className: '', appendChild: () => {} },
  documentElement: { classList: { add: () => {}, remove: () => {}, toggle: () => false } },
  addEventListener: () => {}
};

const windowObj = {
  document: dom,
  location: { hash: '', hostname: 'localhost' },
  localStorage: { getItem: () => null, setItem: () => {} },
  addEventListener: () => {},
  scrollTo: () => {},
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
};
windowObj.window = windowObj;

const ctx = vm.createContext(windowObj);
vm.runInContext(dataStore, ctx);
vm.runInContext(screensData, ctx);
vm.runInContext(appBundle, ctx);

console.log('=== Verifying All 20 Screens End-to-End ===');

let passCount = 0;
let failCount = 0;

const screenList = windowObj.BHOOMI_SCREENS;

screenList.forEach((screen, index) => {
  try {
    windowObj.BhoomiRouter.navigate(screen.id);
    const renderedRoute = windowObj.BhoomiRouter.currentRoute;
    const renderedHtml = dom.innerHTML;

    if (renderedRoute === screen.id && renderedHtml.length > 50) {
      console.log(`✅ [${index + 1}/20] Rendered "${screen.id}" successfully (${renderedHtml.length} chars)`);
      passCount++;
    } else {
      console.error(`❌ [${index + 1}/20] Failed to render "${screen.id}". Rendered: ${renderedRoute}`);
      failCount++;
    }
  } catch (err) {
    console.error(`❌ [${index + 1}/20] Error rendering "${screen.id}":`, err.message);
    failCount++;
  }
});

console.log(`\nResults: ${passCount} Passed, ${failCount} Failed.`);

if (failCount > 0) {
  process.exit(1);
}
