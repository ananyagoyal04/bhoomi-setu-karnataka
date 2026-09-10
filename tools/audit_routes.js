const fs = require('fs');
const path = require('path');
const vm = require('vm');

const content = fs.readFileSync(path.join(__dirname, '..', 'screens-data.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(content, sandbox);

const screens = sandbox.window.BHOOMI_SCREENS;
const screenIds = new Set(screens.map(s => s.id));

console.log('=== Registered Screen IDs (20 Total) ===');
screens.forEach((s, idx) => console.log(`${idx}: ${s.id}`));

const allNavTargets = {};
const unmappedTargets = new Set();

screens.forEach(s => {
  const html = s.html || '';
  const tags = html.match(/<(?:a|button)\s+[^>]*>/gi) || [];
  
  tags.forEach(tag => {
    const dataRouteMatch = tag.match(/data-route=["']([^"']+)["']/i);
    const dataPathMatch = tag.match(/data-path=["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    const onclickMatch = tag.match(/onclick=["']([^"']+)["']/i);

    if (dataRouteMatch) {
      const target = dataRouteMatch[1];
      allNavTargets['route:' + target] = (allNavTargets['route:' + target] || 0) + 1;
      if (!screenIds.has(target)) unmappedTargets.add('data-route: ' + target);
    }
    if (dataPathMatch) {
      const target = dataPathMatch[1];
      allNavTargets['path:' + target] = (allNavTargets['path:' + target] || 0) + 1;
    }
    if (hrefMatch && hrefMatch[1].startsWith('#')) {
      const target = hrefMatch[1].replace(/^#\/?/, '');
      allNavTargets['href:' + target] = (allNavTargets['href:' + target] || 0) + 1;
    }
  });
});

console.log('\n=== All Navigation Attributes Found ===');
console.log(allNavTargets);

console.log('\n=== Unmapped data-route targets ===');
console.log(Array.from(unmappedTargets));
