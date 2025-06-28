import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Récupérer toutes les données de l'utilisateur
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        goals: true,
        tasks: true,
        journalEntries: true,
        notifications: true,
        chatMessages: true
      }
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Préparer les données pour l'export (sans les mots de passe)
    const exportData = {
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        location: (userData as any).location || null,
        preferences: userData.preferences,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      },
      goals: userData.goals.map(goal => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        progress: goal.progress,
        targetDate: goal.targetDate,
        status: goal.status,
        category: goal.category,
        priority: goal.priority,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt
      })),
      tasks: userData.tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        dueDate: task.dueDate,
        priority: task.priority,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      })),
      journalEntries: userData.journalEntries.map(entry => ({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt
      })),
      notifications: userData.notifications.map(notification => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: notification.read,
        createdAt: notification.createdAt
      })),
      chatMessages: userData.chatMessages.map(message => ({
        id: message.id,
        content: message.content,
        role: message.role,
        createdAt: message.createdAt
      })),
      exportDate: new Date().toISOString(),
      exportVersion: '1.0'
    }

    // Créer la réponse avec le fichier JSON
    const response = new NextResponse(JSON.stringify(exportData, null, 2))
    response.headers.set('Content-Type', 'application/json')
    response.headers.set('Content-Disposition', `attachment; filename="coachia-data-${new Date().toISOString().split('T')[0]}.json"`)

    return response

  } catch (error) {
    console.error('Erreur lors de l\'export des données:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 