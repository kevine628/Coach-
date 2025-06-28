import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { action, data } = await request.json()
    const userId = payload.userId

    switch (action) {
      case 'create_goal':
        const goal = await prisma.goal.create({
          data: {
            title: data.title,
            description: data.description,
            targetDate: data.targetDate ? new Date(data.targetDate) : null,
            priority: data.priority || 'medium',
            userId
          }
        })
        return NextResponse.json({ success: true, goal })

      case 'create_task':
        const task = await prisma.task.create({
          data: {
            title: data.title,
            description: data.description,
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
            priority: data.priority || 'medium',
            goalId: data.goalId || null,
            userId
          }
        })
        return NextResponse.json({ success: true, task })

      case 'create_wellness_plan':
        // Créer un plan de bien-être avec plusieurs tâches
        const wellnessGoal = await prisma.goal.create({
          data: {
            title: "Plan de bien-être hebdomadaire",
            description: "Plan personnalisé pour améliorer votre bien-être",
            priority: "high",
            userId
          }
        })

        const wellnessTasks = await prisma.task.createMany({
          data: [
            {
              title: "Méditation matinale (10 min)",
              description: "Commencer la journée avec calme",
              priority: "medium",
              goalId: wellnessGoal.id,
              userId
            },
            {
              title: "Pause déjeuner sans écran",
              description: "Profiter pleinement de votre pause",
              priority: "medium",
              goalId: wellnessGoal.id,
              userId
            },
            {
              title: "Marche en fin de journée (20 min)",
              description: "Se détendre après le travail",
              priority: "low",
              goalId: wellnessGoal.id,
              userId
            }
          ]
        })

        return NextResponse.json({ 
          success: true, 
          goal: wellnessGoal,
          tasksCreated: 3
        })

      case 'create_productivity_plan':
        // Créer un plan de productivité
        const productivityGoal = await prisma.goal.create({
          data: {
            title: "Améliorer ma productivité",
            description: "Plan pour optimiser mon efficacité au travail",
            priority: "high",
            userId
          }
        })

        const productivityTasks = await prisma.task.createMany({
          data: [
            {
              title: "Planifier ma semaine (30 min)",
              description: "Définir les priorités de la semaine",
              priority: "high",
              goalId: productivityGoal.id,
              userId
            },
            {
              title: "Bloquer 2h de travail concentré",
              description: "Temps dédié aux tâches importantes",
              priority: "high",
              goalId: productivityGoal.id,
              userId
            },
            {
              title: "Faire une pause de 5 min toutes les heures",
              description: "Maintenir la concentration",
              priority: "medium",
              goalId: productivityGoal.id,
              userId
            }
          ]
        })

        return NextResponse.json({ 
          success: true, 
          goal: productivityGoal,
          tasksCreated: 3
        })

      default:
        return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 })
    }

  } catch (error) {
    console.error('Erreur lors de l\'exécution de l\'action:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 