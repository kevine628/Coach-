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

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        goal: {
          select: {
            id: true,
            title: true
          }
        },
        task: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    const total = await prisma.notification.count({
      where: { userId }
    })

    const unreadCount = await prisma.notification.count({
      where: { 
        userId,
        read: false
      }
    })

    return NextResponse.json({
      notifications,
      total,
      unreadCount,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error)
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
    const { title, message, type, goalId, taskId } = body

    if (!title || !message || !type) {
      return NextResponse.json({ error: 'Titre, message et type requis' }, { status: 400 })
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        userId,
        goalId: goalId || null,
        taskId: taskId || null
      }
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
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
    const { action, notificationIds } = body

    if (action === 'markAllRead') {
      await prisma.notification.updateMany({
        where: { 
          userId,
          read: false
        },
        data: { read: true }
      })
    } else if (action === 'markRead' && notificationIds) {
      await prisma.notification.updateMany({
        where: { 
          id: { in: notificationIds },
          userId
        },
        data: { read: true }
      })
    }

    return NextResponse.json({ message: 'Notifications mises à jour' })
  } catch (error) {
    console.error('Erreur lors de la mise à jour des notifications:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 