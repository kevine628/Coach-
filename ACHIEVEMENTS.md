# 🏆 Système d'Achievements - CoachIA

## Vue d'ensemble

Le système d'achievements de CoachIA est conçu pour motiver les utilisateurs en récompensant leurs progrès et leurs accomplissements dans l'application. Il comprend des badges, des points, et des récompenses basées sur l'utilisation des différentes fonctionnalités.

## 🎯 Fonctionnalités principales

### 1. **Achievements prédéfinis**
- **15 achievements** répartis en 5 catégories
- **4 niveaux de rareté** : Common, Rare, Epic, Legendary
- **Système de points** pour chaque achievement
- **Progression automatique** basée sur l'activité utilisateur

### 2. **Catégories d'achievements**

#### 🎯 **Objectifs (Goals)**
- **Premier objectif** : Créer son premier objectif (10 pts)
- **Maître des objectifs** : Terminer 5 objectifs (50 pts)
- **Légende des objectifs** : Terminer 20 objectifs (200 pts)

#### ✅ **Tâches (Tasks)**
- **Première tâche** : Compléter sa première tâche (5 pts)
- **Accomplisseur** : Terminer 10 tâches (25 pts)
- **Maître des tâches** : Terminer 50 tâches (100 pts)
- **Légende des tâches** : Terminer 200 tâches (500 pts)

#### 📖 **Journal (Journal)**
- **Première entrée** : Écrire sa première entrée (10 pts)
- **Écrivain** : Écrire 5 entrées (25 pts)
- **Maître du journal** : Écrire 20 entrées (75 pts)
- **Légende du journal** : Écrire 100 entrées (300 pts)

#### ⚡ **Séries (Streak)**
- **Série de 3 jours** : Maintenir une série de 3 jours (15 pts)
- **Série de 7 jours** : Maintenir une série de 7 jours (50 pts)
- **Série de 30 jours** : Maintenir une série de 30 jours (200 pts)
- **Série de 100 jours** : Maintenir une série de 100 jours (1000 pts)

#### 🏅 **Spéciaux (Special)**
- **Adopteur précoce** : Utiliser l'app pendant 7 jours (25 pts)
- **Utilisateur dévoué** : Utiliser l'app pendant 30 jours (100 pts)
- **Utilisateur loyal** : Utiliser l'app pendant 100 jours (300 pts)

### 3. **Niveaux de rareté**

| Rareté | Couleur | Icône | Points moyens |
|--------|---------|-------|---------------|
| Common | Gris | ⭐ | 10-25 |
| Rare | Bleu | 💎 | 50-100 |
| Epic | Violet | 👑 | 200-300 |
| Legendary | Or | ✨ | 500-1000 |

## 🏗️ Architecture technique

### Base de données

```sql
-- Table des achievements
CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  rarity TEXT DEFAULT 'common',
  points INTEGER DEFAULT 10,
  criteria JSON NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison utilisateur-achievement
CREATE TABLE user_achievements (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  achievementId TEXT NOT NULL,
  unlockedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  progress INTEGER DEFAULT 0,
  UNIQUE(userId, achievementId),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (achievementId) REFERENCES achievements(id)
);
```

### API Routes

#### `GET /api/achievements`
Récupère tous les achievements avec la progression de l'utilisateur.

**Paramètres de requête :**
- `category` : Filtrer par catégorie
- `unlocked` : Filtrer par statut (true/false)

**Réponse :**
```json
{
  "achievements": [
    {
      "id": "first-goal",
      "name": "Premier objectif",
      "description": "Créez votre premier objectif",
      "icon": "target",
      "category": "goals",
      "rarity": "common",
      "points": 10,
      "unlocked": true,
      "unlockedAt": "2024-01-15T10:30:00Z",
      "progress": 100
    }
  ],
  "stats": {
    "total": 15,
    "unlocked": 3,
    "totalPoints": 45,
    "completionRate": 20
  }
}
```

#### `POST /api/achievements`
Débloque manuellement un achievement.

**Corps de la requête :**
```json
{
  "achievementId": "first-goal"
}
```

#### `POST /api/achievements/init`
Initialise tous les achievements dans la base de données.

### Composants React

#### `AchievementsComponent`
Composant principal pour la page d'achievements avec :
- Filtres par catégorie et recherche
- Statistiques globales
- Cartes d'achievements avec progression
- Gestion d'erreurs et initialisation

#### `AchievementsWidget`
Widget compact pour le tableau de bord avec :
- Statistiques résumées
- Achievements récemment débloqués
- Lien vers la page complète

## 🚀 Utilisation

### 1. **Initialisation**
```javascript
// Initialiser les achievements
await fetch('/api/achievements/init', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
})
```

### 2. **Récupération des achievements**
```javascript
// Récupérer tous les achievements
const response = await fetch('/api/achievements', {
  headers: { 'Authorization': `Bearer ${token}` }
})
const { achievements, stats } = await response.json()
```

### 3. **Déblocage manuel**
```javascript
// Débloquer un achievement
await fetch('/api/achievements', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({ achievementId: 'first-goal' })
})
```

## 🔧 Configuration

### Ajouter un nouvel achievement

1. **Définir l'achievement dans `lib/achievements.ts` :**
```typescript
{
  id: 'new-achievement',
  name: 'Nouvel Achievement',
  description: 'Description de l\'achievement',
  icon: 'star',
  category: 'special',
  rarity: 'rare',
  points: 50,
  criteria: { type: 'custom_action', target: 1 }
}
```

2. **Ajouter la logique de progression dans `AchievementService.calculateProgress()` :**
```typescript
case 'custom_action':
  return await calculateCustomAction(user)
```

3. **Initialiser l'achievement :**
```bash
curl -X POST /api/achievements/init
```

### Personnalisation des icônes

Les icônes utilisent le système Lucide React. Ajoutez de nouvelles icônes dans le mapping :

```typescript
const iconMap = {
  'new-icon': <NewIcon className="w-6 h-6" />,
  // ...
}
```

## 📊 Métriques et analytics

### Statistiques disponibles
- **Total achievements** : Nombre total d'achievements
- **Achievements débloqués** : Nombre d'achievements débloqués par utilisateur
- **Points totaux** : Somme des points gagnés
- **Taux de completion** : Pourcentage d'achievements débloqués

### Événements de tracking
- Achievement débloqué
- Progression mise à jour
- Page achievements visitée
- Filtres utilisés

## 🔮 Évolutions futures

### Fonctionnalités prévues
1. **Achievements saisonniers** : Événements temporaires
2. **Système de niveaux** : Basé sur les points d'achievements
3. **Partage social** : Partager ses achievements
4. **Achievements personnalisés** : Créés par l'utilisateur
5. **Récompenses matérielles** : Coupons, réductions, etc.

### Améliorations techniques
1. **Cache Redis** : Pour les performances
2. **WebSockets** : Notifications en temps réel
3. **Analytics avancés** : Comportement utilisateur
4. **API GraphQL** : Requêtes plus flexibles

## 🐛 Dépannage

### Problèmes courants

#### Achievements non initialisés
```bash
# Solution : Initialiser les achievements
curl -X POST http://localhost:3000/api/achievements/init
```

#### Progression non mise à jour
- Vérifier que `AchievementService.checkAndUpdateAchievements()` est appelé
- Contrôler les logs pour les erreurs de calcul

#### Erreurs 401
- Vérifier que le token d'authentification est présent
- Contrôler la validité du token

### Logs utiles
```bash
# Vérifier les achievements dans la base
npx prisma studio

# Tester le système
node scripts/test-achievements.js
```

## 📝 Notes de développement

- Les achievements sont automatiquement débloqués lors de l'utilisation de l'application
- Les notifications sont créées automatiquement lors du déblocage
- Le système est extensible pour de nouveaux types d'achievements
- La progression est calculée en temps réel

---

**Développé avec ❤️ pour CoachIA** 