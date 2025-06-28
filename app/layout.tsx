import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoachIA - Votre coach IA personnel",
  description:
    "Organisez votre vie, atteignez vos objectifs et améliorez votre bien-être avec l'aide de l'intelligence artificielle. Conçu spécialement pour les habitudes françaises.",
  keywords: "coach IA, productivité, bien-être, objectifs, France, assistant personnel",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
