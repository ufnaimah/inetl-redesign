// remove_gradients.cjs - Converted from remove_gradients.py
const fs = require('fs');

let content = fs.readFileSync('src/app/App.jsx', 'utf8');

// Remove the colorful category gradients
content = content.replace(/`linear-gradient\(145deg, #[a-zA-Z0-9]+ 0%, #[a-zA-Z0-9]+ 100%\)`/g, 'TEAL');
content = content.replace(/`linear-gradient\(135deg,#[a-zA-Z0-9]+,#[a-zA-Z0-9]+\)`/g, 'TEAL');
content = content.replace(/"linear-gradient\(135deg,#[a-zA-Z0-9]+,#[a-zA-Z0-9]+\)"/g, 'TEAL');

// Remove the h-0.5 gradients
content = content.replace(/`linear-gradient\(90deg,\$\{TEAL\},\$\{TEAL_MID\}\)`/g, 'TEAL');
content = content.replace(/`linear-gradient\(90deg, transparent, \$\{GOLD\}, \$\{GOLD_LITE\}, \$\{GOLD\}, transparent\)`/g, 'GOLD');
content = content.replace(/`linear-gradient\(90deg, transparent, \$\{GOLD\}, transparent\)`/g, 'GOLD');
content = content.replace(/`linear-gradient\(to right, \$\{TEAL\}25, transparent\)`/g, 'TEAL');

// Remove the image overlay color gradients
content = content.replace(/"linear-gradient\(to top, rgba\(6,61,74,0\.55\) 0%, transparent 60%\)"/g, '"rgba(20,32,43,0.3)"');
content = content.replace(/"linear-gradient\(to top, rgba\(4,40,48,0\.92\) 0%, rgba\(4,40,48,0\.2\) 55%, transparent 100%\)"/g, '"rgba(20,32,43,0.6)"');
content = content.replace(/"linear-gradient\(to top, rgba\(4,28,35,0\.70\) 0%, rgba\(4,28,35,0\.1\) 55%, transparent 100%\)"/g, '"rgba(20,32,43,0.5)"');
content = content.replace(/"linear-gradient\(to top, rgba\(20,32,43,1\) 0%, transparent 100%\)"/g, '"linear-gradient(to top, rgba(20,32,43,0.85) 0%, transparent 100%)"');

fs.writeFileSync('src/app/App.jsx', content);
console.log('remove_gradients.cjs done.');
