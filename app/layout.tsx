import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { Toaster } from "../components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoachIA - Votre coach IA personnel",
  description:
    "Organisez votre vie, atteignez vos objectifs et améliorez votre bien-être avec l'aide de l'intelligence artificielle. Conçu spécialement pour les habitudes françaises.",
  keywords: "coach IA, productivité, bien-être, objectifs, France, assistant personnel",
  authors: [{ name: "CoachIA Team" }],
  creator: "CoachIA",
  publisher: "CoachIA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://coachia.fr'),
  openGraph: {
    title: "CoachIA - Votre coach IA personnel",
    description: "Organisez votre vie, atteignez vos objectifs et améliorez votre bien-être avec l'aide de l'intelligence artificielle.",
    url: 'https://coachia.fr',
    siteName: 'CoachIA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CoachIA - Coach IA personnel',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CoachIA - Votre coach IA personnel",
    description: "Organisez votre vie, atteignez vos objectifs et améliorez votre bien-être avec l'aide de l'intelligence artificielle.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
