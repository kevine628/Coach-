import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

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

    const preferences = await request.json()

    // Validation des préférences
    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json({ error: 'Préférences invalides' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        preferences
      },
      select: {
        preferences: true
      }
    })

    return NextResponse.json(updatedUser.preferences)
  } catch (error) {
    console.error('Erreur lors de la mise à jour des préférences:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 