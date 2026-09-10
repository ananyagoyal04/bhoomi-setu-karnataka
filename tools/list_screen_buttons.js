const fs = require('fs');
const path = require('path');
const vm = require('vm');

const content = fs.readFileSync(path.join(__dirname, '..', 'screens-data.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(content, sandbox);

const screens = sandbox.window.BHOOMI_SCREENS;

screens.forEach(s => {
  console.log(`\n========================================`);
  console.log(`SCREEN: ${s.id} (${s.title})`);
  console.log(`========================================`);
  const html = s.html || '';
  
  // Find all buttons
  const buttons = [...html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)];
  buttons.forEach(b => {
    const tag = b[0];
    const inner = b[1].replace(/<[^>]+>/g, '').trim();
    if (inner && inner.length < 50) {
      console.log(`  [BUTTON] "${inner}" -> Tag: ${tag.slice(0, 100)}...`);
    }
  });

  // Find all links
  const links = [...html.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)];
  links.forEach(a => {
    const tag = a[0];
    const inner = a[1].replace(/<[^>]+>/g, '').trim();
    if (inner && inner.length < 50) {
      console.log(`  [LINK] "${inner}" -> Tag: ${tag.slice(0, 100)}...`);
    }
  });
});
