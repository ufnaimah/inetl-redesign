// patch_cards.cjs - Converted from patch_cards.py
const fs = require('fs');

let content = fs.readFileSync('src/app/App.jsx', 'utf8');

// Add generous whitespace between sections
content = content.replace(/py-12/g, 'py-16');
content = content.replace(/py-16/g, 'py-20');
content = content.replace(/mb-12/g, 'mb-16');
content = content.replace(/gap-5/g, 'gap-6');
content = content.replace(/gap-4/g, 'gap-6');

// Ensure shadow-sm border is applied consistently to bg-white card blocks
content = content.replace(
  /className="([^"]*bg-white[^"]*rounded-[a-z]+)[^"]*"/g,
  (match, group1) => {
    if (match.includes('border')) return match;
    const cleaned = group1
      .replace(/shadow-md/g, '')
      .replace(/shadow-lg/g, '')
      .replace(/shadow-xl/g, '');
    return `className="${cleaned} shadow-sm border border-[var(--border)]"`;
  }
);

fs.writeFileSync('src/app/App.jsx', content);
console.log('patch_cards.cjs done.');
