import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from "../../../../lib/auth"
import { prisma } from "../../../../lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Vérifier l'authentification
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Supprimer la notification
    await prisma.notification.delete({
      where: {
        id,
        userId: decoded.userId
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Notification supprimée'
    })

  } catch (error) {
    console.error('Erreur lors de la suppression de la notification:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 