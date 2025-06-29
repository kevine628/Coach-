# 🚀 Déploiement CoachIA sur Render

## 📋 Étapes de Déploiement

### 1. Créer un compte Render
1. Va sur [render.com](https://render.com)
2. Clique sur "Get Started for Free"
3. Connecte-toi avec GitHub

### 2. Créer un nouveau Web Service
1. Clique sur "New" → "Web Service"
2. Connecte ton repository GitHub `kevine628/cluely-fr`
3. Render va automatiquement détecter Next.js

### 3. Configuration du service
- **Name** : `cluely-fr`
- **Environment** : `Node`
- **Build Command** : `npm install && npx prisma generate && npm run build`
- **Start Command** : `npm start`
- **Plan** : `Free`

### 4. Variables d'environnement
Dans "Environment Variables", ajoute :
```env
NODE_ENV=production
JWT_SECRET=860db857b092460d29fb8826e20fb209f1b64cfb5df243f5abf82a86e6ab65ec
```

### 5. Créer la base de données PostgreSQL
1. Clique sur "New" → "PostgreSQL"
2. Nomme-la `cluely-fr-db`
3. Plan : `Free`
4. Copie l'URL de connexion

### 6. Lier la base de données
1. Va dans ton service web
2. "Environment" → "Environment Variables"
3. Ajoute : `DATABASE_URL` = URL de ta base PostgreSQL

## 🔧 Migration de la Base de Données

Une fois déployé, va dans "Shell" de ton service et lance :
```bash
npx prisma db push
node scripts/init-achievements.js
```

## 🌐 URLs de Déploiement

- **Render** : `https://cluely-fr.onrender.com`
- **Domaine personnalisé** : Configurable dans "Settings"

## 💰 Coûts

- **Gratuit** : Service web + base PostgreSQL
- **Limitations** : Service peut "s'endormir" après 15 min d'inactivité
- **Payant** : $7/mois pour service toujours actif

## 🚨 Dépannage

### Service qui ne démarre pas
- Vérifie les logs dans "Logs"
- Assure-toi que `DATABASE_URL` est correct

### Erreur de build
- Vérifie que toutes les dépendances sont installées
- Regarde les logs de build

---

**🎉 Ton site CoachIA sera en ligne en 5 minutes !** 