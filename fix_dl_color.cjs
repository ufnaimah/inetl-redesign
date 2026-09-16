const fs = require('fs');
let code = fs.readFileSync('src/app/App.jsx', 'utf8');

// Modify DownloadButtons component styling to use primary color
code = code.replace(/style=\{\{ background:RED_ACCENT, color:"#fff" \}\}/g, 'style={{ background:BLUE, color:"#fff" }}');
code = code.replace(/style=\{\{ background:CREAM, color:INK, border:\`1px solid rgba\\(0,87,184,0.2\\)\` \}\}/g, 'style={{ background:"#fff", color:BLUE, border:`1px solid ${BLUE}` }}');
code = code.replace(/style=\{\{ background:"#1D6F42", color:"#fff" \}\}/g, 'style={{ background:BLUE, color:"#fff" }}');

fs.writeFileSync('src/app/App.jsx', code);
