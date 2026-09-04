const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Pattern for resources drawer accordion header
    const regex = /<div class="drawer-accordion-header"[^>]*>\s*<a href="(?:javascript:void\(0\)|#|resources\.html)"[^>]*class="[^"]*drawer-accordion-main-link[^"]*"[^>]*>RESOURCES<\/a>\s*<button class="drawer-accordion-chevron-btn" id="drawer-resources-btn"[^>]*>[\s\S]*?<\/button>\s*<\/div>/g;

    const isActive = file === 'resources.html';
    const replacement = `<div class="drawer-accordion-header">
                    <a href="resources.html" class="drawer-link drawer-accordion-main-link${isActive ? ' active' : ''}">RESOURCES</a>
                    <button class="drawer-accordion-chevron-btn" id="drawer-resources-btn" onclick="toggleMobileResourcesAccordion(event)" aria-label="Toggle Resources submenu">
                        <i class="fas fa-chevron-down drawer-accordion-icon"></i>
                    </button>
                </div>`;

    if (regex.test(content)) {
        content = content.replace(regex, replacement);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated drawer resources link in ' + file);
    }
});
