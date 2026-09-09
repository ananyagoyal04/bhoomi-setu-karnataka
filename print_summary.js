const fs = require('fs');
const path = require('path');
const info = JSON.parse(fs.readFileSync('screens_info.json', 'utf8'));

console.log(`Total screens: ${info.length}`);
info.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.id}]`);
  console.log(`   H1: ${s.h1}`);
  console.log(`   H2: ${s.h2}`);
});
