"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  isCurrent?: boolean
}

const pathMap: Record<string, string> = {
  'tableau-de-bord': 'Tableau de bord',
  'objectifs': 'Objectifs',
  'nouveau': 'Nouveau',
  'journal': 'Journal',
  'assistant': 'Assistant IA',
  'achievements': 'Achievements',
  'leaderboard': 'Classement',
  'rappels': 'Rappels',
  'recherche': 'Recherche',
  'statistiques': 'Statistiques',
  'profil': 'Profil',
  'connexion': 'Connexion',
  'inscription': 'Inscription',
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', href: '/' }
    ]

    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      const isCurrent = index === segments.length - 1
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {breadcrumb.isCurrent ? (
            <span className="font-medium text-foreground">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              {index === 0 && <Home className="h-4 w-4" />}
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
} 