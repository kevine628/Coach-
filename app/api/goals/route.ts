import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const goals = await prisma.goal.findMany({
      where: {
        userId: decoded.userId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(goals)
  } catch (error) {
    console.error("Erreur lors de la récupération des objectifs:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des objectifs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    
    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, targetDate, category, priority } = body

    if (!title) {
      return NextResponse.json({ error: "Le titre est requis" }, { status: 400 })
    }

    const goal = await prisma.goal.create({
      data: {
        title,
        description: description || "",
        targetDate: targetDate ? new Date(targetDate) : null,
        category: category || "Général",
        priority: priority || "moyenne",
        progress: 0,
        status: "en_cours",
        userId: decoded.userId
      }
    })

    return NextResponse.json(goal, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de l'objectif:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de l'objectif" },
      { status: 500 }
    )
  }
} 