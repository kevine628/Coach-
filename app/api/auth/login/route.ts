import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Tentative de connexion pour:', email)

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    // Authentifier l'utilisateur
    const user = await authenticateUser(email, password)
    
    if (!user) {
      console.log('Échec de l\'authentification pour:', email)
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    console.log('Authentification réussie pour:', email)

    // Générer le token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    // Créer la réponse avec le cookie ET le token dans le JSON
    const response = NextResponse.json(
      { 
        message: 'Connexion réussie',
        token: token, // Ajouter le token dans la réponse JSON
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 200 }
    )

    // Définir le cookie JWT
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 jours
    })

    console.log('Token généré et cookie défini pour:', email)

    return response

  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 