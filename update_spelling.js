const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let totalReplacements = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/COUNSELLING VISIONARIES/g, 'COUNSELING VISIONARIES');
    content = content.replace(/counselling visionaries/gi, (match) => {
        if (match === match.toUpperCase()) return 'COUNSELING VISIONARIES';
        if (match === match.toLowerCase()) return 'counseling visionaries';
        return 'Counseling Visionaries';
    });
    content = content.replace(/nav-item-titans-counselling/g, 'nav-item-titans-counseling');
    content = content.replace(/mob-titans-counselling/g, 'mob-titans-counseling');
    content = content.replace(/id="counselling"/g, 'id="counseling"');
    content = content.replace(/href="#counselling"/g, 'href="#counseling"');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated spelling in: ${file}`);
        totalReplacements++;
    }
});

console.log(`Done! Updated ${totalReplacements} files.`);
