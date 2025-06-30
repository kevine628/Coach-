# 🚀 Guide de Déploiement - CoachIA

Ce guide vous accompagne pour déployer votre application CoachIA en production.

## 📋 Prérequis

- ✅ Application fonctionnelle en local
- ✅ Compte GitHub avec votre code
- ✅ Compte sur la plateforme de déploiement choisie
- ✅ Base de données PostgreSQL (pour la production)

## 🔧 Configuration de la Production

### 1. Variables d'Environnement

Créez un fichier `.env.production` avec les variables suivantes :

```env
# Production Environment Variables
NODE_ENV=production

# Database URL (PostgreSQL pour la production)
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT Secret (générez une clé sécurisée)
JWT_SECRET="your-super-secure-jwt-secret-key-here"

# Next.js
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-nextauth-secret"

# Email (optionnel)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# API Keys (optionnel)
OPENAI_API_KEY="your-openai-api-key"
```

### 2. Génération des Clés Secrètes

```bash
# Générer un JWT secret sécurisé
openssl rand -base64 32

# Générer un NextAuth secret
openssl rand -base64 32
```

## 🎯 Options de Déploiement

### Option 1: Vercel (Recommandé) ⭐

**Avantages :**
- Optimisé pour Next.js
- Déploiement automatique
- SSL gratuit
- CDN global
- Interface simple

**Étapes :**

1. **Préparer le repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre compte GitHub
   - Cliquez sur "New Project"
   - Importez votre repository
   - Configurez les variables d'environnement :
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `NEXTAUTH_URL`
     - `NEXTAUTH_SECRET`
   - Cliquez sur "Deploy"

3. **Configurer la base de données**
   - Utilisez Vercel Postgres ou une base externe
   - Exécutez les migrations : `npx prisma db push`

### Option 2: Railway

**Avantages :**
- Déploiement simple
- Base de données PostgreSQL incluse
- Bon pour les applications full-stack

**Étapes :**

1. **Créer un projet Railway**
   - Allez sur [railway.app](https://railway.app)
   - Connectez votre compte GitHub
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"

2. **Ajouter une base de données**
   - Cliquez sur "New"
   - Sélectionnez "Database" → "PostgreSQL"
   - Notez l'URL de connexion

3. **Configurer les variables**
   - Dans votre service, allez dans "Variables"
   - Ajoutez toutes les variables d'environnement
   - Utilisez l'URL de la base de données pour `DATABASE_URL`

4. **Déployer**
   - Railway déploiera automatiquement à chaque push

### Option 3: Render

**Avantages :**
- Déploiement facile
- Base de données PostgreSQL
- SSL gratuit

**Étapes :**

1. **Créer un service web**
   - Allez sur [render.com](https://render.com)
   - Connectez votre compte GitHub
   - Cliquez sur "New" → "Web Service"
   - Importez votre repository

2. **Configuration**
   - **Build Command :** `npm install && npx prisma generate && npm run build`
   - **Start Command :** `npm start`
   - **Environment :** Node

3. **Ajouter une base de données**
   - Créez un nouveau service "PostgreSQL"
   - Copiez l'URL de connexion

4. **Variables d'environnement**
   - Ajoutez toutes les variables nécessaires
   - Utilisez l'URL PostgreSQL pour `DATABASE_URL`

### Option 4: Netlify

**Avantages :**
- Interface simple
- Déploiement depuis Git
- Fonctionnalités avancées

**Étapes :**

1. **Préparer l'application**
   - Assurez-vous que `next.config.mjs` est configuré pour l'export statique
   - Modifiez le script de build dans `package.json`

2. **Déployer**
   - Allez sur [netlify.com](https://netlify.com)
   - Connectez votre compte GitHub
   - Importez votre repository
   - Configurez les variables d'environnement

## 🗄️ Configuration de la Base de Données

### PostgreSQL en Production

1. **Créer une base de données**
   - Utilisez les services intégrés (Railway, Render, Vercel)
   - Ou un service externe (Supabase, PlanetScale, etc.)

2. **Exécuter les migrations**
   ```bash
   npx prisma db push
   # ou
   npx prisma migrate deploy
   ```

3. **Vérifier la connexion**
   ```bash
   npx prisma studio
   ```

## 🔒 Sécurité

### Variables Sensibles

- ✅ Ne jamais commiter les fichiers `.env`
- ✅ Utiliser les variables d'environnement de la plateforme
- ✅ Générer des clés secrètes uniques pour la production
- ✅ Utiliser HTTPS en production

### Base de Données

- ✅ Utiliser des connexions SSL
- ✅ Limiter les accès IP si possible
- ✅ Faire des sauvegardes régulières
- ✅ Monitorer les performances

## 🚀 Déploiement Automatique

### GitHub Actions (Optionnel)

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

## 📊 Monitoring

### Métriques à Surveiller

- ✅ Temps de réponse de l'application
- ✅ Utilisation de la base de données
- ✅ Erreurs 500/404
- ✅ Temps de build
- ✅ Utilisation des ressources

### Outils Recommandés

- **Vercel Analytics** (si sur Vercel)
- **Sentry** (gestion d'erreurs)
- **LogRocket** (monitoring utilisateur)
- **UptimeRobot** (surveillance de disponibilité)

## 🔧 Dépannage

### Problèmes Courants

1. **Erreur de base de données**
   - Vérifiez l'URL de connexion
   - Assurez-vous que la base est accessible
   - Vérifiez les permissions

2. **Build échoue**
   - Vérifiez les dépendances
   - Regardez les logs de build
   - Testez en local avec `npm run build`

3. **Variables d'environnement manquantes**
   - Vérifiez que toutes les variables sont définies
   - Redéployez après avoir ajouté les variables

4. **Erreurs 500**
   - Vérifiez les logs de l'application
   - Testez les routes API
   - Vérifiez la configuration de la base de données

## 📞 Support

Si vous rencontrez des problèmes :

1. ✅ Vérifiez les logs de déploiement
2. ✅ Testez en local avec les mêmes variables
3. ✅ Consultez la documentation de la plateforme
4. ✅ Contactez le support de la plateforme

## 🎉 Félicitations !

Votre application CoachIA est maintenant déployée en production ! 

N'oubliez pas de :
- ✅ Tester toutes les fonctionnalités
- ✅ Configurer un domaine personnalisé
- ✅ Mettre en place le monitoring
- ✅ Faire des sauvegardes régulières

---

**Besoin d'aide ?** Consultez les fichiers de documentation spécifiques à chaque plateforme dans le dossier `/docs`. 