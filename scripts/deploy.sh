#!/bin/bash

# Script de déploiement pour CoachIA
echo "🚀 Déploiement de CoachIA..."

# Vérifier que nous sommes sur la branche main
if [ "$(git branch --show-current)" != "main" ]; then
    echo "❌ Erreur: Vous devez être sur la branche main pour déployer"
    exit 1
fi

# Vérifier que tous les changements sont commités
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Il y a des changements non commités"
    echo "Commitez d'abord vos changements avec: git add . && git commit -m 'votre message'"
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Build de l'application
echo "🏗️ Build de l'application..."
npm run build

# Vérifier que le build s'est bien passé
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "✅ Build réussi!"

# Options de déploiement
echo ""
echo "🎯 Choisissez votre plateforme de déploiement:"
echo "1. Vercel (recommandé)"
echo "2. Railway"
echo "3. Netlify"
echo "4. Render"
echo "5. Manuel"

read -p "Votre choix (1-5): " choice

case $choice in
    1)
        echo "🚀 Déploiement sur Vercel..."
        echo "1. Allez sur https://vercel.com"
        echo "2. Connectez votre compte GitHub"
        echo "3. Importez votre repository"
        echo "4. Configurez les variables d'environnement:"
        echo "   - DATABASE_URL (PostgreSQL)"
        echo "   - JWT_SECRET"
        echo "   - NEXTAUTH_URL"
        echo "   - NEXTAUTH_SECRET"
        echo "5. Déployez!"
        ;;
    2)
        echo "🚀 Déploiement sur Railway..."
        echo "1. Allez sur https://railway.app"
        echo "2. Connectez votre compte GitHub"
        echo "3. Créez un nouveau projet"
        echo "4. Ajoutez une base de données PostgreSQL"
        echo "5. Configurez les variables d'environnement"
        echo "6. Déployez!"
        ;;
    3)
        echo "🚀 Déploiement sur Netlify..."
        echo "1. Allez sur https://netlify.com"
        echo "2. Connectez votre compte GitHub"
        echo "3. Importez votre repository"
        echo "4. Configurez les variables d'environnement"
        echo "5. Déployez!"
        ;;
    4)
        echo "🚀 Déploiement sur Render..."
        echo "1. Allez sur https://render.com"
        echo "2. Connectez votre compte GitHub"
        echo "3. Créez un nouveau service web"
        echo "4. Ajoutez une base de données PostgreSQL"
        echo "5. Configurez les variables d'environnement"
        echo "6. Déployez!"
        ;;
    5)
        echo "📋 Instructions de déploiement manuel:"
        echo "1. Configurez votre serveur"
        echo "2. Installez Node.js et npm"
        echo "3. Clonez votre repository"
        echo "4. Configurez les variables d'environnement"
        echo "5. Exécutez: npm install && npm run build && npm start"
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "🎉 Instructions de déploiement affichées!"
echo "📚 Consultez les fichiers de documentation dans le dossier /docs pour plus de détails" 