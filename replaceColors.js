const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // For CSS and Tailwind classes
            content = content.replace(/\bred-50\b/g, 'blue-50');
            content = content.replace(/\bred-100\b/g, 'blue-100');
            content = content.replace(/\bred-200\b/g, 'blue-200');
            content = content.replace(/\bred-300\b/g, 'blue-300');
            content = content.replace(/\bred-400\b/g, 'blue-400');
            content = content.replace(/\bred-500\b/g, 'blue-500');
            content = content.replace(/\bred-600\b/g, 'blue-600');
            content = content.replace(/\bred-700\b/g, 'blue-700');
            content = content.replace(/\bred-800\b/g, 'blue-800');
            content = content.replace(/\bred-900\b/g, 'blue-900');
            content = content.replace(/\bred-950\b/g, 'blue-950');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

console.log('Starting replacements in dashboard...');
replaceInFiles(path.join(__dirname, 'apps/dashboard/src'));

console.log('Starting replacements in home-page...');
replaceInFiles(path.join(__dirname, 'apps/home-page/src'));
