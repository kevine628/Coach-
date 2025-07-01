import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { getAuthenticatedUser } from "../../../lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const userId = user.id

    // Récupérer les objectifs actifs
    const goals = await prisma.goal.findMany({
      where: { 
        userId,
        status: 'en_cours'
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    // Récupérer les tâches du jour
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayTasks = await prisma.task.findMany({
      where: {
        userId,
        dueDate: {
          gte: today,
          lt: tomorrow
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculer les statistiques
    const totalGoals = await prisma.goal.count({
      where: { userId, status: 'en_cours' }
    })

    const completedTasksToday = await prisma.task.count({
      where: {
        userId,
        completed: true,
        updatedAt: {
          gte: today
        }
      }
    })

    const totalTasksToday = await prisma.task.count({
      where: {
        userId,
        dueDate: {
          gte: today,
          lt: tomorrow
        }
      }
    })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: 'Gratuit'
      },
      stats: {
        activeGoals: totalGoals,
        completedTasksToday,
        totalTasksToday,
        wellbeingScore: 8.2
      },
      goals: goals.map((goal: any) => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        progress: goal.progress || 0,
        targetDate: goal.targetDate,
        status: goal.status,
        priority: goal.priority
      })),
      todayTasks: todayTasks.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        dueDate: task.dueDate,
        priority: task.priority
      }))
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des données du tableau de bord:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 