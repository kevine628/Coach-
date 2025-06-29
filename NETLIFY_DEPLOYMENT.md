# 🚀 Déploiement CoachIA sur Netlify

## 📋 Étapes de Déploiement

### 1. Créer un compte Netlify
1. Va sur [netlify.com](https://netlify.com)
2. Clique sur "Sign up"
3. Connecte-toi avec GitHub

### 2. Déployer depuis GitHub
1. Clique sur "New site from Git"
2. Choisis "GitHub"
3. Sélectionne ton repository `kevine628/cluely-fr`
4. Netlify va automatiquement détecter Next.js

### 3. Configuration du build
- **Build command** : `npm run build`
- **Publish directory** : `.next`
- **Node version** : `18`

### 4. Variables d'environnement
Dans "Site settings" → "Environment variables", ajoute :
```env
NODE_ENV=production
JWT_SECRET=860db857b092460d29fb8826e20fb209f1b64cfb5df243f5abf82a86e6ab65ec
DATABASE_URL=ton-url-postgresql
```

### 5. Configuration de la base de données
**Option A : Supabase (Recommandé)**
1. Va sur [supabase.com](https://supabase.com)
2. Crée un nouveau projet
3. Va dans Settings → Database
4. Copie l'URL de connexion

**Option B : Railway PostgreSQL**
1. Crée une base PostgreSQL sur Railway
2. Copie l'URL de connexion

## 🔧 Migration de la Base de Données

Une fois déployé, va dans "Functions" de Netlify et lance :
```bash
npx prisma generate
npx prisma db push
node scripts/init-achievements.js
```

## 🌐 URLs de Déploiement

- **Netlify** : `https://cluely-fr.netlify.app`
- **Domaine personnalisé** : Configurable dans "Domain settings"

## 💰 Coûts

- **Gratuit** : 100GB de bande passante/mois
- **Fonctions serverless** : 125,000 invocations/mois
- **Payant** : $19/mois pour plus de ressources

## 🚨 Dépannage

### Erreur de build
- Vérifie les logs dans "Deployments"
- Assure-toi que toutes les variables sont définies

### Erreur de base de données
- Vérifie que `DATABASE_URL` est correct
- Teste la connexion à la base

### Fonctions serverless
- Les API routes Next.js deviennent des fonctions Netlify
- Vérifie les logs dans "Functions"

## ⚡ Avantages de Netlify

- ✅ **Déploiement ultra-rapide**
- ✅ **CDN global**
- ✅ **Fonctions serverless**
- ✅ **Interface intuitive**
- ✅ **Formulaires intégrés**
- ✅ **Analytics gratuits**

---

**🎉 Ton site CoachIA sera en ligne en 2 minutes !** 