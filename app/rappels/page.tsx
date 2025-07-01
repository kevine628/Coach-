"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Bell, Clock, Calendar, Target, CheckCircle, AlertTriangle, CalendarDays } from "lucide-react"
import Link from "next/link"
import { useToast } from "../../hooks/use-toast"

interface Reminder {
  overdueTasks: Array<{
    id: string
    title: string
    description?: string
    dueDate: string
    goal?: {
      title: string
    }
  }>
  upcomingGoals: Array<{
    id: string
    title: string
    targetDate: string
    priority: string
  }>
  todayTasks: Array<{
    id: string
    title: string
    description?: string
    goal?: {
      title: string
    }
  }>
}

export default function RappelsPage() {
  const [reminders, setReminders] = useState<Reminder | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchReminders()
  }, [])

  const fetchReminders = async () => {
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

      const response = await fetch('/api/reminders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des rappels')
      }

      const data = await response.json()
      setReminders(data)
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des rappels",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: true })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour')
      }

      toast({
        title: "Succès",
        description: "Tâche marquée comme terminée"
      })

      // Recharger les rappels
      fetchReminders()
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de la tâche",
        variant: "destructive"
      })
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'haute': return 'Haute'
      case 'moyenne': return 'Moyenne'
      case 'basse': return 'Basse'
      default: return priority
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Bell className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Chargement des rappels...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
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
              <Link href="/rappels" className="text-blue-600 font-medium">Rappels</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <Bell className="w-10 h-10 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rappels</h1>
            <p className="text-gray-600">Vos tâches et objectifs à ne pas oublier</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Tâches en retard */}
          <Card className="border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                Tâches en retard
                <Badge variant="destructive" className="ml-auto">
                  {reminders?.overdueTasks.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reminders?.overdueTasks.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucune tâche en retard</p>
              ) : (
                reminders?.overdueTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        {task.goal && (
                          <p className="text-sm text-gray-600">Objectif: {task.goal.title}</p>
                        )}
                        <p className="text-xs text-red-600 mt-1">
                          Échue le {formatDate(task.dueDate)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCompleteTask(task.id)}
                        className="ml-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Objectifs avec date limite proche */}
          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Clock className="w-5 h-5" />
                Objectifs à venir
                <Badge variant="secondary" className="ml-auto">
                  {reminders?.upcomingGoals.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reminders?.upcomingGoals.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun objectif avec date limite proche</p>
              ) : (
                reminders?.upcomingGoals.map((goal) => (
                  <div key={goal.id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{goal.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getPriorityColor(goal.priority)} className="text-xs">
                            {getPriorityLabel(goal.priority)}
                          </Badge>
                          <span className="text-xs text-orange-600">
                            Échéance: {formatDate(goal.targetDate)}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/objectifs`}>
                          <Target className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Tâches du jour */}
          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <CalendarDays className="w-5 h-5" />
                Tâches du jour
                <Badge variant="default" className="ml-auto">
                  {reminders?.todayTasks.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {reminders?.todayTasks.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucune tâche pour aujourd'hui</p>
              ) : (
                reminders?.todayTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        {task.goal && (
                          <p className="text-sm text-gray-600">Objectif: {task.goal.title}</p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCompleteTask(task.id)}
                        className="ml-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/objectifs/nouveau">
                    <Target className="w-4 h-4 mr-2" />
                    Créer un objectif
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tableau-de-bord">
                    <Calendar className="w-4 h-4 mr-2" />
                    Voir le tableau de bord
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/assistant">
                    <Bell className="w-4 h-4 mr-2" />
                    Demander de l'aide
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 