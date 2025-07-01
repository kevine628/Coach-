import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { verifyToken } from "../../../lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const userId = decoded.userId

    // Récupérer les objectifs
    const goals = await prisma.goal.findMany({
      where: { userId },
      include: {
        tasks: true
      }
    })

    // Récupérer les tâches
    const tasks = await prisma.task.findMany({
      where: { userId }
    })

    // Récupérer les entrées de journal
    const journalEntries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    // Récupérer les achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true
      },
      orderBy: { unlockedAt: 'desc' }
    })

    // Calculer les statistiques des objectifs
    const totalGoals = goals.length
    const completedGoals = goals.filter(goal => goal.status === 'COMPLETED').length
    const inProgressGoals = goals.filter(goal => goal.status === 'IN_PROGRESS').length
    const overdueGoals = goals.filter(goal => {
      if (goal.targetDate && goal.status !== 'COMPLETED') {
        return new Date(goal.targetDate) < new Date()
      }
      return false
    }).length

    const goalsByCategory = goals.reduce((acc: any, goal) => {
      const category = goal.category || 'Général'
      if (!acc[category]) {
        acc[category] = { count: 0, completed: 0 }
      }
      acc[category].count++
      if (goal.status === 'COMPLETED') {
        acc[category].completed++
      }
      return acc
    }, {})

    const goalsByCategoryArray = Object.entries(goalsByCategory).map(([category, data]: [string, any]) => ({
      category,
      count: data.count,
      completed: data.completed
    }))

    // Calculer les statistiques des tâches
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length
    const pendingTasks = tasks.filter(task => !task.completed).length
    const overdueTasks = tasks.filter(task => {
      if (task.dueDate && !task.completed) {
        return new Date(task.dueDate) < new Date()
      }
      return false
    }).length

    // Tâches du jour
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const completedToday = tasks.filter(task => 
      task.completed && task.updatedAt && 
      new Date(task.updatedAt) >= today && 
      new Date(task.updatedAt) < tomorrow
    ).length

    // Tâches de la semaine
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const completedThisWeek = tasks.filter(task => 
      task.completed && task.updatedAt && 
      new Date(task.updatedAt) >= weekAgo
    ).length

    // Calculer les statistiques du journal
    const totalEntries = journalEntries.length
    const thisMonth = new Date()
    thisMonth.setMonth(thisMonth.getMonth() - 1)
    const entriesThisMonth = journalEntries.filter(entry => 
      new Date(entry.createdAt) >= thisMonth
    ).length

    const totalWords = journalEntries.reduce((sum: number, entry) => 
      sum + (entry.content?.split(' ').length || 0), 0
    )
    const averageWordsPerEntry = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0

    // Jour le plus actif
    const entriesByDay = journalEntries.reduce((acc: any, entry) => {
      const day = new Date(entry.createdAt).toLocaleDateString('fr-FR', { weekday: 'long' })
      acc[day] = (acc[day] || 0) + 1
      return acc
    }, {})

    const mostActiveDay = Object.entries(entriesByDay).reduce((a, b) => 
      (entriesByDay[a[0]] || 0) > (entriesByDay[b[0]] || 0) ? a : b
    )?.[0] || 'Aucun'

    // Calculer les statistiques des achievements
    const totalAchievements = userAchievements.length
    const unlockedAchievements = userAchievements.length
    const totalPoints = userAchievements.reduce((sum: number, ua: any) => 
      sum + (ua.achievement?.points || 0), 0
    )
    const averagePoints = totalAchievements > 0 ? Math.round(totalPoints / totalAchievements) : 0

    const recentUnlocked = userAchievements.slice(0, 5).map((ua: any) => ({
      id: ua.achievementId,
      name: ua.achievement?.name || 'Achievement inconnu',
      points: ua.achievement?.points || 0,
      unlockedAt: ua.unlockedAt.toISOString()
    }))

    // Générer des données de progression hebdomadaire (simulées pour l'exemple)
    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    const weeklyProgress = daysOfWeek.map(day => ({
      day,
      tasksCompleted: Math.floor(Math.random() * 5) + 1,
      goalsProgress: Math.floor(Math.random() * 100)
    }))

    // Générer des tendances mensuelles (simulées pour l'exemple)
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin']
    const monthlyTrend = months.map(month => ({
      month,
      goalsCompleted: Math.floor(Math.random() * 10) + 1,
      tasksCompleted: Math.floor(Math.random() * 50) + 10
    }))

    const stats = {
      goals: {
        total: totalGoals,
        completed: completedGoals,
        inProgress: inProgressGoals,
        overdue: overdueGoals,
        completionRate: totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0,
        byCategory: goalsByCategoryArray
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        overdue: overdueTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        completedToday,
        completedThisWeek
      },
      journal: {
        totalEntries,
        entriesThisMonth,
        averageWordsPerEntry,
        mostActiveDay
      },
      achievements: {
        total: totalAchievements,
        unlocked: unlockedAchievements,
        totalPoints,
        averagePoints,
        recentUnlocked
      },
      productivity: {
        weeklyProgress,
        monthlyTrend
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Erreur stats:', error)
    return NextResponse.json({ error: 'Erreur serveur stats' }, { status: 500 })
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