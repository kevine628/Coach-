"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Brain,
  Target,
  Plus,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2,
  Bell,
  Settings,
  Loader2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Goal {
  id: string
  title: string
  description: string | null
  progress: number
  targetDate: string | null
  status: "en_cours" | "termine" | "en_pause"
  category: string
  priority: "haute" | "moyenne" | "basse"
  createdAt: string
  updatedAt: string
}

export default function ObjectifsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("tous")
  const [objectives, setObjectives] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      
      if (!token) {
        setError("Vous devez être connecté")
        return
      }

      const response = await fetch("/api/goals", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          setError("Session expirée")
          return
        }
        throw new Error("Erreur lors de la récupération des objectifs")
      }

      const data = await response.json()
      setObjectives(data)
    } catch (error) {
      console.error("Erreur:", error)
      setError("Erreur lors du chargement des objectifs")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté",
          variant: "destructive"
        })
        return
      }

      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression")
      }

      toast({
        title: "Succès",
        description: "Objectif supprimé avec succès"
      })

      fetchGoals()
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'objectif",
        variant: "destructive"
      })
    }
  }

  const handleUpdateProgress = async (goalId: string, newProgress: number) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté",
          variant: "destructive"
        })
        return
      }

      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ progress: newProgress })
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour")
      }

      setObjectives(prev => 
        prev.map(goal => 
          goal.id === goalId 
            ? { ...goal, progress: newProgress }
            : goal
        )
      )

      toast({
        title: "Succès",
        description: "Progrès mis à jour"
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du progrès",
        variant: "destructive"
      })
    }
  }

  const categories = ["tous", "Général", "Santé", "Loisirs", "Culture", "Apprentissage", "Bien-être", "Travail", "Finance", "Relations"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en_cours":
        return "bg-blue-100 text-blue-800"
      case "termine":
        return "bg-green-100 text-green-800"
      case "en_pause":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "haute":
        return "bg-red-100 text-red-800"
      case "moyenne":
        return "bg-orange-100 text-orange-800"
      case "basse":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredObjectives = objectives.filter((objective) => {
    const matchesSearch =
      objective.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (objective.description && objective.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "tous" || objective.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: objectives.length,
    enCours: objectives.filter((obj) => obj.status === "en_cours").length,
    termines: objectives.filter((obj) => obj.status === "termine").length,
    progressMoyen: objectives.length > 0 
      ? Math.round(objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length)
      : 0,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Chargement des objectifs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchGoals} variant="outline">
            Réessayer
          </Button>
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
              <Link href="/objectifs" className="text-blue-600 font-medium">
                Objectifs
              </Link>
              <Link href="/journal" className="text-gray-600 hover:text-gray-900">
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
              <Target className="w-8 h-8 text-blue-600" />
              Mes Objectifs
            </h1>
            <p className="text-gray-600 mt-1">Suivez et gérez tous vos objectifs personnels et professionnels</p>
          </div>
          <Link href="/objectifs/nouveau">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvel objectif
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">objectifs créés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En cours</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.enCours}</div>
              <p className="text-xs text-muted-foreground">objectifs actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terminés</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.termines}</div>
              <p className="text-xs text-muted-foreground">objectifs réalisés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progrès moyen</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.progressMoyen}%</div>
              <p className="text-xs text-muted-foreground">de réalisation</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un objectif..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      {filterCategory === "tous" ? "Toutes catégories" : filterCategory}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} onClick={() => setFilterCategory(category)}>
                        {category === "tous" ? "Toutes catégories" : category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectives List */}
        <div className="grid gap-6">
          {filteredObjectives.map((objective) => (
            <Card key={objective.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{objective.title}</CardTitle>
                      <Badge className={getStatusColor(objective.status)}>
                        {objective.status === "en_cours"
                          ? "En cours"
                          : objective.status === "termine"
                            ? "Terminé"
                            : "En pause"}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(objective.priority)}>
                        Priorité {objective.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">{objective.description}</CardDescription>
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
                      <DropdownMenuItem>
                        <Calendar className="w-4 h-4 mr-2" />
                        Programmer rappel
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteGoal(objective.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progrès</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{objective.progress}%</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateProgress(objective.id, Math.min(100, objective.progress + 10))}
                          disabled={objective.progress >= 100}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <Progress value={objective.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      {objective.targetDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Échéance : {new Date(objective.targetDate).toLocaleDateString("fr-FR")}
                        </span>
                      )}
                      <Badge variant="secondary">{objective.category}</Badge>
                    </div>
                    <span>Créé le {new Date(objective.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredObjectives.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun objectif trouvé</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== "tous"
                  ? "Essayez de modifier vos critères de recherche"
                  : "Commencez par créer votre premier objectif"}
              </p>
              {!searchTerm && filterCategory === "tous" && (
                <Link href="/objectifs/nouveau">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer un objectif
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
