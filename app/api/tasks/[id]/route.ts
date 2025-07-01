import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "../../../../lib/prisma"
import { verifyToken } from "../../../../lib/auth"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { completed } = await request.json()

    // Vérifier que la tâche appartient à l'utilisateur
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: payload.userId
      }
    })

    if (!task) {
      return NextResponse.json({ error: 'Tâche non trouvée' }, { status: 404 })
    }

    // Mettre à jour la tâche
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed }
    })

    return NextResponse.json(updatedTask)

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 