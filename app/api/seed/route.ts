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

    const userId = payload.userId

    // Créer des objectifs de test
    const goal1 = await prisma.goal.create({
      data: {
        title: "Améliorer ma forme physique",
        description: "Faire du sport régulièrement et manger plus sainement",
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
        priority: "high",
        userId
      }
    })

    const goal2 = await prisma.goal.create({
      data: {
        title: "Apprendre le piano",
        description: "Pratiquer 20 minutes par jour",
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 jours
        priority: "medium",
        userId
      }
    })

    // Créer des tâches de test
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await prisma.task.createMany({
      data: [
        {
          title: "Séance de sport (30 min)",
          description: "Cardio et musculation",
          dueDate: today,
          priority: "high",
          completed: true,
          userId
        },
        {
          title: "Pratiquer le piano (20 min)",
          description: "Nouvelle partition",
          dueDate: today,
          priority: "medium",
          completed: false,
          userId
        },
        {
          title: "Lire 10 pages",
          description: "Livre en cours",
          dueDate: today,
          priority: "low",
          completed: false,
          userId
        },
        {
          title: "Méditation (10 min)",
          description: "Séance de relaxation",
          dueDate: today,
          priority: "medium",
          completed: true,
          userId
        }
      ]
    })

    return NextResponse.json({ 
      message: 'Données de test créées avec succès',
      goals: [goal1, goal2]
    })

  } catch (error) {
    console.error('Erreur lors de la création des données de test:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 