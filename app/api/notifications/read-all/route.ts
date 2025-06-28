import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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

    // Marquer toutes les notifications comme lues
    const result = await prisma.notification.updateMany({
      where: {
        userId: decoded.userId,
        read: false
      },
      data: { read: true }
    })

    return NextResponse.json({
      success: true,
      updatedCount: result.count
    })

  } catch (error) {
    console.error('Erreur lors du marquage de toutes les notifications:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 