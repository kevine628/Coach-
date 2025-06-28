import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: (user as any).location || null,
        preferences: user.preferences,
        plan: 'Gratuit', // À remplacer par la logique de plan
        createdAt: user.createdAt
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { name, phone, location } = await request.json()

    // Validation
    if (name && name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le nom ne peut pas être vide' },
        { status: 400 }
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name?.trim() || null,
        phone: phone?.trim() || null,
        location: location?.trim() || null
      }
    })

    return NextResponse.json({
      message: 'Profil mis à jour avec succès',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        preferences: updatedUser.preferences,
        plan: 'Gratuit',
        createdAt: updatedUser.createdAt
      }
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Supprimer l'utilisateur et toutes ses données (cascade)
    await prisma.user.delete({
      where: { id: user.id }
    })

    // Créer une réponse qui supprime le cookie
    const response = NextResponse.json(
      { message: 'Compte supprimé avec succès' },
      { status: 200 }
    )

    // Supprimer le cookie d'authentification
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    })

    return response

  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 