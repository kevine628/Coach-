import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Créer une réponse de succès
    const response = NextResponse.json(
      { message: 'Déconnexion réussie' },
      { status: 200 }
    )

    // Supprimer le cookie d'authentification
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0 // Expire immédiatement
    })

    return response

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 