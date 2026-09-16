const parser = require('@babel/parser');
const fs = require('fs');

const code = fs.readFileSync('src/app/App.jsx', 'utf-8');
try {
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log("No syntax errors found.");
} catch (e) {
  console.error("Syntax Error:", e.message);
}
