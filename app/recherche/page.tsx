"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Target, CheckSquare, BookOpen, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface SearchResult {
  id: string
  title: string
  description?: string
  type: 'goal' | 'task' | 'journal'
  createdAt?: string
  updatedAt?: string
}

export default function RecherchePage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { toast } = useToast()

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté",
          variant: "destructive"
        })
        return
      }

      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la recherche')
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la recherche",
        variant: "destructive"
      })
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return <Target className="w-4 h-4" />
      case 'task':
        return <CheckSquare className="w-4 h-4" />
      case 'journal':
        return <BookOpen className="w-4 h-4" />
      default:
        return <Search className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'goal':
        return 'Objectif'
      case 'task':
        return 'Tâche'
      case 'journal':
        return 'Journal'
      default:
        return type
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'goal':
        return 'bg-blue-100 text-blue-700'
      case 'task':
        return 'bg-green-100 text-green-700'
      case 'journal':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeLink = (type: string) => {
    switch (type) {
      case 'goal':
        return '/objectifs'
      case 'task':
        return '/tableau-de-bord'
      case 'journal':
        return '/journal'
      default:
        return '/'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CoachIA
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/tableau-de-bord" className="text-gray-600 hover:text-gray-900">Tableau de bord</Link>
              <Link href="/objectifs" className="text-gray-600 hover:text-gray-900">Objectifs</Link>
              <Link href="/journal" className="text-gray-600 hover:text-gray-900">Journal</Link>
              <Link href="/assistant" className="text-gray-600 hover:text-gray-900">Assistant IA</Link>
              <Link href="/achievements" className="text-gray-600 hover:text-gray-900">Achievements</Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-gray-900">Classement</Link>
              <Link href="/rappels" className="text-gray-600 hover:text-gray-900">Rappels</Link>
              <Link href="/recherche" className="text-blue-600 font-medium">Recherche</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <Search className="w-10 h-10 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recherche</h1>
            <p className="text-gray-600">Trouvez rapidement vos objectifs, tâches et entrées de journal</p>
          </div>
        </div>

        {/* Barre de recherche */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher dans vos objectifs, tâches, journal..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10"
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(query)
                    }
                  }}
                />
              </div>
              <Button type="submit" disabled={loading || query.length < 2}>
                {loading ? 'Recherche...' : 'Rechercher'}
              </Button>
            </form>
            {query.length > 0 && query.length < 2 && (
              <p className="text-sm text-gray-500 mt-2">
                Tapez au moins 2 caractères pour commencer la recherche
              </p>
            )}
          </CardContent>
        </Card>

        {/* Résultats */}
        {hasSearched && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Résultats de recherche
              </h2>
              {results.length > 0 && (
                <p className="text-sm text-gray-600">
                  {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-500">Recherche en cours...</p>
              </div>
            ) : results.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Aucun élément ne correspond à votre recherche "{query}"
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/objectifs/nouveau">
                        <Target className="w-4 h-4 mr-2" />
                        Créer un objectif
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/journal">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Écrire dans le journal
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {results.map((result) => (
                  <Card key={`${result.type}-${result.id}`} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(result.type)}
                              <Badge variant="outline" className={getTypeColor(result.type)}>
                                {getTypeLabel(result.type)}
                              </Badge>
                            </div>
                            {result.createdAt && (
                              <span className="text-xs text-gray-500">
                                Créé le {formatDate(result.createdAt)}
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">
                            {result.title}
                          </h3>
                          {result.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {truncateText(result.description)}
                            </p>
                          )}
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={getTypeLink(result.type)}>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Suggestions de recherche */}
        {!hasSearched && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Suggestions de recherche</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                setQuery("perte de poids")
                handleSearch("perte de poids")
              }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Objectifs fitness</span>
                  </div>
                  <p className="text-sm text-gray-600">Rechercher vos objectifs de santé et fitness</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                setQuery("tâches urgentes")
                handleSearch("tâches urgentes")
              }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckSquare className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Tâches prioritaires</span>
                  </div>
                  <p className="text-sm text-gray-600">Trouver vos tâches importantes</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                setQuery("réflexions")
                handleSearch("réflexions")
              }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Entrées de journal</span>
                  </div>
                  <p className="text-sm text-gray-600">Retrouver vos pensées et réflexions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 