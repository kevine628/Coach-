import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d'
  })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function getAuthenticatedUser(request: NextRequest) {
  try {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('token')?.value

    if (!token) {
      return null
    }

    // Vérifier le token
    const payload = verifyToken(token)
    if (!payload) {
      return null
    }

    // Récupérer l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        preferences: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return user
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error)
    return null
  }
}

export async function createUser(email: string, password: string, name: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        preferences: {
          theme: 'light',
          notifications: {
            email: true,
            push: false
          },
          language: 'fr'
        }
      }
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error)
    throw error
  }
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  })
}

export async function authenticateUser(email: string, password: string) {
  try {
    // Trouver l'utilisateur par email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return null
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return null
    }

    // Retourner l'utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error)
    return null
  }
} 