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

    // Récupérer les données de base
    const [goals, tasks, journalEntries] = await Promise.all([
      prisma.goal.findMany({
        where: { userId },
        select: {
          id: true,
          status: true,
          category: true,
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

    // Calculer les statistiques de base
    const totalGoals = goals.length
    const completedGoals = goals.filter(g => g.status === 'COMPLETED').length
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.completed).length
    const journalEntriesCount = journalEntries.length

    // Calculer les jours consécutifs (simulation)
    const streakDays = Math.min(completedTasks, 30) // Simplifié pour l'exemple

    // Calculer les catégories populaires
    const categoryCounts = goals.reduce((acc: any, goal) => {
      acc[goal.category] = (acc[goal.category] || 0) + 1
      return acc
    }, {})

    const categories = Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name,
        count: count as number,
        color: getCategoryColor(name)
      }))
      .sort((a, b) => b.count - a.count)

    // Calculer la progression hebdomadaire (simulation)
    const weeklyProgress = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return {
        date: date.toISOString().split('T')[0],
        tasksCompleted: Math.floor(Math.random() * 5) + 1,
        goalsProgress: Math.floor(Math.random() * 20) + 10
      }
    }).reverse()

    return NextResponse.json({
      totalGoals,
      completedGoals,
      totalTasks,
      completedTasks,
      journalEntries: journalEntriesCount,
      streakDays,
      weeklyProgress,
      categories
    })
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

function getCategoryColor(category: string): string {
  const colors = {
    'Général': '#3B82F6',
    'Travail': '#10B981',
    'Santé': '#F59E0B',
    'Personnel': '#8B5CF6',
    'Finance': '#EF4444',
    'Éducation': '#06B6D4',
    'Sport': '#84CC16',
    'Créativité': '#EC4899'
  }
  
  return colors[category as keyof typeof colors] || '#6B7280'
} 