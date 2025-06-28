#!/bin/bash

echo "🚀 Déploiement de CoachIA..."

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé. Installation..."
    npm install -g vercel
fi

# Vérifier que le projet est prêt
echo "📦 Vérification du projet..."
npm install

# Générer le client Prisma
echo "🗄️ Génération du client Prisma..."
npx prisma generate

# Build du projet
echo "🔨 Build du projet..."
npm run build

# Déploiement sur Vercel
echo "🚀 Déploiement sur Vercel..."
vercel --prod

echo "✅ Déploiement terminé !" 