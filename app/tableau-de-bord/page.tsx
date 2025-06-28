"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
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
            <ThemeToggle />
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour, {data.user.name || 'Utilisateur'} ! 👋
          </h1>
          <p className="text-gray-600">Voici un aperçu de votre progression aujourd'hui</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Objectifs actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{data.stats.activeGoals}</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tâches terminées</p>
                  <p className="text-2xl font-bold text-gray-900">{data.stats.completedTasksToday}/{data.stats.totalTasksToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Score bien-être</p>
                  <p className="text-2xl font-bold text-gray-900">{data.stats.wellbeingScore}/10</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Plan actuel</p>
                  <p className="text-2xl font-bold text-gray-900">{data.user.plan}</p>
                </div>
                <Sparkles className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Actions rapides</h2>
            <Button onClick={createTestData} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Créer des données de test
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex-col">
              <Link href="/objectifs/nouveau">
                <Target className="w-6 h-6 mb-2" />
                Nouvel objectif
              </Link>
            </Button>
            
            <Button asChild className="h-20 flex-col">
              <Link href="/journal">
                <BookOpen className="w-6 h-6 mb-2" />
                Écrire dans le journal
              </Link>
            </Button>
            
            <Button asChild className="h-20 flex-col">
              <Link href="/assistant">
                <MessageSquare className="w-6 h-6 mb-2" />
                Parler à l'IA
              </Link>
            </Button>
          </div>
        </div>

        {/* Goals and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Objectifs en cours
              </CardTitle>
              <CardDescription>Vos objectifs actifs et leur progression</CardDescription>
            </CardHeader>
            <CardContent>
              {data.goals.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun objectif en cours</p>
                  <Button asChild className="mt-4" size="sm">
                    <Link href="/objectifs/nouveau">Créer un objectif</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.goals.map((goal) => (
                    <div key={goal.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{goal.title}</h3>
                        <Badge variant={goal.priority === 'haute' ? 'destructive' : 'secondary'}>
                          {goal.priority}
                        </Badge>
                      </div>
                      {goal.description && (
                        <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      )}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Tâches du jour
              </CardTitle>
              <CardDescription>Vos tâches pour aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              {data.todayTasks.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune tâche pour aujourd'hui</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.todayTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTaskCompletion(task.id, task.completed)}
                        className="p-1"
                      >
                        <CheckCircle className={`w-5 h-5 ${task.completed ? 'text-green-600' : 'text-gray-400'}`} />
                      </Button>
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-sm text-gray-600">{task.description}</p>
                        )}
                      </div>
                      <Badge variant={task.priority === 'haute' ? 'destructive' : 'secondary'}>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Suggestions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Suggestions de l'IA
            </CardTitle>
            <CardDescription>Recommandations personnalisées pour améliorer votre bien-être</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-900">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
