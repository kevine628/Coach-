import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthenticatedUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const whereClause: any = { userId: user.id }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { tags: { array_contains: [search] } }
      ]
    }

    const entries = await prisma.journalEntry.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      entries: entries.map((entry: any) => ({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        createdAt: entry.createdAt
      }))
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des entrées du journal:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { title, content, mood, tags } = await request.json()

    // Validation
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le contenu est requis' },
        { status: 400 }
      )
    }

    const entry = await prisma.journalEntry.create({
      data: {
        title: title?.trim() || null,
        content: content.trim(),
        mood: mood || null,
        tags: tags || null,
        userId: user.id
      }
    })

    return NextResponse.json({
      message: 'Entrée créée avec succès',
      entry: {
        id: entry.id,
        title: entry.title,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        createdAt: entry.createdAt
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