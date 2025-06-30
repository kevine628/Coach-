import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    // Récupérer l'utilisateur authentifié
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      )
    }

    const preferences = await request.json()

    // Mettre à jour les préférences
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        preferences: JSON.stringify(preferences)
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        preferences: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return NextResponse.json({
      message: 'Préférences mises à jour avec succès',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        preferences: updatedUser.preferences ? JSON.parse(updatedUser.preferences) : null
      }
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour des préférences:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 