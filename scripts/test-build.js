#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Test de build pour CoachIA...\n');

// Vérifier que nous sommes dans le bon répertoire
if (!fs.existsSync('package.json')) {
  console.error('❌ Erreur: package.json non trouvé. Assurez-vous d\'être dans le répertoire du projet.');
  process.exit(1);
}

// Vérifier les fichiers essentiels
const requiredFiles = [
  'next.config.mjs',
  'prisma/schema.prisma',
  'app/page.tsx',
  'app/layout.tsx'
];

console.log('📁 Vérification des fichiers essentiels...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ ${file} manquant`);
    process.exit(1);
  }
}

// Vérifier les variables d'environnement
console.log('\n🔧 Vérification des variables d\'environnement...');
const envFile = '.env';
if (fs.existsSync(envFile)) {
  console.log('✅ Fichier .env trouvé');
  const envContent = fs.readFileSync(envFile, 'utf8');
  
  const requiredVars = ['DATABASE_URL', 'JWT_SECRET'];
  for (const varName of requiredVars) {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName} configuré`);
    } else {
      console.warn(`⚠️ ${varName} manquant dans .env`);
    }
  }
} else {
  console.warn('⚠️ Fichier .env non trouvé');
}

// Installer les dépendances
console.log('\n📦 Installation des dépendances...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dépendances installées');
} catch (error) {
  console.error('❌ Erreur lors de l\'installation des dépendances');
  process.exit(1);
}

// Générer le client Prisma
console.log('\n🔧 Génération du client Prisma...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Client Prisma généré');
} catch (error) {
  console.warn('⚠️ Erreur lors de la génération du client Prisma');
  console.warn('⚠️ Cela peut être dû à des permissions Windows');
  console.warn('⚠️ Le build peut quand même fonctionner en production');
}

// Test de build
console.log('\n🏗️ Test de build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build réussi !');
} catch (error) {
  console.error('❌ Erreur lors du build');
  process.exit(1);
}

// Vérifier que le dossier .next existe
if (fs.existsSync('.next')) {
  console.log('✅ Dossier .next créé');
} else {
  console.error('❌ Dossier .next manquant après le build');
  process.exit(1);
}

// Vérifier la taille du build
const nextDir = path.join(process.cwd(), '.next');
const getDirSize = (dir) => {
  let size = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      size += getDirSize(filePath);
    } else {
      size += stat.size;
    }
  }
  return size;
};

const buildSize = getDirSize(nextDir);
const buildSizeMB = (buildSize / 1024 / 1024).toFixed(2);
console.log(`📊 Taille du build: ${buildSizeMB} MB`);

if (buildSizeMB > 50) {
  console.warn('⚠️ Le build est assez volumineux. Considérez l\'optimisation.');
} else {
  console.log('✅ Taille du build acceptable');
}

// Test de linting (optionnel)
console.log('\n🔍 Test de linting...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting réussi');
} catch (error) {
  console.warn('⚠️ Problèmes de linting détectés (non bloquant)');
}

console.log('\n🎉 Test de build terminé avec succès !');
console.log('✅ Votre application est prête pour le déploiement.');
console.log('\n📋 Prochaines étapes:');
console.log('1. Commitez vos changements: git add . && git commit -m "Ready for deployment"');
console.log('2. Poussez vers GitHub: git push origin main');
console.log('3. Suivez le guide de déploiement dans DEPLOYMENT_GUIDE.md');
console.log('4. Configurez les variables d\'environnement sur votre plateforme de déploiement'); 