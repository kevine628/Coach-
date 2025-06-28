# 🧠 CoachIA - Votre Coach IA Personnel

Une application web moderne de coaching personnel développée avec Next.js, Prisma, et Tailwind CSS, conçue spécialement pour les habitudes françaises.

## 🚀 Fonctionnalités Principales

### 📊 **Tableau de Bord**
- Vue d'ensemble des objectifs et progrès
- Statistiques personnalisées
- Rappels et notifications
- Widgets interactifs

### 🎯 **Gestion d'Objectifs**
- Création et suivi d'objectifs personnalisés
- Catégorisation par type (sport, travail, bien-être, etc.)
- Système de progression avec pourcentages
- Rappels et échéances

### 📝 **Journal Personnel**
- Entrées quotidiennes avec humeur
- Système de tags pour organisation
- Recherche et filtres
- Statistiques d'écriture

### 🤖 **Assistant IA**
- Chat interactif avec IA
- Actions rapides prédéfinies
- Conseils personnalisés
- Suivi des conversations

### 🏆 **Système d'Achievements**
- Badges et récompenses
- Progression gamifiée
- Classement des utilisateurs
- Défis personnalisés

### 📈 **Statistiques Avancées**
- Graphiques de progression
- Analyses détaillées
- Tendances et insights
- Rapports personnalisés

### 🔔 **Notifications & Rappels**
- Notifications en temps réel
- Rappels personnalisés
- Système de priorités
- Historique des notifications

### 🔍 **Recherche Globale**
- Recherche dans tous les contenus
- Filtres avancés
- Historique de recherche
- Suggestions intelligentes

## 🛠️ Technologies Utilisées

### **Frontend**
- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes

### **Backend**
- **Next.js API Routes** - API REST
- **Prisma** - ORM pour base de données
- **SQLite** - Base de données (développement)
- **JWT** - Authentification

### **Base de Données**
- **Prisma Schema** - Modèle de données
- **Migrations** - Gestion des versions
- **Relations** - Liens entre entités

## 📁 Structure du Projet

```
cluely-fr/
├── app/                          # Pages Next.js (App Router)
│   ├── api/                      # Routes API
│   │   ├── achievements/         # Système d'achievements
│   │   ├── assistant/           # Assistant IA
│   │   ├── auth/                # Authentification
│   │   ├── dashboard/           # Tableau de bord
│   │   ├── goals/               # Objectifs
│   │   ├── journal/             # Journal
│   │   ├── leaderboard/         # Classement
│   │   ├── notifications/       # Notifications
│   │   ├── profile/             # Profil utilisateur
│   │   ├── rappels/             # Rappels
│   │   ├── recherche/           # Recherche
│   │   ├── seed/                # Données de test
│   │   └── stats/               # Statistiques
│   ├── achievements/            # Page achievements
│   ├── assistant/               # Page assistant
│   ├── connexion/               # Page connexion
│   ├── inscription/             # Page inscription
│   ├── journal/                 # Page journal
│   ├── leaderboard/             # Page classement
│   ├── objectifs/               # Page objectifs
│   ├── profil/                  # Page profil
│   ├── rappels/                 # Page rappels
│   ├── recherche/               # Page recherche
│   ├── statistiques/            # Page statistiques
│   ├── tableau-de-bord/         # Page tableau de bord
│   ├── error.tsx                # Gestion d'erreurs
│   ├── global-error.tsx         # Erreurs globales
│   ├── layout.tsx               # Layout principal
│   ├── not-found.tsx            # Page 404
│   └── page.tsx                 # Page d'accueil
├── components/                   # Composants React
│   ├── ui/                      # Composants UI (shadcn/ui)
│   ├── achievements-widget.tsx  # Widget achievements
│   ├── breadcrumbs.tsx          # Fil d'Ariane
│   ├── error-boundary.tsx       # Gestion d'erreurs
│   ├── loading-spinner.tsx      # Spinner de chargement
│   ├── navigation.tsx           # Navigation
│   ├── notifications.tsx        # Notifications
│   └── theme-provider.tsx       # Thème
├── hooks/                       # Hooks personnalisés
│   ├── use-auth.ts              # Hook authentification
│   └── use-toast.ts             # Hook notifications
├── lib/                         # Utilitaires
│   ├── achievements.ts          # Logique achievements
│   ├── auth.ts                  # Authentification
│   ├── prisma.ts                # Client Prisma
│   └── utils.ts                 # Utilitaires
├── prisma/                      # Base de données
│   ├── migrations/              # Migrations
│   ├── schema.prisma            # Schéma Prisma
│   └── dev.db                   # Base SQLite
├── scripts/                     # Scripts utilitaires
│   ├── init-achievements.js     # Initialisation achievements
│   └── test-achievements.js     # Tests achievements
├── public/                      # Assets statiques
├── styles/                      # Styles globaux
├── middleware.ts                # Middleware Next.js
├── next.config.mjs              # Configuration Next.js
├── tailwind.config.ts           # Configuration Tailwind
├── tsconfig.json                # Configuration TypeScript
└── package.json                 # Dépendances
```

## 🗄️ Modèle de Données

### **Entités Principales**
- **User** - Utilisateurs
- **Goal** - Objectifs
- **Task** - Tâches
- **JournalEntry** - Entrées de journal
- **Achievement** - Achievements
- **Notification** - Notifications
- **UserAchievement** - Liaison utilisateur-achievement

### **Relations**
- Un utilisateur peut avoir plusieurs objectifs
- Un objectif peut avoir plusieurs tâches
- Un utilisateur peut avoir plusieurs entrées de journal
- Un utilisateur peut avoir plusieurs achievements
- Un utilisateur peut avoir plusieurs notifications

## 🚀 Installation et Démarrage

### **Prérequis**
- Node.js 18+
- npm ou pnpm
- Git

### **Installation**
```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd cluely-fr

# Installer les dépendances
npm install

# Configurer la base de données
npx prisma generate
npx prisma db push

# Initialiser les achievements
node scripts/init-achievements.js

# Lancer le serveur de développement
npm run dev
```

### **Variables d'Environnement**
Créer un fichier `.env` :
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="votre_secret_jwt"
```

## 🎯 Fonctionnalités Détaillées

### **Système d'Authentification**
- Inscription/Connexion sécurisée
- JWT pour la session
- Middleware de protection des routes
- Gestion des tokens

### **Gestion des Objectifs**
- CRUD complet des objectifs
- Système de catégories
- Progression en temps réel
- Rappels automatiques

### **Journal Personnel**
- Interface d'écriture intuitive
- Système de tags
- Recherche avancée
- Statistiques d'utilisation

### **Assistant IA**
- Chat interactif
- Actions rapides
- Historique des conversations
- Conseils personnalisés

### **Système d'Achievements**
- Badges automatiques
- Progression gamifiée
- Classement des utilisateurs
- Défis personnalisés

### **Notifications**
- Notifications en temps réel
- Système de priorités
- Marquage lu/non lu
- Historique complet

## 🔧 Configuration

### **Next.js**
- App Router activé
- TypeScript strict
- Optimisations de performance
- SEO optimisé

### **Prisma**
- Migrations automatiques
- Relations optimisées
- Index de performance
- Validation des données

### **Tailwind CSS**
- Design system cohérent
- Composants réutilisables
- Responsive design
- Thème sombre/clair

## 📊 Performance

### **Optimisations**
- Lazy loading des composants
- Optimisation des images
- Code splitting automatique
- Cache intelligent

### **SEO**
- Métadonnées dynamiques
- Open Graph tags
- Sitemap automatique
- Robots.txt optimisé

## 🧪 Tests

### **Scripts de Test**
```bash
# Tester les achievements
node scripts/test-achievements.js

# Vérifier la base de données
npx prisma studio
```

## 🚀 Déploiement

### **Options Recommandées**
- **Vercel** - Déploiement automatique
- **Netlify** - Interface simple
- **Railway** - Backend robuste
- **Heroku** - Solution complète

### **Variables de Production**
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="secret_production"
NODE_ENV="production"
```

## 📝 Changelog

### **Version 1.0.0** - Sauvegarde Complète
- ✅ Système d'authentification complet
- ✅ Gestion des objectifs et tâches
- ✅ Journal personnel avec IA
- ✅ Système d'achievements gamifié
- ✅ Notifications en temps réel
- ✅ Recherche globale
- ✅ Statistiques avancées
- ✅ Interface responsive moderne
- ✅ Base de données optimisée
- ✅ API REST complète

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

---

**CoachIA** - Transformez votre vie avec l'aide de l'IA 🤖✨ 