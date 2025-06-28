"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  CheckSquare, 
  BookOpen, 
  Trophy,
  Calendar,
  Clock,
  Star,
  Activity
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function StatistiquesPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
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

      const response = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des statistiques')
      }

      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Erreur:', error)
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des statistiques",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Chargement des statistiques...</p>
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
                <BarChart3 className="w-5 h-5 text-white" />
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
              <Link href="/recherche" className="text-gray-600 hover:text-gray-900">Recherche</Link>
              <Link href="/statistiques" className="text-blue-600 font-medium">Statistiques</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <BarChart3 className="w-10 h-10 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
            <p className="text-gray-600">Analysez votre progression et vos performances</p>
          </div>
        </div>

        {!stats ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune donnée disponible
              </h3>
              <p className="text-gray-600 mb-4">
                Commencez à utiliser l'application pour voir vos statistiques
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild>
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
          <div className="space-y-8">
            {/* Vue d'ensemble */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Objectifs</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.goals?.total || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.goals?.completed || 0} complétés ({stats.goals?.completionRate || 0}%)
                  </p>
                  <Progress value={stats.goals?.completionRate || 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tâches</CardTitle>
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.tasks?.total || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.tasks?.completed || 0} complétées ({stats.tasks?.completionRate || 0}%)
                  </p>
                  <Progress value={stats.tasks?.completionRate || 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Journal</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.journal?.totalEntries || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.journal?.entriesThisMonth || 0} ce mois-ci
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Points</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.achievements?.totalPoints || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.achievements?.unlocked || 0}/{stats.achievements?.total || 0} achievements
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Objectifs par catégorie */}
            {stats.goals?.byCategory && stats.goals.byCategory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Objectifs par catégorie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.goals.byCategory.map((category: any) => (
                      <div key={category.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{category.category}</span>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {category.completed}/{category.count} complétés
                          </span>
                          <Progress 
                            value={category.count > 0 ? (category.completed / category.count) * 100 : 0} 
                            className="w-20" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activité récente */}
            <div className="grid gap-6 md:grid-cols-2">
              {stats.productivity?.weeklyProgress && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Activité cette semaine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.productivity.weeklyProgress.map((day: any) => (
                        <div key={day.day} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">{day.day}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-600">
                              {day.tasksCompleted} tâches
                            </span>
                            <Progress value={day.goalsProgress} className="w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {stats.achievements?.recentUnlocked && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Achievements récents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.achievements.recentUnlocked.slice(0, 5).map((achievement: any) => (
                        <div key={achievement.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                          <div>
                            <span className="font-medium text-gray-900">{achievement.name}</span>
                            <p className="text-xs text-gray-600">
                              Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <Badge variant="secondary">{achievement.points} pts</Badge>
                        </div>
                      ))}
                      {stats.achievements.recentUnlocked.length === 0 && (
                        <p className="text-gray-500 text-sm">Aucun achievement récent</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Actions rapides */}
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
                    <Link href="/achievements">
                      <Trophy className="w-4 h-4 mr-2" />
                      Voir les achievements
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/journal">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Écrire dans le journal
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/assistant">
                      <Activity className="w-4 h-4 mr-2" />
                      Demander des conseils
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
} 