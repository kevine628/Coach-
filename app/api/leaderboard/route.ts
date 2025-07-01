import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { verifyToken } from "../../../lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Auth facultative : permet de mettre en avant l'utilisateur connecté
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    let currentUserId: string | null = null
    if (token) {
      const decoded = verifyToken(token)
      if (decoded) currentUserId = decoded.userId
    }

    // Récupérer tous les utilisateurs avec leurs achievements débloqués
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        userAchievements: {
          include: {
            achievement: true
          }
        }
      }
    })

    // Calculer les points pour chaque utilisateur
    const leaderboard = users.map((user: any) => {
      const totalPoints = user.userAchievements.reduce((sum: number, ua: any) => sum + (ua.achievement?.points || 0), 0)
      return {
        id: user.id,
        name: user.name || user.email,
        email: user.email,
        createdAt: user.createdAt,
        totalPoints,
        achievementsCount: user.userAchievements.length,
      }
    })
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((user, idx) => ({ ...user, rank: idx + 1 }))

    // Mettre en avant l'utilisateur connecté (hors top 10)
    let currentUser = null
    if (currentUserId && !leaderboard.slice(0, 10).find(u => u.id === currentUserId)) {
      currentUser = leaderboard.find(u => u.id === currentUserId)
    }

    return NextResponse.json({
      leaderboard: leaderboard.slice(0, 10),
      currentUser
    })
  } catch (error) {
    console.error('Erreur leaderboard:', error)
    return NextResponse.json({ error: 'Erreur serveur leaderboard' }, { status: 500 })
  }
} 