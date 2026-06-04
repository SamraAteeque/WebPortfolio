const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    { regex: /bg-\[#0A0A0A\]/g, replacement: 'bg-white' },
    { regex: /bg-neutral-900/g, replacement: 'bg-neutral-50' },
    { regex: /bg-\[#111\]/g, replacement: 'bg-gray-50' },
    { regex: /bg-\[#222\]/g, replacement: 'bg-gray-200' },
    { regex: /bg-\[#1a1a1a\]/g, replacement: 'bg-gray-50' },
    { regex: /bg-emerald-500/g, replacement: 'bg-[#800000]' },
    { regex: /bg-emerald-400/g, replacement: 'bg-[#800000]' },
    { regex: /text-emerald-500/g, replacement: 'text-[#800000]' },
    { regex: /text-emerald-400/g, replacement: 'text-[#800000]' },
    { regex: /text-emerald-600/g, replacement: 'text-rose-900' },
    { regex: /text-white/g, replacement: 'text-[#111]' },
    { regex: /text-gray-400/g, replacement: 'text-gray-600' },
    { regex: /text-gray-300/g, replacement: 'text-gray-700' },
    { regex: /text-gray-500/g, replacement: 'text-gray-500' },
    { regex: /border-emerald-500/g, replacement: 'border-[#800000]' },
    { regex: /border-\[#222\]/g, replacement: 'border-gray-200' },
    { regex: /border-\[#333\]/g, replacement: 'border-gray-300' },
    { regex: /border-\[#444\]/g, replacement: 'border-gray-300' },
    { regex: /from-\[#0A0A0A\]/g, replacement: 'from-white' },
    { regex: /from-emerald-400/g, replacement: 'from-[#800000]' },
    { regex: /to-emerald-600/g, replacement: 'to-[#500000]' },
    { regex: /text-\[#0A0A0A\]/g, replacement: 'text-white' },
    { regex: /shadow-\[0_0_15px_rgba\(16,185,129,0\.4\)\]/g, replacement: 'shadow-[0_0_15px_rgba(128,0,0,0.4)]' },
    { regex: /shadow-\[0_0_40px_rgba\(16,185,129,0\.3\)\]/g, replacement: 'shadow-[0_0_40px_rgba(128,0,0,0.3)]' },
    { regex: /rgba\(16,185,129,/g, replacement: 'rgba(128,0,0,' }
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const { regex, replacement } of replacements) {
                if (regex.test(content)) {
                    content = content.replace(regex, replacement);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(srcDir);
console.log('Done replacing theme variables.');
