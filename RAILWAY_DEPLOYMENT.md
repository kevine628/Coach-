# 🚂 Déploiement CoachIA sur Railway

## 📋 Étapes de Déploiement

### 1. Créer un compte Railway
1. Va sur [railway.app](https://railway.app)
2. Clique sur "Start a New Project"
3. Connecte-toi avec GitHub

### 2. Créer le projet
1. Clique sur "Deploy from GitHub repo"
2. Sélectionne ton repository `cluely-fr`
3. Railway va automatiquement détecter Next.js

### 3. Ajouter une base de données PostgreSQL
1. Dans ton projet Railway, clique sur "New"
2. Sélectionne "Database" → "PostgreSQL"
3. Railway va créer automatiquement la base

### 4. Configurer les variables d'environnement
1. Va dans "Variables" de ton projet
2. Ajoute ces variables :

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=ton-secret-jwt-super-securise-32-caracteres
NODE_ENV=production
```

### 5. Déployer
1. Railway va automatiquement déployer
2. Va dans "Deployments" pour voir le statut
3. Clique sur le domaine généré pour voir ton site

## 🔧 Configuration Avancée

### Domaine Personnalisé
1. Va dans "Settings" → "Domains"
2. Ajoute ton domaine
3. Configure les DNS selon les instructions

### Variables Supplémentaires
```env
OPENAI_API_KEY=ta-cle-api-openai
NEXT_PUBLIC_APP_URL=https://ton-domaine.com
```

## 🗄️ Migration de la Base de Données

Une fois déployé, va dans "Connect" de ta base PostgreSQL et lance :

```bash
npx prisma generate
npx prisma db push
node scripts/init-achievements.js
```

## 🌐 URLs de Déploiement

- **Railway** : `https://ton-projet.railway.app`
- **Domaine personnalisé** : `https://ton-domaine.com`

## 💰 Coûts

- **Gratuit** : 500 heures/mois
- **Payant** : $5/mois pour plus de ressources

## 🚨 Dépannage

### Erreur de Build
- Vérifie les logs dans "Deployments"
- Assure-toi que toutes les variables sont définies

### Erreur de Base de Données
- Vérifie que `DATABASE_URL` est correct
- Redémarre le service si nécessaire

---

**🎉 Ton site CoachIA sera en ligne en 5 minutes !** 