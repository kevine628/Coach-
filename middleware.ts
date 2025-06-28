import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  // Routes protégées
  const protectedRoutes = ['/tableau-de-bord', '/objectifs', '/journal', '/assistant']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/connexion', request.url))
    }

    try {
      const payload = verifyToken(token)
      if (!payload) {
        return NextResponse.redirect(new URL('/connexion', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/connexion', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tableau-de-bord/:path*', '/objectifs/:path*', '/journal/:path*', '/assistant/:path*']
} 