const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const ACHIEVEMENTS = [
  // Objectifs
  {
    id: 'first-goal',
    name: 'Premier objectif',
    description: 'Créez votre premier objectif',
    icon: 'target',
    category: 'goals',
    rarity: 'common',
    points: 10,
    criteria: { type: 'goals_created', target: 1 }
  },
  {
    id: 'goal-master',
    name: 'Maître des objectifs',
    description: 'Terminez 5 objectifs',
    icon: 'trophy',
    category: 'goals',
    rarity: 'rare',
    points: 50,
    criteria: { type: 'goals_completed', target: 5 }
  },
  {
    id: 'goal-legend',
    name: 'Légende des objectifs',
    description: 'Terminez 20 objectifs',
    icon: 'crown',
    category: 'goals',
    rarity: 'legendary',
    points: 200,
    criteria: { type: 'goals_completed', target: 20 }
  },

  // Tâches
  {
    id: 'first-task',
    name: 'Première tâche',
    description: 'Complétez votre première tâche',
    icon: 'checkCircle',
    category: 'tasks',
    rarity: 'common',
    points: 5,
    criteria: { type: 'tasks_completed', target: 1 }
  },
  {
    id: 'task-completer',
    name: 'Accomplisseur',
    description: 'Terminez 10 tâches',
    icon: 'star',
    category: 'tasks',
    rarity: 'common',
    points: 25,
    criteria: { type: 'tasks_completed', target: 10 }
  },
  {
    id: 'task-master',
    name: 'Maître des tâches',
    description: 'Terminez 50 tâches',
    icon: 'medal',
    category: 'tasks',
    rarity: 'rare',
    points: 100,
    criteria: { type: 'tasks_completed', target: 50 }
  },
  {
    id: 'task-legend',
    name: 'Légende des tâches',
    description: 'Terminez 200 tâches',
    icon: 'crown',
    category: 'tasks',
    rarity: 'legendary',
    points: 500,
    criteria: { type: 'tasks_completed', target: 200 }
  },

  // Journal
  {
    id: 'first-entry',
    name: 'Première entrée',
    description: 'Écrivez votre première entrée de journal',
    icon: 'bookOpen',
    category: 'journal',
    rarity: 'common',
    points: 10,
    criteria: { type: 'journal_entries', target: 1 }
  },
  {
    id: 'journal-writer',
    name: 'Écrivain',
    description: 'Écrivez 5 entrées de journal',
    icon: 'bookOpen',
    category: 'journal',
    rarity: 'common',
    points: 25,
    criteria: { type: 'journal_entries', target: 5 }
  },
  {
    id: 'journal-master',
    name: 'Maître du journal',
    description: 'Écrivez 20 entrées de journal',
    icon: 'award',
    category: 'journal',
    rarity: 'rare',
    points: 75,
    criteria: { type: 'journal_entries', target: 20 }
  },
  {
    id: 'journal-legend',
    name: 'Légende du journal',
    description: 'Écrivez 100 entrées de journal',
    icon: 'crown',
    category: 'journal',
    rarity: 'legendary',
    points: 300,
    criteria: { type: 'journal_entries', target: 100 }
  },

  // Séries
  {
    id: 'streak-3',
    name: 'Série de 3 jours',
    description: 'Maintenez une série de 3 jours consécutifs',
    icon: 'zap',
    category: 'streak',
    rarity: 'common',
    points: 15,
    criteria: { type: 'consecutive_days', target: 3 }
  },
  {
    id: 'streak-7',
    name: 'Série de 7 jours',
    description: 'Maintenez une série de 7 jours consécutifs',
    icon: 'zap',
    category: 'streak',
    rarity: 'rare',
    points: 50,
    criteria: { type: 'consecutive_days', target: 7 }
  },
  {
    id: 'streak-30',
    name: 'Série de 30 jours',
    description: 'Maintenez une série de 30 jours consécutifs',
    icon: 'trendingUp',
    category: 'streak',
    rarity: 'epic',
    points: 200,
    criteria: { type: 'consecutive_days', target: 30 }
  },
  {
    id: 'streak-100',
    name: 'Série de 100 jours',
    description: 'Maintenez une série de 100 jours consécutifs',
    icon: 'crown',
    category: 'streak',
    rarity: 'legendary',
    points: 1000,
    criteria: { type: 'consecutive_days', target: 100 }
  },

  // Spéciaux
  {
    id: 'early-adopter',
    name: 'Adopteur précoce',
    description: 'Utilisez l\'application pendant 7 jours',
    icon: 'award',
    category: 'special',
    rarity: 'common',
    points: 25,
    criteria: { type: 'days_active', target: 7 }
  },
  {
    id: 'dedicated-user',
    name: 'Utilisateur dévoué',
    description: 'Utilisez l\'application pendant 30 jours',
    icon: 'trophy',
    category: 'special',
    rarity: 'rare',
    points: 100,
    criteria: { type: 'days_active', target: 30 }
  },
  {
    id: 'loyal-user',
    name: 'Utilisateur loyal',
    description: 'Utilisez l\'application pendant 100 jours',
    icon: 'crown',
    category: 'special',
    rarity: 'epic',
    points: 300,
    criteria: { type: 'days_active', target: 100 }
  }
]

async function initAchievements() {
  try {
    console.log('🚀 Initialisation des achievements...\n')

    let createdCount = 0
    let updatedCount = 0

    for (const achievementDef of ACHIEVEMENTS) {
      try {
        const achievement = await prisma.achievement.upsert({
          where: { id: achievementDef.id },
          update: {
            name: achievementDef.name,
            description: achievementDef.description,
            icon: achievementDef.icon,
            category: achievementDef.category,
            rarity: achievementDef.rarity,
            points: achievementDef.points,
            criteria: achievementDef.criteria
          },
          create: {
            id: achievementDef.id,
            name: achievementDef.name,
            description: achievementDef.description,
            icon: achievementDef.icon,
            category: achievementDef.category,
            rarity: achievementDef.rarity,
            points: achievementDef.points,
            criteria: achievementDef.criteria
          }
        })

        console.log(`✅ ${achievement.name} (${achievementDef.rarity}) - ${achievementDef.points} points`)
        createdCount++

      } catch (error) {
        console.error(`❌ Erreur pour ${achievementDef.name}:`, error.message)
      }
    }

    console.log(`\n📊 Résumé:`)
    console.log(`   - Achievements traités: ${createdCount}`)

    // Vérifier le résultat
    const totalAchievements = await prisma.achievement.count()
    console.log(`\n🎯 Total achievements dans la base: ${totalAchievements}`)

    if (totalAchievements === ACHIEVEMENTS.length) {
      console.log('✅ Initialisation réussie !')
    } else {
      console.log('⚠️  Certains achievements n\'ont pas été créés')
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter l'initialisation
initAchievements() 