const fs = require('fs');

const files = [
    'athletes.html',
    'empowering-pro-athletes.html',
    'our-difference.html',
    'business-titans.html',
    'individuals.html',
    'private-wealth.html',
    'index.html',
    'team.js'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Update closing block
        content = content.replace(/drawer\.classList\.remove\('active'\);[\s\S]*?document\.body\.style\.overflow\s*=\s*'';/g, 
            "drawer.classList.remove('active');\n                if (overlay) overlay.classList.remove('active');\n                if (toggleBtn) toggleBtn.classList.remove('active');\n                document.documentElement.classList.remove('menu-open');\n                document.body.classList.remove('menu-open');\n                document.body.style.overflow = '';\n                document.documentElement.style.overflow = '';");
        
        // Update opening block
        content = content.replace(/drawer\.classList\.add\('active'\);[\s\S]*?document\.body\.style\.overflow\s*=\s*'hidden';/g,
            "drawer.classList.add('active');\n                if (overlay) overlay.classList.add('active');\n                if (toggleBtn) toggleBtn.classList.add('active');\n                document.documentElement.classList.add('menu-open');\n                document.body.classList.add('menu-open');\n                document.body.style.overflow = 'hidden';\n                document.documentElement.style.overflow = 'hidden';");
            
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated scroll-lock in ' + file);
    }
});
