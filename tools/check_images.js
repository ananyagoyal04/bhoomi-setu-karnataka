const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_bhoomi_setu_land_portal');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(baseDir, d.name, 'code.html')));

const imgSources = new Set();
dirs.forEach(d => {
  const file = path.join(baseDir, d.name, 'code.html');
  const html = fs.readFileSync(file, 'utf8');
  const matches = [...html.matchAll(/<img\s+[^>]*src=["']([^"']*)["']/gi)];
  matches.forEach(m => imgSources.add(m[1]));
});

console.log('Unique image sources in HTML:');
imgSources.forEach(src => console.log(' - ' + src));
