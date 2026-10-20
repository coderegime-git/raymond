const fs = require('fs');
const html = fs.readFileSync('dinkytown_page.html', 'utf8');
const scripts = html.match(/src="([^"]+)"/g) || [];
scripts.forEach(s => {
    if (s.includes('.js')) console.log(s);
});
