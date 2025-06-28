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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        location: true,
        preferences: true,
        goals: {
          select: {
            id: true,
            status: true,
            progress: true
          }
        },
        tasks: {
          select: {
            id: true,
            completed: true
          }
        },
        journalEntries: {
          select: {
            id: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Calculer les statistiques
    const stats = {
      totalGoals: user.goals.length,
      completedGoals: user.goals.filter((g: any) => g.status === 'COMPLETED').length,
      totalTasks: user.tasks.length,
      completedTasks: user.tasks.filter((t: any) => t.completed).length,
      journalEntries: user.journalEntries.length,
      streakDays: 0 // À implémenter avec un système de suivi des jours consécutifs
    }

    // Préférences par défaut si elles n'existent pas
    const preferences = user.preferences || {
      notifications: {
        email: true,
        push: true,
        reminders: true
      },
      privacy: {
        profileVisibility: 'private',
        dataSharing: false
      },
      theme: 'system',
      language: 'fr'
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      location: user.location,
      preferences,
      stats
    })
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error)
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
    const { name, email, phone, location } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 })
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: userId }
      }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        phone: phone || null,
        location: location || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        location: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const userId = await verifyToken(token)
    if (!userId) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Supprimer l'utilisateur et toutes ses données associées
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({ message: 'Compte supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 