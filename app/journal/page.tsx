"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface JournalEntry {
  id: number
  title: string
  content: string
  mood: "excellent" | "bon" | "neutre" | "difficile"
  date: string
  tags: string[]
  wordCount: number
}

export default function JournalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isWriting, setIsWriting] = useState(false)
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutre" as const,
  })

  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "Une journée productive",
      content:
        "Aujourd'hui j'ai réussi à terminer tous mes objectifs de la journée. J'ai fait ma séance de sport matinale, travaillé sur mon projet personnel pendant 2 heures, et pris le temps de lire avant de me coucher. Je me sens vraiment satisfait de cette journée bien remplie.",
      mood: "excellent",
      date: "2024-01-15",
      tags: ["productivité", "sport", "lecture"],
      wordCount: 65,
    },
    {
      id: 2,
      title: "Réflexions sur l'équilibre vie-travail",
      content:
        "Ces derniers jours, j'ai réfléchi à l'importance de l'équilibre entre vie professionnelle et personnelle. En France, nous avons cette culture du 'savoir-vivre' qui me semble précieuse. J'aimerais mieux l'intégrer dans mon quotidien.",
      mood: "bon",
      date: "2024-01-14",
      tags: ["réflexion", "travail", "équilibre"],
      wordCount: 52,
    },
    {
      id: 3,
      title: "Apprentissage du piano",
      content:
        "Ma première leçon de piano s'est bien passée ! C'est difficile au début, mais j'adore découvrir cet instrument. Mon professeur m'a donné des exercices simples pour commencer. J'ai hâte de pouvoir jouer mes premiers morceaux.",
      mood: "excellent",
      date: "2024-01-13",
      tags: ["apprentissage", "piano", "musique"],
      wordCount: 48,
    },
    {
      id: 4,
      title: "Journée difficile au travail",
      content:
        "Aujourd'hui a été compliqué au bureau. Beaucoup de stress et de pression. J'ai eu du mal à me concentrer et je me suis senti dépassé par les événements. Il faut que je trouve des stratégies pour mieux gérer ces moments.",
      mood: "difficile",
      date: "2024-01-12",
      tags: ["travail", "stress", "gestion"],
      wordCount: 45,
    },
  ])

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "excellent":
        return <Smile className="w-5 h-5 text-green-600" />
      case "bon":
        return <Smile className="w-5 h-5 text-blue-600" />
      case "neutre":
        return <Meh className="w-5 h-5 text-gray-600" />
      case "difficile":
        return <Frown className="w-5 h-5 text-red-600" />
      default:
        return <Meh className="w-5 h-5 text-gray-600" />
    }
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "bon":
        return "bg-blue-100 text-blue-800"
      case "neutre":
        return "bg-gray-100 text-gray-800"
      case "difficile":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return

    const entry: JournalEntry = {
      id: entries.length + 1,
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      date: new Date().toISOString().split("T")[0],
      tags: [], // Could be extracted from content or added separately
      wordCount: newEntry.content.split(" ").length,
    }

    setEntries([entry, ...entries])
    setNewEntry({ title: "", content: "", mood: "neutre" })
    setIsWriting(false)
  }

  const stats = {
    totalEntries: entries.length,
    thisWeek: entries.filter((entry) => {
      const entryDate = new Date(entry.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return entryDate >= weekAgo
    }).length,
    totalWords: entries.reduce((acc, entry) => acc + entry.wordCount, 0),
    averageMood:
      entries.length > 0
        ? (entries.filter((entry) => ["excellent", "bon"].includes(entry.mood)).length / entries.length) * 100
        : 0,
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
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
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
          <Button
            onClick={() => setIsWriting(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle entrée
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entrées totales</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEntries}</div>
              <p className="text-xs text-muted-foreground">depuis le début</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground">nouvelles entrées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mots écrits</CardTitle>
              <Edit className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWords}</div>
              <p className="text-xs text-muted-foreground">au total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humeur positive</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.averageMood)}%</div>
              <p className="text-xs text-muted-foreground">du temps</p>
            </CardContent>
          </Card>
        </div>

        {/* Writing Interface */}
        {isWriting && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nouvelle entrée de journal</CardTitle>
              <CardDescription>Prenez le temps d'exprimer vos pensées et réflexions du jour</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Titre de votre entrée..."
                  value={newEntry.title}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Textarea
                  placeholder="Écrivez vos pensées, réflexions, ou ce qui vous passe par la tête..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
                  className="min-h-[200px]"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Comment vous sentez-vous ?</span>
                <div className="flex gap-2">
                  {[
                    { value: "excellent", icon: Smile, color: "text-green-600" },
                    { value: "bon", icon: Smile, color: "text-blue-600" },
                    { value: "neutre", icon: Meh, color: "text-gray-600" },
                    { value: "difficile", icon: Frown, color: "text-red-600" },
                  ].map(({ value, icon: Icon, color }) => (
                    <Button
                      key={value}
                      variant={newEntry.mood === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewEntry((prev) => ({ ...prev, mood: value as any }))}
                    >
                      <Icon className={`w-4 h-4 ${color}`} />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSaveEntry}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setIsWriting(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{entry.title}</CardTitle>
                      <Badge className={getMoodColor(entry.mood)}>
                        <span className="flex items-center gap-1">
                          {getMoodIcon(entry.mood)}
                          {entry.mood}
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(entry.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>{entry.wordCount} mots</span>
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
                <p className="text-gray-700 leading-relaxed mb-4">{entry.content}</p>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "Aucune entrée trouvée" : "Votre journal est vide"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Essayez avec d'autres mots-clés"
                  : "Commencez par écrire votre première entrée de journal"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setIsWriting(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Première entrée
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
