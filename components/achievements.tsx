"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Target, 
  CheckCircle, 
  Calendar, 
  Star,
  Zap,
  Heart,
  BookOpen,
  TrendingUp,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: string
  category: 'goals' | 'tasks' | 'streak' | 'journal' | 'special'
}

export function AchievementsWidget() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/achievements', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAchievements(data.achievements)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des accomplissements:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      trophy: Trophy,
      target: Target,
      checkCircle: CheckCircle,
      calendar: Calendar,
      star: Star,
      zap: Zap,
      heart: Heart,
      bookOpen: BookOpen,
      trendingUp: TrendingUp,
      award: Award
    }
    const IconComponent = icons[iconName] || Trophy
    return <IconComponent className="w-6 h-6" />
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      goals: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      tasks: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      streak: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      journal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      special: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Accomplissements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Accomplissements
          <Badge variant="secondary" className="ml-auto">
            {unlockedAchievements.length}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Accomplissements débloqués */}
        {unlockedAchievements.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-green-600 dark:text-green-400">
              🎉 Débloqués récemment
            </h4>
            {unlockedAchievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg dark:bg-green-950">
                <div className="text-green-600">
                  {getIcon(achievement.icon)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {achievement.description}
                  </p>
                </div>
                <Badge className={getCategoryColor(achievement.category)}>
                  {achievement.category}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Accomplissements en cours */}
        {lockedAchievements.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              En cours...
            </h4>
            {lockedAchievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">
                    {getIcon(achievement.icon)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {achievement.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  <Badge variant="outline" className={getCategoryColor(achievement.category)}>
                    {achievement.progress}/{achievement.maxProgress}
                  </Badge>
                </div>
                <Progress 
                  value={(achievement.progress / achievement.maxProgress) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        )}

        {/* Message si aucun accomplissement */}
        {achievements.length === 0 && (
          <div className="text-center py-6">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              Commencez à utiliser l'application pour débloquer vos premiers accomplissements !
            </p>
          </div>
        )}

        {/* Voir tous les accomplissements */}
        {achievements.length > 0 && (
          <div className="pt-2 border-t">
            <Button variant="outline" className="w-full">
              Voir tous les accomplissements
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 