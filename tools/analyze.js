const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_bhoomi_setu_land_portal');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(baseDir, d.name, 'code.html')));

const screens = dirs.map(d => {
  const codePath = path.join(baseDir, d.name, 'code.html');
  const content = fs.readFileSync(codePath, 'utf8');
  
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const h1Matches = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1 = h1Matches.map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).join(' | ');

  const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  const h2 = h2Matches.map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).slice(0, 3).join(' | ');

  // Extract all anchor links with data-path or href
  const links = [];
  const linkMatches = [...content.matchAll(/<a\s+([^>]*?)>([\s\S]*?)<\/a>/gi)];
  linkMatches.forEach(m => {
    const attrs = m[1];
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    const dataPathMatch = attrs.match(/data-path=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    const dataPath = dataPathMatch ? dataPathMatch[1] : '';
    if (text && (href || dataPath)) {
      links.push({ text: text.substring(0, 35), href, dataPath });
    }
  });

  // Extract buttons
  const buttons = [];
  const btnMatches = [...content.matchAll(/<button\s+([^>]*?)>([\s\S]*?)<\/button>/gi)];
  btnMatches.forEach(m => {
    const attrs = m[1];
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) {
      buttons.push(text.substring(0, 35));
    }
  });

  return {
    id: d.name,
    title,
    h1,
    h2,
    linksCount: links.length,
    buttonsCount: buttons.length,
    links: links.slice(0, 8),
    buttons: buttons.slice(0, 8)
  };
});

fs.writeFileSync(path.join(__dirname, 'screens_info.json'), JSON.stringify(screens, null, 2));
console.log(`Successfully extracted info for ${screens.length} screens.`);
