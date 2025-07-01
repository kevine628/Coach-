import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import { getAuthenticatedUser } from "../../../lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({
      goals: goals.map((goal: any) => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        progress: goal.progress || 0,
        targetDate: goal.targetDate,
        status: goal.status,
        category: goal.category,
        priority: goal.priority,
        createdAt: goal.createdAt
      }))
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des objectifs:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    
    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { title, description, targetDate, category, priority } = await request.json()

    if (!title) {
      return NextResponse.json(
        { error: "Le titre est requis" },
        { status: 400 }
      )
    }

    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        targetDate: targetDate ? new Date(targetDate) : null,
        category: category || "Général",
        priority: priority || "moyenne",
        userId: user.id
      }
    })

    return NextResponse.json({
      message: "Objectif créé avec succès",
      goal: {
        id: goal.id,
        title: goal.title,
        description: goal.description,
        progress: goal.progress,
        targetDate: goal.targetDate,
        status: goal.status,
        category: goal.category,
        priority: goal.priority,
        createdAt: goal.createdAt
      }
    }, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de l'objectif:", error)
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    )
  }
} 