// fix_909.cjs - Converted from fix_909.py
const fs = require('fs');

const lines = fs.readFileSync('src/app/App.jsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('boxShadow: "none"+GOLD+" inset"')) {
    lines[i] = lines[i].replace(
      'boxShadow: "none"+GOLD+" inset"',
      'borderBottom: "2px solid " + GOLD'
    );
  }
}

fs.writeFileSync('src/app/App.jsx', lines.join('\n'));
console.log('fix_909.cjs done.');
