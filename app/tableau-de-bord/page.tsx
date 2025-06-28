"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Brain,
  Target,
  BookOpen,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  BarChart3,
  MessageSquare,
} from "lucide-react"

interface DashboardData {
  user: {
    id: string
    name: string | null
    email: string
    plan: string
  }
  stats: {
    activeGoals: number
    completedTasksToday: number
    totalTasksToday: number
    wellbeingScore: number
  }
  goals: Array<{
    id: string
    title: string
    description: string | null
    progress: number
    targetDate: string | null
    status: string
    priority: string
  }>
  todayTasks: Array<{
    id: string
    title: string
    description: string | null
    completed: boolean
    dueDate: string | null
    priority: string
  }>
}

export default function TableauDeBordPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données')
      }
      const dashboardData = await response.json()
      setData(dashboardData)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      // Recharger les données
      fetchDashboardData()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const createTestData = async () => {
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la création des données de test')
      }

      // Recharger les données
      fetchDashboardData()
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchDashboardData}>Réessayer</Button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const aiSuggestions = [
    "Planifiez votre séance de sport pour demain matin à 7h",
    "Essayez une nouvelle recette saine cette semaine",
    "Prenez 5 minutes pour noter vos réflexions du jour",
  ]

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
              <Link href="/tableau-de-bord" className="text-blue-600 font-medium">
                Tableau de bord
              </Link>
              <Link href="/objectifs" className="text-gray-600 hover:text-gray-900">
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
              <AvatarImage src="/placeholder.svg" alt={data.user.name || 'Utilisateur'} />
              <AvatarFallback>
                {data.user.name ? data.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bonjour, {data.user.name ? data.user.name.split(" ")[0] : 'Utilisateur'} ! 👋
              </h1>
              <p className="text-gray-600 mt-1">Voici un aperçu de vos progrès aujourd'hui</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={createTestData} variant="outline" size="sm">
                Créer données de test
              </Button>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Plan {data.user.plan}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Objectifs actifs</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.stats.activeGoals}</div>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches complétées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.stats.completedTasksToday}/{data.stats.totalTasksToday}
              </div>
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Série actuelle</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 jours</div>
              <p className="text-xs text-muted-foreground">Commencez aujourd'hui !</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score bien-être</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.stats.wellbeingScore}/10</div>
              <p className="text-xs text-muted-foreground">Excellent !</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Tâches du jour
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.todayTasks.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Aucune tâche pour aujourd'hui. Profitez de votre journée !
                    </p>
                  ) : (
                    data.todayTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <div
                          className={`w-5 h-5 rounded-full border-2 cursor-pointer transition-colors ${
                            task.completed
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 hover:border-green-500"
                          }`}
                          onClick={() => toggleTaskCompletion(task.id, task.completed)}
                        >
                          {task.completed && <CheckCircle className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-sm text-gray-500">{task.description}</p>
                          )}
                        </div>
                        <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Active Goals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Objectifs actifs
                  </CardTitle>
                  <Link href="/objectifs">
                    <Button size="sm" variant="outline">
                      Voir tout
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.goals.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      Aucun objectif actif. Créez votre premier objectif !
                    </p>
                  ) : (
                    data.goals.map((goal) => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{goal.title}</h4>
                          <Badge variant="outline">{goal.priority}</Badge>
                        </div>
                        {goal.description && (
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        )}
                        <Progress value={goal.progress} className="h-2" />
                        <p className="text-xs text-gray-500">{goal.progress}% complété</p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Suggestions IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-800">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel objectif
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Écrire dans le journal
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Parler à l'assistant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
