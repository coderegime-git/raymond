const fs = require('fs');
const code = fs.readFileSync('dinkytown_spendless.js', 'utf8');

// Look for input definitions
const defIdx = code.indexOf('KJE.parameters');
console.log('Search for parameters / inputs:');
const matches = code.match(/this\.[A-Z_]+=[^;]+/g) || [];
console.log('Fields:', matches.slice(0, 30));

const labels = code.match(/KJE\.setLabel\([^)]+\)/g) || [];
console.log('Labels count:', labels.length);
if (labels.length > 0) console.log(labels);
