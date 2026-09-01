const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

console.log('Total HTML files:', files.length);

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const hasToggle = content.includes('id="mobile-toggle"');
    const hasDrawer = content.includes('id="mobile-drawer"');
    const hasOverlay = content.includes('id="drawer-overlay"');
    const hasFunc = content.includes('toggleMobileMenu');
    const scripts = [];
    const scriptMatches = content.matchAll(/<script\s+src="([^"]+)"/g);
    for (const m of scriptMatches) scripts.push(m[1]);
    
    console.log(`${file}:
  toggleBtn: ${hasToggle}, drawer: ${hasDrawer}, overlay: ${hasOverlay}, toggleFunc: ${hasFunc}, externalScripts: [${scripts.join(', ')}]`);
});
