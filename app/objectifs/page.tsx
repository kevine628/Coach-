"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NotificationsComponent from "@/components/notifications"
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
  TrendingUp,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Goal {
  id: string
  title: string
  description: string | null
  progress: number
  targetDate: string | null
  status: string
  category: string
  priority: string
  createdAt: string
}

export default function ObjectifsPage() {
  const { toast } = useToast()
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des objectifs')
      }
      const data = await response.json()
      setGoals(data.goals)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
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

      setGoals(prev => 
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'bg-blue-100 text-blue-800'
      case 'termine': return 'bg-green-100 text-green-800'
      case 'en_pause': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'haute': return 'destructive'
      case 'moyenne': return 'secondary'
      case 'basse': return 'outline'
      default: return 'secondary'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours'
      case 'termine': return 'Terminé'
      case 'en_pause': return 'En pause'
      default: return status
    }
  }

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (goal.description && goal.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || goal.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const stats = {
    total: goals.length,
    active: goals.filter(g => g.status === 'en_cours').length,
    completed: goals.filter(g => g.status === 'termine').length,
    averageProgress: goals.length > 0 ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length) : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des objectifs...</p>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Objectifs</h1>
            <p className="text-gray-600">Gérez vos objectifs et suivez votre progression</p>
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
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Terminés</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progression moy.</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</p>
                </div>
                <Progress value={stats.averageProgress} className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
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
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="termine">Terminé</SelectItem>
                  <SelectItem value="en_pause">En pause</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Général">Général</SelectItem>
                  <SelectItem value="Santé">Santé</SelectItem>
                  <SelectItem value="Travail">Travail</SelectItem>
                  <SelectItem value="Personnel">Personnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Goals List */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchGoals}>Réessayer</Button>
          </div>
        )}

        {!error && filteredGoals.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun objectif trouvé</h3>
              <p className="text-gray-600 mb-6">
                {goals.length === 0 
                  ? "Vous n'avez pas encore créé d'objectifs. Commencez par en créer un !"
                  : "Aucun objectif ne correspond à vos critères de recherche."
                }
              </p>
              <Link href="/objectifs/nouveau">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer mon premier objectif
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {!error && filteredGoals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{goal.title}</CardTitle>
                      {goal.description && (
                        <CardDescription className="mb-3">{goal.description}</CardDescription>
                      )}
                    </div>
                    <Badge className={getStatusColor(goal.status)}>
                      {getStatusLabel(goal.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progression</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant={getPriorityColor(goal.priority)}>
                        {goal.priority}
                      </Badge>
                      <span className="text-sm text-gray-600">{goal.category}</span>
                    </div>

                    {goal.targetDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Échéance: {new Date(goal.targetDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
