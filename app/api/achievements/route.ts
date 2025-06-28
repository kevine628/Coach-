import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const userId = await verifyToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Récupérer les données utilisateur pour calculer les accomplissements
    const [goals, tasks, journalEntries] = await Promise.all([
      prisma.goal.findMany({
        where: { userId },
        select: {
          id: true,
          status: true,
          createdAt: true
        }
      }),
      prisma.task.findMany({
        where: { userId },
        select: {
          id: true,
          completed: true,
          createdAt: true
        }
      }),
      prisma.journalEntry.findMany({
        where: { userId },
        select: {
          id: true,
          createdAt: true
        }
      })
    ])

    // Calculer les statistiques
    const totalGoals = goals.length
    const completedGoals = goals.filter((g: any) => g.status === 'COMPLETED').length
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((t: any) => t.completed).length
    const journalEntriesCount = journalEntries.length

    // Définir les accomplissements
    const achievements = [
      {
        id: 'first-goal',
        title: 'Premier objectif',
        description: 'Créez votre premier objectif',
        icon: 'target',
        progress: Math.min(totalGoals, 1),
        maxProgress: 1,
        unlocked: totalGoals >= 1,
        category: 'goals' as const
      },
      {
        id: 'goal-master',
        title: 'Maître des objectifs',
        description: 'Terminez 5 objectifs',
        icon: 'trophy',
        progress: Math.min(completedGoals, 5),
        maxProgress: 5,
        unlocked: completedGoals >= 5,
        category: 'goals' as const
      },
      {
        id: 'task-completer',
        title: 'Accomplisseur',
        description: 'Terminez 10 tâches',
        icon: 'checkCircle',
        progress: Math.min(completedTasks, 10),
        maxProgress: 10,
        unlocked: completedTasks >= 10,
        category: 'tasks' as const
      },
      {
        id: 'task-master',
        title: 'Maître des tâches',
        description: 'Terminez 50 tâches',
        icon: 'star',
        progress: Math.min(completedTasks, 50),
        maxProgress: 50,
        unlocked: completedTasks >= 50,
        category: 'tasks' as const
      },
      {
        id: 'journal-writer',
        title: 'Écrivain',
        description: 'Écrivez 5 entrées de journal',
        icon: 'bookOpen',
        progress: Math.min(journalEntriesCount, 5),
        maxProgress: 5,
        unlocked: journalEntriesCount >= 5,
        category: 'journal' as const
      },
      {
        id: 'journal-master',
        title: 'Maître du journal',
        description: 'Écrivez 20 entrées de journal',
        icon: 'heart',
        progress: Math.min(journalEntriesCount, 20),
        maxProgress: 20,
        unlocked: journalEntriesCount >= 20,
        category: 'journal' as const
      },
      {
        id: 'streak-7',
        title: 'Série de 7 jours',
        description: 'Maintenez une série de 7 jours consécutifs',
        icon: 'zap',
        progress: Math.min(completedTasks, 7),
        maxProgress: 7,
        unlocked: completedTasks >= 7,
        category: 'streak' as const
      },
      {
        id: 'streak-30',
        title: 'Série de 30 jours',
        description: 'Maintenez une série de 30 jours consécutifs',
        icon: 'trendingUp',
        progress: Math.min(completedTasks, 30),
        maxProgress: 30,
        unlocked: completedTasks >= 30,
        category: 'streak' as const
      },
      {
        id: 'early-adopter',
        title: 'Adopteur précoce',
        description: 'Utilisez l\'application pendant 7 jours',
        icon: 'award',
        progress: Math.min(completedTasks, 7),
        maxProgress: 7,
        unlocked: completedTasks >= 7,
        category: 'special' as const
      },
      {
        id: 'dedicated-user',
        title: 'Utilisateur dévoué',
        description: 'Utilisez l\'application pendant 30 jours',
        icon: 'trophy',
        progress: Math.min(completedTasks, 30),
        maxProgress: 30,
        unlocked: completedTasks >= 30,
        category: 'special' as const
      }
    ]

    return NextResponse.json({ achievements })
  } catch (error) {
    console.error('Erreur lors du calcul des accomplissements:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 