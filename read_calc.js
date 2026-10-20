const fs = require('fs');
const code = fs.readFileSync('dinkytown_spendless.js', 'utf8');

// Find calculate function
const start = code.indexOf('KJE.SpendLessCalc.prototype.calculate=function');
console.log(code.substring(start, start + 3000));
