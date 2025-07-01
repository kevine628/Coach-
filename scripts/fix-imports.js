const fs = require('fs');
const path = require('path');

// Fonction pour obtenir le chemin relatif entre deux fichiers
function getRelativePath(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  const relativePath = path.relative(fromDir, toFile);
  return relativePath.replace(/\\/g, '/'); // Normaliser les slashes
}

// Fonction pour corriger les imports dans un fichier
function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remplacer les imports @/components/...
    content = content.replace(
      /from ["']@\/components\/([^"']+)["']/g,
      (match, componentPath) => {
        const relativePath = getRelativePath(filePath, `components/${componentPath}`);
        modified = true;
        return `from "${relativePath}"`;
      }
    );

    // Remplacer les imports @/lib/...
    content = content.replace(
      /from ["']@\/lib\/([^"']+)["']/g,
      (match, libPath) => {
        const relativePath = getRelativePath(filePath, `lib/${libPath}`);
        modified = true;
        return `from "${relativePath}"`;
      }
    );

    // Remplacer les imports @/app/...
    content = content.replace(
      /from ["']@\/app\/([^"']+)["']/g,
      (match, appPath) => {
        const relativePath = getRelativePath(filePath, `app/${appPath}`);
        modified = true;
        return `from "${relativePath}"`;
      }
    );

    // Remplacer les imports @/hooks/...
    content = content.replace(
      /from ["']@\/hooks\/([^"']+)["']/g,
      (match, hooksPath) => {
        const relativePath = getRelativePath(filePath, `hooks/${hooksPath}`);
        modified = true;
        return `from "${relativePath}"`;
      }
    );

    // Remplacer les imports @/...
    content = content.replace(
      /from ["']@\/([^"']+)["']/g,
      (match, importPath) => {
        const relativePath = getRelativePath(filePath, importPath);
        modified = true;
        return `from "${relativePath}"`;
      }
    );

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed imports in: ${filePath}`);
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
console.log('🔧 Fixing imports in TypeScript/TSX files...');

const projectRoot = process.cwd();
walkDir(projectRoot, fixImportsInFile);

console.log('✅ Import fixing completed!'); 