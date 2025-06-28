# 🚀 Guide de Déploiement - CoachIA

## 📋 Prérequis

- Compte GitHub
- Compte Vercel (gratuit)
- Base de données PostgreSQL (Vercel Postgres, Supabase, ou Railway)

## 🔧 Étapes de Déploiement

### 1. Préparer le Repository Git

```bash
# Initialiser Git (si pas déjà fait)
git init
git add .
git commit -m "Préparation pour déploiement"

# Créer un repository sur GitHub et pousser le code
git remote add origin https://github.com/ton-username/cluely-fr.git
git push -u origin main
```

### 2. Configurer la Base de Données

#### Option A : Vercel Postgres (Recommandé)
1. Va sur https://vercel.com/dashboard
2. Clique sur "New Project" → "Storage" → "Postgres"
3. Configure ta base de données
4. Copie l'URL de connexion (format: `postgresql://...`)

#### Option B : Supabase (Gratuit)
1. Va sur https://supabase.com
2. Crée un nouveau projet
3. Va dans Settings → Database
4. Copie l'URL de connexion

#### Option C : Railway
1. Va sur https://railway.app
2. Crée un nouveau projet
3. Ajoute une base PostgreSQL
4. Copie l'URL de connexion

### 3. Déployer sur Vercel

```bash
# Se connecter à Vercel
npx vercel login

# Déployer le projet
npx vercel

# Suivre les instructions :
# - Link to existing project? → No
# - Project name → cluely-fr (ou ton nom)
# - Directory → ./
# - Override settings? → No
```

### 4. Configurer les Variables d'Environnement

Sur le dashboard Vercel :
1. Va dans ton projet
2. Settings → Environment Variables
3. Ajoute ces variables :

```
DATABASE_URL = postgresql://ton-url-de-connexion
JWT_SECRET = ton-secret-jwt-super-securise
NODE_ENV = production
```

### 5. Migrer la Base de Données

```bash
# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers la base de production
npx prisma db push

# Initialiser les achievements
node scripts/init-achievements.js
```

### 6. Déployer en Production

```bash
# Déployer la version finale
npx vercel --prod
```

## 🌐 URLs de Déploiement

- **Preview** : `https://cluely-fr-git-main-ton-username.vercel.app`
- **Production** : `https://cluely-fr.vercel.app` (après configuration du domaine)

## 🔧 Configuration Avancée

### Domaine Personnalisé
1. Va dans Settings → Domains
2. Ajoute ton domaine
3. Configure les DNS selon les instructions

### Variables d'Environnement Supplémentaires
```
OPENAI_API_KEY = ta-cle-api-openai
NEXT_PUBLIC_APP_URL = https://ton-domaine.com
```

## 🚨 Dépannage

### Erreur de Build
```bash
# Vérifier les logs
npx vercel logs

# Rebuild localement
npm run build
```

### Erreur de Base de Données
```bash
# Vérifier la connexion
npx prisma db pull

# Reset si nécessaire
npx prisma db push --force-reset
```

### Erreur de Variables d'Environnement
- Vérifier que toutes les variables sont définies
- Redéployer après modification des variables

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- Documentation Prisma : https://www.prisma.io/docs
- Issues GitHub : [ton-repo]/issues

---

**🎉 Ton site CoachIA est maintenant en ligne !** 