@echo off
echo 🚀 Deploiement CoachIA - Windows
echo.

REM Vérifier Git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git n'est pas installé. Installez Git depuis https://git-scm.com
    pause
    exit /b 1
)

REM Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé. Installez Node.js depuis https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Git et Node.js sont installés
echo.

REM Vérifier le statut Git
echo 📋 Vérification du statut Git...
git status --porcelain >nul 2>&1
if not errorlevel 1 (
    echo ⚠️ Il y a des changements non commités
    echo.
    set /p choice="Voulez-vous commiter les changements ? (o/n): "
    if /i "%choice%"=="o" (
        set /p message="Message de commit: "
        git add .
        git commit -m "%message%"
        echo ✅ Changements commités
    ) else (
        echo ❌ Déploiement annulé
        pause
        exit /b 1
    )
)

REM Pousser vers GitHub
echo.
echo 📤 Poussée vers GitHub...
git push origin main
if errorlevel 1 (
    echo ❌ Erreur lors de la poussée vers GitHub
    echo Vérifiez votre connexion et vos permissions
    pause
    exit /b 1
)

echo ✅ Code poussé vers GitHub
echo.

REM Afficher les options de déploiement
echo 🎯 Choisissez votre plateforme de déploiement:
echo.
echo 1. Vercel (recommandé - 2 minutes)
echo 2. Railway (3 minutes)
echo 3. Render (3 minutes)
echo 4. Netlify (3 minutes)
echo 5. Annuler
echo.

set /p platform="Votre choix (1-5): "

if "%platform%"=="1" (
    echo.
    echo 🚀 Déploiement sur Vercel...
    echo.
    echo 📋 Étapes:
    echo 1. Allez sur https://vercel.com
    echo 2. Connectez votre compte GitHub
    echo 3. Cliquez sur "New Project"
    echo 4. Importez votre repository
    echo 5. Configurez les variables d'environnement:
    echo    - DATABASE_URL (PostgreSQL)
    echo    - JWT_SECRET (générez avec: openssl rand -base64 32)
    echo    - NEXTAUTH_URL (votre domaine)
    echo    - NEXTAUTH_SECRET (générez avec: openssl rand -base64 32)
    echo 6. Cliquez sur "Deploy"
    echo.
    echo 🌐 Vercel gérera automatiquement Prisma et les dépendances
    echo.
) else if "%platform%"=="2" (
    echo.
    echo 🚂 Déploiement sur Railway...
    echo.
    echo 📋 Étapes:
    echo 1. Allez sur https://railway.app
    echo 2. Connectez votre compte GitHub
    echo 3. Cliquez sur "New Project"
    echo 4. Sélectionnez "Deploy from GitHub repo"
    echo 5. Ajoutez une base de données PostgreSQL
    echo 6. Configurez les variables d'environnement
    echo 7. Railway déploiera automatiquement
    echo.
) else if "%platform%"=="3" (
    echo.
    echo 🌐 Déploiement sur Render...
    echo.
    echo 📋 Étapes:
    echo 1. Allez sur https://render.com
    echo 2. Connectez votre compte GitHub
    echo 3. Cliquez sur "New" ^> "Web Service"
    echo 4. Importez votre repository
    echo 5. Configurez:
    echo    - Build Command: npm install ^&^& npx prisma generate ^&^& npm run build
    echo    - Start Command: npm start
    echo 6. Ajoutez une base de données PostgreSQL
    echo 7. Configurez les variables d'environnement
    echo.
) else if "%platform%"=="4" (
    echo.
    echo 🌐 Déploiement sur Netlify...
    echo.
    echo 📋 Étapes:
    echo 1. Allez sur https://netlify.com
    echo 2. Connectez votre compte GitHub
    echo 3. Importez votre repository
    echo 4. Configurez les variables d'environnement
    echo 5. Déployez
    echo.
) else if "%platform%"=="5" (
    echo.
    echo ❌ Déploiement annulé
    pause
    exit /b 0
) else (
    echo.
    echo ❌ Choix invalide
    pause
    exit /b 1
)

echo.
echo 🎉 Instructions affichées !
echo.
echo 📚 Pour plus de détails, consultez:
echo - DEPLOYMENT_GUIDE.md (guide complet)
echo - DEPLOYMENT_WINDOWS.md (spécifique Windows)
echo - README_DEPLOYMENT.md (guide rapide)
echo.
echo 🔧 Variables d'environnement requises:
echo - DATABASE_URL (PostgreSQL)
echo - JWT_SECRET
echo - NEXTAUTH_URL
echo - NEXTAUTH_SECRET
echo.
echo 💡 Conseil: Utilisez Vercel pour un déploiement le plus simple
echo.
pause 