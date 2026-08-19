const fs = require('fs');

const files = [
    'athletes.html',
    'empowering-pro-athletes.html',
    'our-difference.html',
    'business-titans.html',
    'individuals.html',
    'private-wealth.html',
    'index.html',
    'team.html'
];

const newText = 'Certified Financial Planner Board of Standards Center for Financial Planning, Inc. owns and licenses the certification marks CFP®, Certified Financial Planner®, and CFP® (with plaque design) in the United States to Certified Financial Planner Board of Standards, Inc., which authorizes individuals who successfully complete the organization\'s initial and ongoing certification requirements to use the certification marks.';

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const match = content.match(/<div class="champ-quote">[\s\S]*?<\/div>/);
        if (match) {
            content = content.replace(match[0], '<div class="champ-quote">\n            ' + newText + '\n        </div>');
            fs.writeFileSync(file, content, 'utf8');
            console.log('Updated ' + file);
        } else {
            console.log('champ-quote not found in ' + file);
        }
    }
});
