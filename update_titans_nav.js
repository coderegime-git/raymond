const fs = require('fs');

const files = [
    'team.html',
    'private-wealth.html',
    'press-releases.html',
    'our-difference.html',
    'introduce-us.html',
    'individuals.html',
    'index.html',
    'empowering-pro-athletes.html',
    'counseling-visionaries.html',
    'contact.html',
    'contact-us.html',
    'business-titans.html',
    'athletes.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/<a href="our-difference\.html" class="nav-dropdown-item" id="nav-item-titans-difference">/g, '<a href="titans-our-difference.html" class="nav-dropdown-item" id="nav-item-titans-difference">');
        content = content.replace(/<a href="our-difference\.html" class="drawer-sublink" id="mob-titans-difference">/g, '<a href="titans-our-difference.html" class="drawer-sublink" id="mob-titans-difference">');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated nav in ' + file);
    }
});
