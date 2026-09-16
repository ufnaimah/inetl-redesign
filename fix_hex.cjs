// fix_hex.cjs - Converted from fix_hex.py
const fs = require('fs');

let content = fs.readFileSync('src/app/App.jsx', 'utf8');

// Replace the stray light backgrounds
content = content.replace(/#EBF4F7/g, 'var(--muted)');
content = content.replace(/#E4F2F5/g, 'var(--muted)');

// Random dashboard card bg colors to primary or secondary
content = content.replace(/bg:"#065f46"/g, 'bg:TEAL');
content = content.replace(/bg:"#4c1d95"/g, 'bg:TEAL_DARK');
content = content.replace(/c:"#065f46"/g, 'c:TEAL');
content = content.replace(/c:"#7c3aed"/g, 'c:GOLD');
content = content.replace(/c:"#ea580c"/g, 'c:RED');

fs.writeFileSync('src/app/App.jsx', content);
console.log('fix_hex.cjs done.');
