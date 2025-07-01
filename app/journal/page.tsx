"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import {
  Brain,
  BookOpen,
  Plus,
  Search,
  Calendar,
  Heart,
  Smile,
  Meh,
  Frown,
  Bell,
  Settings,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import NotificationsComponent from "../../components/notifications"

interface JournalEntry {
  id: string
  title: string | null
  content: string
  mood: string | null
  tags: string[] | null
  createdAt: string
}

export default function JournalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isWriting, setIsWriting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "",
    tags: ""
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/journal')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du journal')
      }
      const data = await response.json()
      setEntries(data.entries)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newEntry.title || null,
          content: newEntry.content,
          mood: newEntry.mood || null,
          tags: newEntry.tags ? newEntry.tags.split(',').map(tag => tag.trim()) : null
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de la création')
      }

      // Réinitialiser le formulaire et fermer le dialogue
      setNewEntry({ title: "", content: "", mood: "", tags: "" })
      setIsDialogOpen(false)
      
      // Recharger les entrées
      fetchEntries()
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la création')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) return

    try {
      const response = await fetch(`/api/journal/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      setEntries(entries.filter(entry => entry.id !== id))
      fetchEntries() // Recharger les statistiques
    } catch (error) {
      console.error('Erreur:', error)
      setError(error instanceof Error ? error.message : 'Erreur lors de la suppression')
    }
  }

  const getMoodIcon = (mood: string | null) => {
    switch (mood) {
      case 'happy': return '😊'
      case 'sad': return '😢'
      case 'excited': return '🤩'
      case 'calm': return '😌'
      case 'stressed': return '😰'
      case 'grateful': return '🙏'
      case 'motivated': return '💪'
      case 'tired': return '😴'
      default: return '😐'
    }
  }

  const getMoodLabel = (mood: string | null) => {
    switch (mood) {
      case 'happy': return 'Heureux'
      case 'sad': return 'Triste'
      case 'excited': return 'Excité'
      case 'calm': return 'Calme'
      case 'stressed': return 'Stressé'
      case 'grateful': return 'Reconnaissant'
      case 'motivated': return 'Motivé'
      case 'tired': return 'Fatigué'
      default: return 'Neutre'
    }
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const stats = {
    total: entries.length,
    thisWeek: entries.filter(e => {
      const entryDate = new Date(e.createdAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo
    }).length,
    averageMood: entries.length > 0 ? 
      entries.filter(e => e.mood).length / entries.length * 100 : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du journal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CoachIA
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/tableau-de-bord" className="text-gray-600 hover:text-gray-900">
                Tableau de bord
              </Link>
              <Link href="/objectifs" className="text-gray-600 hover:text-gray-900">
                Objectifs
              </Link>
              <Link href="/journal" className="text-blue-600 font-medium">
                Journal
              </Link>
              <Link href="/assistant" className="text-gray-600 hover:text-gray-900">
                Assistant IA
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <NotificationsComponent />
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              Mon Journal
            </h1>
            <p className="text-gray-600 mt-1">Exprimez vos pensées, suivez votre évolution personnelle</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle entrée
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nouvelle entrée de journal</DialogTitle>
                <DialogDescription>
                  Prenez le temps de réfléchir à votre journée et notez vos pensées
                </DialogDescription>
              </DialogHeader>
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Titre (optionnel)</label>
                  <Input
                    placeholder="Titre de votre entrée..."
                    value={newEntry.title}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contenu *</label>
                  <Textarea
                    placeholder="Comment vous sentez-vous aujourd'hui ? Qu'avez-vous accompli ? Quelles sont vos réflexions ?"
                    value={newEntry.content}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Humeur</label>
                    <Select value={newEntry.mood} onValueChange={(value) => setNewEntry(prev => ({ ...prev, mood: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une humeur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="happy">😊 Heureux</SelectItem>
                        <SelectItem value="sad">😢 Triste</SelectItem>
                        <SelectItem value="excited">🤩 Excité</SelectItem>
                        <SelectItem value="calm">😌 Calme</SelectItem>
                        <SelectItem value="stressed">😰 Stressé</SelectItem>
                        <SelectItem value="grateful">🙏 Reconnaissant</SelectItem>
                        <SelectItem value="motivated">💪 Motivé</SelectItem>
                        <SelectItem value="tired">😴 Fatigué</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags (optionnel)</label>
                    <Input
                      placeholder="travail, famille, sport..."
                      value={newEntry.tags}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                    />
                    <p className="text-xs text-gray-500">Séparez les tags par des virgules</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSubmitting || !newEntry.content.trim()}
                  >
                    {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total entrées</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cette semaine</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Humeur suivie</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(stats.averageMood)}%</p>
                </div>
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher dans vos entrées..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Entries List */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchEntries}>Réessayer</Button>
          </div>
        )}

        {!error && filteredEntries.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune entrée trouvée</h3>
              <p className="text-gray-600 mb-6">
                {entries.length === 0 
                  ? "Vous n'avez pas encore écrit dans votre journal. Commencez par votre première entrée !"
                  : "Aucune entrée ne correspond à votre recherche."
                }
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Écrire ma première entrée
              </Button>
            </CardContent>
          </Card>
        )}

        {!error && filteredEntries.length > 0 && (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {entry.title && (
                        <CardTitle className="text-lg mb-2">{entry.title}</CardTitle>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(entry.createdAt).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        {entry.mood && (
                          <div className="flex items-center gap-2">
                            <span>{getMoodIcon(entry.mood)}</span>
                            <span>{getMoodLabel(entry.mood)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                    
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
