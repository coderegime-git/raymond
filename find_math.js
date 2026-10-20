const fs = require('fs');
const code = fs.readFileSync('dinkytown_spendless.js', 'utf8');

console.log('ROR_MONTH definition:');
const rorIdx = code.indexOf('ROR_MONTH');
console.log(code.substring(rorIdx - 50, rorIdx + 200));

console.log('FV_BEGIN definition:');
const fvIdx = code.indexOf('FV_BEGIN');
console.log(code.substring(fvIdx - 50, fvIdx + 200));
