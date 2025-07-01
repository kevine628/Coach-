import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { verifyToken } from "../../../lib/auth"

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

    // Récupérer les tâches en retard
    const overdueTasks = await prisma.task.findMany({
      where: {
        userId,
        completed: false,
        dueDate: {
          lt: new Date()
        }
      },
      include: {
        goal: {
          select: {
            title: true
          }
        }
      }
    })

    // Récupérer les objectifs avec date limite proche
    const upcomingGoals = await prisma.goal.findMany({
      where: {
        userId,
        status: 'en_cours',
        targetDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
        }
      }
    })

    // Récupérer les tâches du jour
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayTasks = await prisma.task.findMany({
      where: {
        userId,
        completed: false,
        dueDate: {
          gte: today,
          lt: tomorrow
        }
      },
      include: {
        goal: {
          select: {
            title: true
          }
        }
      }
    })

    return NextResponse.json({
      overdueTasks,
      upcomingGoals,
      todayTasks
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des rappels:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const userId = await verifyToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const body = await request.json()
    const { type, title, message, relatedId, relatedType } = body

    // Créer une notification de rappel
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type: 'reminder',
        userId,
        goalId: relatedType === 'goal' ? relatedId : null,
        taskId: relatedType === 'task' ? relatedId : null
      }
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Erreur lors de la création du rappel:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 