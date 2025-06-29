# 🖥️ CoachIA - Application de Bureau

## 🚀 Développement

### Lancer l'application en mode développement
```bash
npm run electron-dev
```

### Lancer seulement l'application Electron (après avoir démarré Next.js)
```bash
npm run electron
```

## 📦 Build et Distribution

### Créer l'exécutable
```bash
npm run dist
```

### Build pour une plateforme spécifique
```bash
# Windows
npm run dist -- --win

# macOS
npm run dist -- --mac

# Linux
npm run dist -- --linux
```

## 🎯 Fonctionnalités de l'Application de Bureau

### ✅ Fonctionnalités incluses :
- **Interface native** avec menu système
- **Raccourcis clavier** (Ctrl+N, Ctrl+Q, etc.)
- **Fenêtre redimensionnable** (800x600 minimum)
- **Icône personnalisée**
- **Sécurité renforcée** (pas d'accès Node.js depuis le renderer)
- **Navigation externe** dans le navigateur par défaut

### 🎨 Interface utilisateur :
- **Menu Fichier** : Nouveau, Quitter
- **Menu Édition** : Copier, Coller, etc.
- **Menu Affichage** : Zoom, Outils de développement
- **Menu Aide** : À propos

## 🔧 Configuration

### Variables d'environnement :
```env
NODE_ENV=development  # ou production
DATABASE_URL=ton-url-postgresql
JWT_SECRET=ton-secret-jwt
```

### Base de données :
L'application utilise la même base de données que la version web.

## 📱 Distribution

### Windows :
- **Format** : Installateur NSIS (.exe)
- **Dossier** : `dist/win-unpacked/`

### macOS :
- **Format** : Application (.app)
- **Dossier** : `dist/mac/`

### Linux :
- **Format** : AppImage
- **Dossier** : `dist/linux-unpacked/`

## 🚨 Dépannage

### L'application ne démarre pas :
1. Vérifie que Next.js est en cours d'exécution (`npm run dev`)
2. Vérifie les logs dans la console
3. Redémarre l'application

### Erreur de build :
1. Vérifie que toutes les dépendances sont installées
2. Nettoie le cache : `npm run build -- --clean`
3. Vérifie les logs de build

### Problème de base de données :
1. Vérifie que `DATABASE_URL` est correct
2. Teste la connexion à la base
3. Vérifie les logs de l'application

## 🎉 Avantages de l'Application de Bureau

- ✅ **Performance native**
- ✅ **Accès hors ligne** (avec synchronisation)
- ✅ **Notifications système**
- ✅ **Intégration OS**
- ✅ **Sécurité renforcée**
- ✅ **Interface familière**

---

**🎯 CoachIA Desktop - Votre coach personnel toujours à portée de main !** 