import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const userId = user.id

    // Créer des objectifs de test
    const goals = await Promise.all([
      prisma.goal.create({
        data: {
          title: 'Perdre 5 kg',
          description: 'Atteindre un poids santé en 3 mois',
          progress: 30,
          targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          status: 'en_cours',
          category: 'Santé',
          priority: 'haute',
          userId
        }
      }),
      prisma.goal.create({
        data: {
          title: 'Apprendre React',
          description: 'Maîtriser React et Next.js',
          progress: 60,
          targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          status: 'en_cours',
          category: 'Formation',
          priority: 'moyenne',
          userId
        }
      }),
      prisma.goal.create({
        data: {
          title: 'Lire 12 livres',
          description: 'Un livre par mois',
          progress: 25,
          targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          status: 'en_cours',
          category: 'Culture',
          priority: 'basse',
          userId
        }
      })
    ])

    // Créer des tâches de test
    const today = new Date()
    const tasks = await Promise.all([
      prisma.task.create({
        data: {
          title: 'Faire 30 minutes de sport',
          description: 'Cardio ou musculation',
          completed: false,
          dueDate: today,
          priority: 'haute',
          userId
        }
      }),
      prisma.task.create({
        data: {
          title: 'Réviser React Hooks',
          description: 'useState, useEffect, useContext',
          completed: true,
          dueDate: today,
          priority: 'moyenne',
          userId
        }
      }),
      prisma.task.create({
        data: {
          title: 'Appeler le médecin',
          description: 'Prendre rendez-vous pour contrôle',
          completed: false,
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          priority: 'basse',
          userId
        }
      }),
      prisma.task.create({
        data: {
          title: 'Lire chapitre 3 du livre',
          description: 'Continuer la lecture',
          completed: false,
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          priority: 'basse',
          userId
        }
      })
    ])

    // Créer des entrées de journal
    const journalEntries = await Promise.all([
      prisma.journalEntry.create({
        data: {
          title: 'Ma première journée',
          content: 'Aujourd\'hui, j\'ai commencé mon parcours de développement personnel. Je me sens motivé et prêt à relever les défis qui m\'attendent.',
          mood: 'excited',
          tags: ['motivation', 'début'],
          userId
        }
      }),
      prisma.journalEntry.create({
        data: {
          title: 'Réflexions sur mes objectifs',
          content: 'J\'ai réfléchi à mes objectifs et je réalise que je dois être plus spécifique dans mes actions. La clé est la constance.',
          mood: 'reflective',
          tags: ['objectifs', 'réflexion'],
          userId
        }
      })
    ])

    return NextResponse.json({
      message: 'Données de test créées avec succès',
      created: {
        goals: goals.length,
        tasks: tasks.length,
        journalEntries: journalEntries.length
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