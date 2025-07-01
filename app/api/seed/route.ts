import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"
import { AchievementService, ACHIEVEMENTS } from "../../../lib/achievements"

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const userId = decoded.userId

    // Initialiser les achievements
    await AchievementService.initializeAchievements()

    // Créer des objectifs de test
    const goal1 = await prisma.goal.create({
      data: {
        title: "Perdre 5kg en 3 mois",
        description: "Objectif de perte de poids saine et durable",
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 jours
        priority: "haute",
        category: "Fitness",
        status: "en_cours",
        progress: 30,
        userId
      }
    })

    const goal2 = await prisma.goal.create({
      data: {
        title: "Lire 12 livres cette année",
        description: "Développer l'habitude de lecture",
        targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
        priority: "moyenne",
        category: "Apprentissage",
        status: "en_cours",
        progress: 25,
        userId
      }
    })

    // Créer des tâches de test
    await prisma.task.createMany({
      data: [
        {
          title: "Faire 30 minutes de cardio",
          description: "Séance de cardio pour brûler des calories",
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain
          priority: "moyenne",
          completed: false,
          goalId: goal1.id,
          userId
        },
        {
          title: "Lire 30 pages du livre actuel",
          description: "Continuer la lecture du livre en cours",
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
          priority: "basse",
          completed: false,
          goalId: goal2.id,
          userId
        },
        {
          title: "Planifier les repas de la semaine",
          description: "Organiser les repas pour une alimentation équilibrée",
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain
          priority: "haute",
          completed: false,
          userId
        }
      ]
    })

    // Créer des entrées de journal de test
    await prisma.journalEntry.createMany({
      data: [
        {
          title: "Première semaine de fitness",
          content: "J'ai commencé mon programme de fitness cette semaine. Les premières séances ont été difficiles mais je me sens déjà plus énergique. Je vais continuer sur cette lancée !",
          mood: "motivated",
          tags: ["fitness", "motivation", "début"],
          userId
        },
        {
          title: "Réflexion sur mes objectifs",
          content: "Aujourd'hui, j'ai pris le temps de réfléchir à mes objectifs. Je réalise que je dois être plus patient avec moi-même et célébrer les petites victoires.",
          mood: "calm",
          tags: ["réflexion", "objectifs", "patience"],
          userId
        },
        {
          title: "Journée productive",
          content: "Excellente journée aujourd'hui ! J'ai accompli toutes mes tâches importantes et je me sens satisfait de ma productivité. La technique Pomodoro fonctionne vraiment bien pour moi.",
          mood: "happy",
          tags: ["productivité", "satisfaction", "pomodoro"],
          userId
        }
      ]
    })

    // Créer des notifications de test
    await prisma.notification.createMany({
      data: [
        {
          title: "Objectif créé avec succès",
          message: "Votre objectif 'Perdre 5kg en 3 mois' a été créé. Commencez dès aujourd'hui !",
          type: "success",
          read: false,
          userId
        },
        {
          title: "Rappel : Tâche à faire",
          message: "N'oubliez pas de faire votre séance de cardio aujourd'hui",
          type: "reminder",
          read: false,
          userId
        },
        {
          title: "Progression détectée",
          message: "Félicitations ! Vous avez atteint 30% de votre objectif de perte de poids",
          type: "info",
          read: false,
          userId
        },
        {
          title: "Conseil du jour",
          message: "Essayez de boire un verre d'eau au réveil pour bien démarrer votre journée",
          type: "info",
          read: false,
          userId
        }
      ]
    })

    // Vérifier et débloquer les achievements
    const unlockedAchievements = await AchievementService.checkAndUpdateAchievements(userId)

    return NextResponse.json({
      success: true,
      message: "Données de test créées avec succès",
      created: {
        goals: 2,
        tasks: 3,
        journalEntries: 3,
        notifications: 4,
        achievementsUnlocked: unlockedAchievements.length
      }
    })

  } catch (error) {
    console.error('Erreur lors de la création des données de test:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 