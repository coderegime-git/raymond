const fs = require('fs');
const code = fs.readFileSync('dinkytown_spendless.js', 'utf8');

const regex = /EAT_OUT_LESS/g;
let match;
while ((match = regex.exec(code)) !== null) {
  console.log('Match at', match.index);
  console.log(code.substring(match.index - 80, match.index + 200));
}
