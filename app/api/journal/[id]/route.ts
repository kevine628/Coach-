import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../../lib/prisma"
import { verifyToken } from "../../../../lib/auth"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { id } = params
    const userId = payload.userId

    // Vérifier que l'entrée appartient à l'utilisateur
    const entry = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!entry) {
      return NextResponse.json({ error: 'Entrée non trouvée' }, { status: 404 })
    }

    // Supprimer l'entrée
    await prisma.journalEntry.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'entrée:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 