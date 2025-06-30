# 🚀 Déploiement sur Windows - CoachIA

## ⚠️ Problèmes Spécifiques à Windows

### Permissions Prisma
Sur Windows, vous pouvez rencontrer des erreurs de permissions avec Prisma. Voici les solutions :

#### Solution 1: Exécuter en tant qu'administrateur
1. Ouvrez PowerShell en tant qu'administrateur
2. Naviguez vers votre projet
3. Exécutez les commandes

#### Solution 2: Nettoyer manuellement
```powershell
# Fermer tous les processus Node.js
taskkill /f /im node.exe

# Supprimer les dossiers problématiques
Remove-Item -Recurse -Force node_modules\.prisma -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Réinstaller
npm install
npx prisma generate
```

#### Solution 3: Utiliser WSL (Windows Subsystem for Linux)
```bash
# Installer WSL si pas déjà fait
wsl --install

# Dans WSL
cd /mnt/c/Users/mauis/Downloads/cluely-fr
npm install
npx prisma generate
npm run build
```

## 🚀 Déploiement depuis Windows

### Option 1: Déploiement Direct (Recommandé)

1. **Préparer le code**
   ```powershell
   # Commiter les changements
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre compte GitHub
   - Importez votre repository
   - Vercel gérera automatiquement Prisma

### Option 2: Déploiement Local puis Push

1. **Tester le build**
   ```powershell
   # Si Prisma pose problème, passez cette étape
   npm run build
   ```

2. **Pousser vers GitHub**
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **La plateforme de déploiement s'occupera du reste**

## 🔧 Configuration des Variables d'Environnement

### Générer les clés secrètes
```powershell
# Ouvrir PowerShell
openssl rand -base64 32
```

### Variables requises sur votre plateforme :
- `DATABASE_URL` (PostgreSQL)
- `JWT_SECRET` (clé générée)
- `NEXTAUTH_URL` (votre domaine)
- `NEXTAUTH_SECRET` (clé générée)

## 🎯 Plateformes Recommandées pour Windows

### 1. Vercel ⭐
- Gère automatiquement Prisma
- Pas de problèmes de permissions
- Déploiement en 2 minutes

### 2. Railway
- Interface simple
- Gère les dépendances automatiquement
- Base de données incluse

### 3. Render
- Déploiement facile
- Gère les builds automatiquement
- Support Windows

## 🚨 Dépannage Windows

### Erreur "EPERM: operation not permitted"
```powershell
# Solution 1: Redémarrer l'explorateur
taskkill /f /im explorer.exe
start explorer.exe

# Solution 2: Vider le cache npm
npm cache clean --force

# Solution 3: Utiliser WSL
wsl
cd /mnt/c/Users/mauis/Downloads/cluely-fr
npm install
```

### Erreur "Cannot find module '.prisma/client'"
- Cette erreur est normale sur Windows
- La plateforme de déploiement régénérera Prisma
- Le déploiement fonctionnera quand même

### Erreur de build
```powershell
# Nettoyer et réessayer
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run build
```

## 📋 Checklist de Déploiement Windows

- [ ] Code commité et poussé vers GitHub
- [ ] Variables d'environnement configurées sur la plateforme
- [ ] Base de données PostgreSQL créée
- [ ] Domaine configuré (optionnel)
- [ ] Test de l'application en ligne

## 🎉 Déploiement Réussi !

Une fois déployé, votre application sera accessible en ligne et fonctionnera parfaitement, même si vous aviez des problèmes de permissions en local sur Windows.

---

**Besoin d'aide ?** 
- Consultez `DEPLOYMENT_GUIDE.md` pour plus de détails
- Contactez le support de votre plateforme de déploiement 