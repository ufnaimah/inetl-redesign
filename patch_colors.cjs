// patch_colors.cjs - Converted from patch_colors.py
const fs = require('fs');

let content = fs.readFileSync('src/app/App.jsx', 'utf8');

// Replace color constants
content = content.replace(/const TEAL\s*=\s*".*?";/, 'const TEAL      = "#1D65AF";');
content = content.replace(/const TEAL_MID\s*=\s*".*?";/, 'const TEAL_MID  = "#1D65AF";');
content = content.replace(/const TEAL_DARK\s*=\s*".*?";/, 'const TEAL_DARK = "#1D65AF";');
content = content.replace(/const TEAL_DEEP\s*=\s*".*?";/, 'const TEAL_DEEP = "#14202B";');
content = content.replace(/const GOLD\s*=\s*".*?";/, 'const GOLD      = "#257F76";');
content = content.replace(/const GOLD_LITE\s*=\s*".*?";/, 'const GOLD_LITE = "#257F76";');
content = content.replace(/const RED\s*=\s*".*?";/, 'const RED       = "#D62828";');
content = content.replace(/const CREAM\s*=\s*".*?";/, 'const CREAM     = "#F4F6F8";');
content = content.replace(/const INK\s*=\s*".*?";/, 'const INK       = "#14202B";');
content = content.replace(/const SLATE\s*=\s*".*?";/, 'const SLATE     = "#8593A1";');

// Remove the gradient, make it a solid background
content = content.replace(/const GRAD = `linear-gradient.*?`;/, 'const GRAD = TEAL;');

// Remove all inline font families
content = content.replace(/,\s*fontFamily:\s*["'][^"']+["']/g, '');
content = content.replace(/fontFamily:\s*["'][^"']+["'],\s*/g, '');
content = content.replace(/fontFamily:\s*["'][^"']+["']/g, '');

// Add font-mono to stat numbers
content = content.replace(/text-2xl font-bold mb-1/g, 'text-2xl font-bold font-mono mb-1');
content = content.replace(/text-3xl font-bold mb-4/g, 'text-3xl font-bold font-mono mb-4');
content = content.replace(/text-xl font-bold leading-none/g, 'text-xl font-bold font-mono leading-none');
content = content.replace(/text-2xl font-bold leading-none/g, 'text-2xl font-bold font-mono leading-none');
content = content.replace(/text-4xl font-bold leading-none/g, 'text-4xl font-bold font-mono leading-none');

fs.writeFileSync('src/app/App.jsx', content);
console.log('patch_colors.cjs done.');
