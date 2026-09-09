const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_bhoomi_setu_land_portal');
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(baseDir, d.name, 'code.html')));

const screenAnalysis = dirs.map(d => {
  const file = path.join(baseDir, d.name, 'code.html');
  const html = fs.readFileSync(file, 'utf8');

  // get all text snippets inside buttons
  const buttons = [];
  const btnRegex = /<button\s+([^>]*?)>([\s\S]*?)<\/button>/gi;
  let m;
  while ((m = btnRegex.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text) buttons.push({ text: text.substring(0, 40), attrs: m[1] });
  }

  // get all links
  const links = [];
  const aRegex = /<a\s+([^>]*?)>([\s\S]*?)<\/a>/gi;
  while ((m = aRegex.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const hrefM = m[1].match(/href=["']([^"']*)["']/i);
    const dataPathM = m[1].match(/data-path=["']([^"']*)["']/i);
    links.push({
      text: text.substring(0, 40),
      href: hrefM ? hrefM[1] : '',
      dataPath: dataPathM ? dataPathM[1] : ''
    });
  }

  // extract forms and inputs
  const inputs = [];
  const inputRegex = /<input\s+([^>]*?)>/gi;
  while ((m = inputRegex.exec(html)) !== null) {
    const nameM = m[1].match(/name=["']([^"']*)["']/i);
    const placeholderM = m[1].match(/placeholder=["']([^"']*)["']/i);
    const typeM = m[1].match(/type=["']([^"']*)["']/i);
    inputs.push({
      type: typeM ? typeM[1] : 'text',
      name: nameM ? nameM[1] : '',
      placeholder: placeholderM ? placeholderM[1] : ''
    });
  }

  return {
    id: d.name,
    buttonsCount: buttons.length,
    linksCount: links.length,
    inputsCount: inputs.length,
    sampleButtons: buttons.slice(0, 10),
    sampleLinks: links.slice(0, 10),
    sampleInputs: inputs.slice(0, 5)
  };
});

fs.writeFileSync('screen_interactions.json', JSON.stringify(screenAnalysis, null, 2));
console.log('Interactions analysis completed.');
