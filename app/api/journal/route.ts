import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const userId = payload.userId
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const where: any = { userId }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }

    const entries = await prisma.journalEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    const totalEntries = await prisma.journalEntry.count({ where: { userId } })
    
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const thisWeek = await prisma.journalEntry.count({
      where: {
        userId,
        createdAt: { gte: weekAgo }
      }
    })

    const totalWords = entries.reduce((acc: number, entry: any) => {
      return acc + (entry.content?.split(' ').length || 0)
    }, 0)

    const positiveMoods = await prisma.journalEntry.count({
      where: {
        userId,
        mood: { in: ['excellent', 'bon'] }
      }
    })

    const averageMood = totalEntries > 0 ? (positiveMoods / totalEntries) * 100 : 0

    return NextResponse.json({
      entries: entries.map((entry: any) => ({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        date: entry.createdAt.toISOString().split('T')[0],
        tags: [],
        wordCount: entry.content?.split(' ').length || 0
      })),
      stats: {
        totalEntries,
        thisWeek,
        totalWords,
        averageMood: Math.round(averageMood)
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des entrées:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { title, content, mood } = await request.json()
    const userId = payload.userId

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Titre et contenu requis' },
        { status: 400 }
      )
    }

    const entry = await prisma.journalEntry.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        mood: mood || 'neutre',
        userId
      }
    })

    return NextResponse.json({
      success: true,
      entry: {
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        date: entry.createdAt.toISOString().split('T')[0],
        tags: [],
        wordCount: entry.content.split(' ').length
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erreur lors de la création de l\'entrée:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 