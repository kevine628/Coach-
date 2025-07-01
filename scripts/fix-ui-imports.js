const fs = require('fs');
const path = require('path');

// Fonction pour corriger les imports UI dans un fichier
function fixUIImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Corriger les imports ui/... vers ./ui/...
    content = content.replace(
      /from ["']ui\/([^"']+)["']/g,
      (match, uiPath) => {
        modified = true;
        return `from "./ui/${uiPath}"`;
      }
    );

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed UI imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Fonction pour parcourir récursivement les dossiers
function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      walkDir(filePath, callback);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      callback(filePath);
    }
  });
}

// Exécuter le script
console.log('🔧 Fixing UI imports in TypeScript/TSX files...');

const projectRoot = process.cwd();
walkDir(projectRoot, fixUIImportsInFile);

console.log('✅ UI import fixing completed!'); 