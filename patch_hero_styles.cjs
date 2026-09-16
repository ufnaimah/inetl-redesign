// patch_hero_styles.cjs - Converted from patch_hero_styles.py
const fs = require('fs');

let content = fs.readFileSync('src/app/App.jsx', 'utf8');

// Replace complex hero gradient 1
content = content.replace(
  /background:\s*"linear-gradient\(115deg.*?transparent 100%\)"/g,
  'background: "rgba(20,32,43,0.85)"'
);
// Replace complex hero gradient 2
content = content.replace(
  /background:\s*"linear-gradient\(to top.*?transparent 45%\)"/g,
  'background: "linear-gradient(to top, rgba(20,32,43,1) 0%, transparent 100%)"'
);

// Left accent line gradient (remove it or make it solid accent)
content = content.replace(
  /background:\s*`linear-gradient\(to bottom, \$\{GOLD\}, \$\{TEAL_MID\}80, transparent\)`/g,
  'background: GOLD'
);
content = content.replace(
  /background:\s*`linear-gradient\(to bottom, \$\{GOLD\}80, transparent\)`/g,
  'background: GOLD'
);

// Replace transparent borders with more solid ones
content = content.replace(
  /borderColor:\s*"rgba\(10,92,110,0\.1\)"/g,
  'borderColor: "var(--border)"'
);
content = content.replace(
  /border:\s*"1px solid rgba\(10,92,110,0\.08\)"/g,
  'border: "1px solid var(--border)"'
);
content = content.replace(
  /border:\s*`1\.5px solid rgba\(10,92,110,0\.12\)`/g,
  'border: "1px solid var(--border)"'
);
content = content.replace(
  /border:\s*`1\.5px solid \$\{TEAL\}20`/g,
  'border: "1px solid var(--border)"'
);

// Increase padding in cards
content = content.replace(/className="bg-white rounded-lg p-4/g, 'className="bg-white rounded-lg p-6');
content = content.replace(/className="bg-white rounded-lg p-5/g, 'className="bg-white rounded-lg p-6');

// Check for shadow-sm and ensure standard border
content = content.replace(/shadow-sm\s*border\s*border-border/g, 'border border-border shadow-sm');

fs.writeFileSync('src/app/App.jsx', content);
console.log('patch_hero_styles.cjs done.');
