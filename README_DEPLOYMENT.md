# 🚀 Déploiement Rapide - CoachIA

## ⚡ Déploiement Express (5 minutes)

### 1. Préparation
```bash
# Tester que tout fonctionne
npm run deploy-prep

# Commiter les changements
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Choisir votre plateforme

#### 🎯 **Vercel** (Recommandé - 2 minutes)
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez GitHub
3. Importez votre repo
4. Ajoutez les variables d'environnement :
   - `DATABASE_URL` (PostgreSQL)
   - `JWT_SECRET` (générez avec `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (votre domaine)
   - `NEXTAUTH_SECRET` (générez avec `openssl rand -base64 32`)
5. Déployez !

#### 🚂 **Railway** (3 minutes)
1. Allez sur [railway.app](https://railway.app)
2. Connectez GitHub
3. Créez un projet
4. Ajoutez PostgreSQL
5. Configurez les variables d'environnement
6. Déployez !

#### 🌐 **Render** (3 minutes)
1. Allez sur [render.com](https://render.com)
2. Connectez GitHub
3. Créez un Web Service
4. Ajoutez PostgreSQL
5. Configurez les variables
6. Déployez !

## 🔧 Configuration Requise

### Variables d'Environnement
```env
DATABASE_URL="postgresql://user:pass@host:port/db"
JWT_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-nextauth-secret"
```

### Base de Données PostgreSQL
- **Vercel** : Utilisez Vercel Postgres
- **Railway** : Base incluse
- **Render** : Base incluse
- **Autre** : Supabase, PlanetScale, etc.

## 🚨 Problèmes Courants

### Erreur de build
```bash
npm run test-build
```

### Erreur de base de données
- Vérifiez l'URL PostgreSQL
- Exécutez `npx prisma db push`

### Variables manquantes
- Vérifiez toutes les variables dans votre plateforme
- Redéployez après ajout

## 📞 Support

- **Vercel** : [docs.vercel.com](https://docs.vercel.com)
- **Railway** : [docs.railway.app](https://docs.railway.app)
- **Render** : [render.com/docs](https://render.com/docs)

## 🎉 C'est tout !

Votre CoachIA sera en ligne en quelques minutes !

---

**Besoin d'aide détaillée ?** Consultez `DEPLOYMENT_GUIDE.md` 