import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from "../../../lib/auth"
import { prisma } from "../../../lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const unreadOnly = searchParams.get('unread') === 'true'

    // Construire la requête
    const where = {
      userId: decoded.userId,
      ...(unreadOnly && { read: false })
    }

    // Récupérer les notifications
    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        goal: {
          select: { id: true, title: true }
        },
        task: {
          select: { id: true, title: true }
        }
      }
    })

    // Compter le total
    const total = await prisma.notification.count({ where })
    const unreadCount = await prisma.notification.count({
      where: { userId: decoded.userId, read: false }
    })

    return NextResponse.json({
      notifications: notifications.map(notif => ({
        id: notif.id,
        title: notif.title,
        message: notif.message,
        type: notif.type,
        read: notif.read,
        createdAt: notif.createdAt.toISOString(),
        goal: notif.goal,
        task: notif.task
      })),
      total,
      unreadCount,
      hasMore: total > page * limit
    })

  } catch (error) {
    console.error('Erreur lors du chargement des notifications:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { title, message, type, goalId, taskId } = await request.json()

    if (!title || !message || !type) {
      return NextResponse.json({ error: 'Titre, message et type requis' }, { status: 400 })
    }

    // Créer la notification
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        userId: decoded.userId,
        goalId: goalId || null,
        taskId: taskId || null,
        read: false
      }
    })

    return NextResponse.json({
      success: true,
      notification: {
        id: notification.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: notification.read,
        createdAt: notification.createdAt.toISOString()
      }
    })

  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { action, notificationIds } = await request.json()

    if (!action) {
      return NextResponse.json({ error: 'Action requise' }, { status: 400 })
    }

    switch (action) {
      case 'markRead':
        if (!notificationIds || !Array.isArray(notificationIds)) {
          return NextResponse.json({ error: 'IDs de notifications requis' }, { status: 400 })
        }

        await prisma.notification.updateMany({
          where: {
            id: { in: notificationIds },
            userId: decoded.userId
          },
          data: { read: true }
        })

        return NextResponse.json({ success: true })

      case 'markAllRead':
        await prisma.notification.updateMany({
          where: {
            userId: decoded.userId,
            read: false
          },
          data: { read: true }
        })

        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 })
    }

  } catch (error) {
    console.error('Erreur lors de la mise à jour des notifications:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 