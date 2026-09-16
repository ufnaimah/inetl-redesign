// fix_padding.cjs - Converted from fix_padding.py
const fs = require('fs');

const lines = fs.readFileSync('src/app/App.jsx', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('className="bg-white rounded-lg shadow-sm border border-[var(--border)]"')) {
    if (!lines[i].includes('overflow-hidden')) {
      lines[i] = lines[i].replace(
        'className="bg-white rounded-lg shadow-sm border border-[var(--border)]"',
        'className="bg-white rounded-lg p-6 shadow-sm border border-[var(--border)]"'
      );
    }
  }
}

fs.writeFileSync('src/app/App.jsx', lines.join('\n'));
console.log('fix_padding.cjs done.');
