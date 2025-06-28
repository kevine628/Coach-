"use client"

import { useState } from "react"
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

export default function TableauDeBordPage() {
  const [user] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Premium",
  })

  const [objectives] = useState([
    {
      id: 1,
      title: "Améliorer ma forme physique",
      progress: 65,
      deadline: "2024-03-15",
      status: "en_cours",
      category: "Santé",
    },
    {
      id: 2,
      title: "Apprendre le piano",
      progress: 30,
      deadline: "2024-06-01",
      status: "en_cours",
      category: "Loisirs",
    },
    {
      id: 3,
      title: "Lire 12 livres cette année",
      progress: 80,
      deadline: "2024-12-31",
      status: "en_cours",
      category: "Culture",
    },
  ])

  const [todayTasks] = useState([
    { id: 1, title: "Séance de sport (30 min)", completed: true },
    { id: 2, title: "Pratiquer le piano (20 min)", completed: false },
    { id: 3, title: "Lire 10 pages", completed: false },
    { id: 4, title: "Méditation (10 min)", completed: true },
  ])

  const [aiSuggestions] = useState([
    "Planifiez votre séance de sport pour demain matin à 7h",
    "Essayez une nouvelle recette saine cette semaine",
    "Prenez 5 minutes pour noter vos réflexions du jour",
  ])

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
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bonjour, {user.name.split(" ")[0]} ! 👋</h1>
              <p className="text-gray-600 mt-1">Voici un aperçu de vos progrès aujourd'hui</p>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Plan {user.plan}</Badge>
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
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+1 ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tâches complétées</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2/4</div>
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Série actuelle</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 jours</div>
              <p className="text-xs text-muted-foreground">Record personnel !</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score bien-être</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2/10</div>
              <p className="text-xs text-muted-foreground">+0.5 cette semaine</p>
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
                  {todayTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          task.completed ? "bg-green-600 border-green-600" : "border-gray-300"
                        }`}
                      >
                        {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <span className={task.completed ? "line-through text-gray-500" : "text-gray-900"}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Objectives Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Progrès des objectifs
                  </CardTitle>
                  <Link href="/objectifs">
                    <Button size="sm" variant="outline">
                      Voir tout
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {objectives.map((objective) => (
                    <div key={objective.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{objective.title}</h4>
                          <p className="text-sm text-gray-500">
                            Échéance : {new Date(objective.deadline).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <Badge variant="secondary">{objective.category}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progrès</span>
                          <span>{objective.progress}%</span>
                        </div>
                        <Progress value={objective.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Assistant IA
                </CardTitle>
                <CardDescription>Suggestions personnalisées pour vous</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
                <Link href="/assistant" className="block mt-4">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discuter avec l'IA
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/objectifs/nouveau">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvel objectif
                    </Button>
                  </Link>
                  <Link href="/journal/nouveau">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Écrire dans le journal
                    </Button>
                  </Link>
                  <Link href="/calendrier">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Voir le calendrier
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Objectifs complétés</span>
                    <span className="font-medium">2/3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Jours actifs</span>
                    <span className="font-medium">6/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Temps total</span>
                    <span className="font-medium">4h 30min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
