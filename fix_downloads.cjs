const fs = require('fs');
let code = fs.readFileSync('src/app/App.jsx', 'utf8');

// Change Database icon to Download in DownloadButtons
code = code.replace(/<Database size=\{c\?9:10\} \/> \{t\.dlCsv\}/, "<Download size={c?9:10} /> {t.dlCsv}");

fs.writeFileSync('src/app/App.jsx', code);
