import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
    const category = searchParams.get('category')
    const unlocked = searchParams.get('unlocked')

    // Construire la requête
    const where: any = {}
    if (category) {
      where.category = category
    }

    // Récupérer tous les achievements
    const achievements = await prisma.achievement.findMany({
      where,
      orderBy: { points: 'desc' }
    })

    // Récupérer les achievements de l'utilisateur
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId: decoded.userId },
      include: { achievement: true }
    })

    // Combiner les données
    const achievementsWithProgress = achievements.map((achievement: any) => {
      const userAchievement = userAchievements.find((ua: any) => ua.achievementId === achievement.id)
      const isUnlocked = !!userAchievement
      const progress = userAchievement?.progress || 0

      return {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        rarity: achievement.rarity,
        points: achievement.points,
        unlocked: isUnlocked,
        unlockedAt: userAchievement?.unlockedAt,
        progress: progress,
        criteria: achievement.criteria
      }
    })

    // Filtrer par statut si demandé
    const filteredAchievements = unlocked === 'true' 
      ? achievementsWithProgress.filter((a: any) => a.unlocked)
      : unlocked === 'false'
      ? achievementsWithProgress.filter((a: any) => !a.unlocked)
      : achievementsWithProgress

    // Calculer les statistiques
    const stats = {
      total: achievements.length,
      unlocked: userAchievements.length,
      totalPoints: userAchievements.reduce((sum: number, ua: any) => sum + ua.achievement.points, 0),
      completionRate: achievements.length > 0 ? Math.round((userAchievements.length / achievements.length) * 100) : 0
    }

    return NextResponse.json({
      achievements: filteredAchievements,
      stats
    })

  } catch (error) {
    console.error('Erreur lors du chargement des achievements:', error)
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

    const { achievementId } = await request.json()

    if (!achievementId) {
      return NextResponse.json({ error: 'ID d\'achievement requis' }, { status: 400 })
    }

    // Vérifier si l'achievement existe
    const achievement = await prisma.achievement.findUnique({
      where: { id: achievementId }
    })

    if (!achievement) {
      return NextResponse.json({ error: 'Achievement non trouvé' }, { status: 404 })
    }

    // Vérifier si l'utilisateur a déjà cet achievement
    const existingUserAchievement = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId: decoded.userId,
          achievementId
        }
      }
    })

    if (existingUserAchievement) {
      return NextResponse.json({ error: 'Achievement déjà débloqué' }, { status: 400 })
    }

    // Débloquer l'achievement
    const userAchievement = await prisma.userAchievement.create({
      data: {
        userId: decoded.userId,
        achievementId,
        progress: 100
      },
      include: { achievement: true }
    })

    // Créer une notification
    await prisma.notification.create({
      data: {
        title: `Achievement débloqué : ${achievement.name}`,
        message: achievement.description,
        type: 'achievement',
        userId: decoded.userId
      }
    })

    return NextResponse.json({
      success: true,
      achievement: {
        id: userAchievement.id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        rarity: achievement.rarity,
        points: achievement.points,
        unlockedAt: userAchievement.unlockedAt
      }
    })

  } catch (error) {
    console.error('Erreur lors du déblocage de l\'achievement:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 