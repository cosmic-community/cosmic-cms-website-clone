const fs = require('fs');
const path = require('path');

// This script is automatically available for build-time injection
// Add to package.json: "postbuild": "node scripts/inject-console-capture.js"

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
const outputDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScript(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', `${scriptTag}</head>`);
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture into ${filePath}`);
    }
  }
}

// Inject into all HTML files in the build output
function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Starting console capture script injection...');
processDirectory(outputDir);
console.log('Console capture script injection complete!');