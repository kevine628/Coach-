import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const preferences = await request.json()

    // Validation des préférences
    if (!preferences || typeof preferences !== 'object') {
      return NextResponse.json(
        { error: 'Préférences invalides' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        preferences: preferences
      }
    })

    return NextResponse.json({
      message: 'Préférences mises à jour avec succès',
      preferences: updatedUser.preferences
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour des préférences:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 