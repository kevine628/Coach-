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

    // Récupérer toutes les données de l'utilisateur
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        goals: {
          include: {
            tasks: true
          }
        },
        journalEntries: true,
        chatMessages: true
      }
    })

    if (!userData) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Préparer les données pour l'export
    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
        preferences: userData.preferences,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      },
      goals: userData.goals.map((goal: any) => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        category: goal.category,
        status: goal.status,
        progress: goal.progress,
        dueDate: goal.dueDate,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt,
        tasks: goal.tasks.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          completed: task.completed,
          dueDate: task.dueDate,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt
        }))
      })),
      journalEntries: userData.journalEntries.map((entry: any) => ({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt
      })),
      chatMessages: userData.chatMessages.map((message: any) => ({
        id: message.id,
        content: message.content,
        role: message.role,
        createdAt: message.createdAt
      }))
    }

    // Créer le fichier JSON
    const jsonString = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="mes-donnees-coachia.json"'
      }
    })
  } catch (error) {
    console.error('Erreur lors de l\'export des données:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 