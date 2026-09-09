const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_bhoomi_setu_land_portal');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(baseDir, d.name, 'code.html')));

const configs = new Set();
dirs.forEach(d => {
  const file = path.join(baseDir, d.name, 'code.html');
  const html = fs.readFileSync(file, 'utf8');
  const twMatch = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\});/);
  if (twMatch) {
    // normalize whitespace
    const clean = twMatch[1].replace(/\s+/g, ' ');
    configs.add(clean);
  }
});

console.log(`Unique tailwind configs: ${configs.size}`);
