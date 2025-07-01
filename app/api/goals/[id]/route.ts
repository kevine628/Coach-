import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"
import { verifyToken } from "../../../../lib/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const goal = await prisma.goal.findFirst({
      where: {
        id: id,
        userId: decoded.userId
      }
    })

    if (!goal) {
      return NextResponse.json({ error: "Objectif non trouvé" }, { status: 404 })
    }

    return NextResponse.json(goal)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'objectif:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'objectif" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, targetDate, category, priority, progress, status } = body

    // Vérifier que l'objectif appartient à l'utilisateur
    const existingGoal = await prisma.goal.findFirst({
      where: {
        id: id,
        userId: decoded.userId
      }
    })

    if (!existingGoal) {
      return NextResponse.json({ error: "Objectif non trouvé" }, { status: 404 })
    }

    const updatedGoal = await prisma.goal.update({
      where: {
        id: id
      },
      data: {
        title: title || existingGoal.title,
        description: description !== undefined ? description : existingGoal.description,
        targetDate: targetDate ? new Date(targetDate) : existingGoal.targetDate,
        category: category || existingGoal.category,
        priority: priority || existingGoal.priority,
        progress: progress !== undefined ? progress : existingGoal.progress,
        status: status || existingGoal.status
      }
    })

    return NextResponse.json(updatedGoal)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'objectif:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'objectif" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    // Vérifier que l'objectif appartient à l'utilisateur
    const existingGoal = await prisma.goal.findFirst({
      where: {
        id: id,
        userId: decoded.userId
      }
    })

    if (!existingGoal) {
      return NextResponse.json({ error: "Objectif non trouvé" }, { status: 404 })
    }

    await prisma.goal.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({ message: "Objectif supprimé avec succès" })
  } catch (error) {
    console.error("Erreur lors de la suppression de l'objectif:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'objectif" },
      { status: 500 }
    )
  }
} 