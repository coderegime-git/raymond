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

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Replace ATHLETES accordion button with Header containing Direct Link + Chevron Toggle Button
        content = content.replace(/<div class="drawer-accordion-item">\s*<button class="drawer-accordion-btn[^"]*" id="drawer-athletes-btn"[\s\S]*?<\/button>/,
`<div class="drawer-accordion-item">
                <div class="drawer-accordion-header">
                    <a href="athletes.html" class="drawer-link drawer-accordion-main-link">ATHLETES</a>
                    <button class="drawer-accordion-chevron-btn" id="drawer-athletes-btn" onclick="toggleMobileAthletesAccordion(event)" aria-label="Toggle Athletes submenu">
                        <i class="fas fa-chevron-down drawer-accordion-icon"></i>
                    </button>
                </div>`);

        // Replace INDIVIDUALS accordion button with Header containing Direct Link + Chevron Toggle Button
        content = content.replace(/<div class="drawer-accordion-item">\s*<button class="drawer-accordion-btn[^"]*" id="drawer-individuals-btn"[\s\S]*?<\/button>/,
`<div class="drawer-accordion-item">
                <div class="drawer-accordion-header">
                    <a href="individuals.html" class="drawer-link drawer-accordion-main-link">INDIVIDUALS</a>
                    <button class="drawer-accordion-chevron-btn" id="drawer-individuals-btn" onclick="toggleMobileIndividualsAccordion(event)" aria-label="Toggle Individuals submenu">
                        <i class="fas fa-chevron-down drawer-accordion-icon"></i>
                    </button>
                </div>`);

        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated drawer in ' + file);
    }
});
