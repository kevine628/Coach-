import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../lib/prisma"
import { verifyToken } from "../../../lib/auth"

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

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    const searchTerm = `%${query}%`

    // Recherche dans les objectifs
    const goals = await prisma.goal.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: searchTerm } },
          { description: { contains: searchTerm } }
        ]
      },
      select: {
        id: true,
        title: true,
        description: true
      },
      take: 5
    })

    // Recherche dans les tâches
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: searchTerm } },
          { description: { contains: searchTerm } }
        ]
      },
      select: {
        id: true,
        title: true,
        description: true
      },
      take: 5
    })

    // Recherche dans les entrées de journal
    const journalEntries = await prisma.journalEntry.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: searchTerm } },
          { content: { contains: searchTerm } }
        ]
      },
      select: {
        id: true,
        title: true,
        content: true
      },
      take: 5
    })

    // Formater les résultats
    const results = [
      ...goals.map((goal: any) => ({
        id: goal.id,
        title: goal.title,
        type: 'goal' as const,
        description: goal.description,
        url: `/objectifs/${goal.id}`
      })),
      ...tasks.map((task: any) => ({
        id: task.id,
        title: task.title,
        type: 'task' as const,
        description: task.description,
        url: `/tableau-de-bord?task=${task.id}`
      })),
      ...journalEntries.map((entry: any) => ({
        id: entry.id,
        title: entry.title || 'Entrée de journal',
        type: 'journal' as const,
        description: entry.content.substring(0, 100) + (entry.content.length > 100 ? '...' : ''),
        url: `/journal/${entry.id}`
      }))
    ]

    // Trier par pertinence (titre en premier, puis description)
    results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(query.toLowerCase())
      const bTitleMatch = b.title.toLowerCase().includes(query.toLowerCase())
      
      if (aTitleMatch && !bTitleMatch) return -1
      if (!aTitleMatch && bTitleMatch) return 1
      
      return 0
    })

    return NextResponse.json({ results: results.slice(0, 10) })
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
} 