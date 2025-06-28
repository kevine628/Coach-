"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Target, 
  CheckCircle, 
  Calendar, 
  BarChart3,
  Award,
  Clock,
  Zap
} from "lucide-react"

interface StatsData {
  totalGoals: number
  completedGoals: number
  totalTasks: number
  completedTasks: number
  journalEntries: number
  streakDays: number
  weeklyProgress: {
    date: string
    tasksCompleted: number
    goalsProgress: number
  }[]
  categories: {
    name: string
    count: number
    color: string
  }[]
}

export function StatsWidget() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Statistiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) return null

  const completionRate = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0
  const goalCompletionRate = stats.totalGoals > 0 ? (stats.completedGoals / stats.totalGoals) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Statistiques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Métriques principales */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-blue-950">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.totalGoals}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Objectifs</div>
            <div className="text-xs text-blue-500 mt-1">
              {goalCompletionRate.toFixed(0)}% complétés
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg dark:bg-green-950">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tâches terminées</div>
            <div className="text-xs text-green-500 mt-1">
              {completionRate.toFixed(0)}% de réussite
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg dark:bg-purple-950">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.journalEntries}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Entrées journal</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg dark:bg-orange-950">
            <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.streakDays}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Jours consécutifs</div>
          </div>
        </div>

        {/* Progression des tâches */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progression des tâches</span>
            <Badge variant="secondary">{completionRate.toFixed(0)}%</Badge>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        {/* Progression des objectifs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progression des objectifs</span>
            <Badge variant="secondary">{goalCompletionRate.toFixed(0)}%</Badge>
          </div>
          <Progress value={goalCompletionRate} className="h-2" />
        </div>

        {/* Catégories populaires */}
        {stats.categories.length > 0 && (
          <div className="space-y-3">
            <span className="text-sm font-medium">Catégories populaires</span>
            <div className="space-y-2">
              {stats.categories.slice(0, 3).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <Badge variant="outline">{category.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Récompenses */}
        {stats.streakDays >= 7 && (
          <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg dark:from-yellow-950 dark:to-orange-950">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                🎉 Félicitations ! Vous avez maintenu une série de {stats.streakDays} jours !
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 