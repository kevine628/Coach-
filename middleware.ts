import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  console.log('Middleware - URL:', request.nextUrl.pathname, 'Token présent:', !!token)

  // Routes protégées
  const protectedRoutes = ['/tableau-de-bord', '/objectifs', '/journal', '/assistant']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    console.log('Route protégée détectée:', request.nextUrl.pathname)
    
    if (!token) {
      console.log('Pas de token, redirection vers /connexion')
      return NextResponse.redirect(new URL('/connexion', request.url))
    }

    // Pour l'instant, on accepte tout token présent
    // La vérification complète se fera côté serveur dans les API routes
    console.log('Token présent, accès autorisé')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tableau-de-bord/:path*', '/objectifs/:path*', '/journal/:path*', '/assistant/:path*']
} 