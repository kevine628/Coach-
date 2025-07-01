"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import Link from "next/link"
import { 
  Trophy, 
  Target, 
  CheckCircle, 
  BookOpen, 
  Zap, 
  Star, 
  Award, 
  TrendingUp,
  Medal,
  Crown,
  Gem,
  Sparkles,
  ArrowRight
} from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: string
  rarity: string
  points: number
  unlocked: boolean
  unlockedAt?: string
  progress: number
}

interface AchievementStats {
  total: number
  unlocked: number
  totalPoints: number
  completionRate: number
}

const rarityColors = {
  common: 'bg-gray-100 text-gray-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-yellow-100 text-yellow-800'
}

const rarityIcons = {
  common: <Star className="w-3 h-3" />,
  rare: <Gem className="w-3 h-3" />,
  epic: <Crown className="w-3 h-3" />,
  legendary: <Sparkles className="w-3 h-3" />
}

export default function AchievementsWidget() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [stats, setStats] = useState<AchievementStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setAchievements([])
        return
      }

      const response = await fetch('/api/achievements', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAchievements(data.achievements)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'trophy': <Trophy className="w-4 h-4" />,
      'target': <Target className="w-4 h-4" />,
      'checkCircle': <CheckCircle className="w-4 h-4" />,
      'bookOpen': <BookOpen className="w-4 h-4" />,
      'zap': <Zap className="w-4 h-4" />,
      'star': <Star className="w-4 h-4" />,
      'award': <Award className="w-4 h-4" />,
      'trendingUp': <TrendingUp className="w-4 h-4" />,
      'medal': <Medal className="w-4 h-4" />,
      'crown': <Crown className="w-4 h-4" />,
      'gem': <Gem className="w-4 h-4" />,
      'sparkles': <Sparkles className="w-4 h-4" />
    }
    return iconMap[iconName] || <Trophy className="w-4 h-4" />
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked).slice(0, 3)
  const recentAchievements = unlockedAchievements.sort((a, b) => 
    new Date(b.unlockedAt || '').getTime() - new Date(a.unlockedAt || '').getTime()
  )

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements
            </CardTitle>
            <CardDescription>
              {stats ? `${stats.unlocked}/${stats.total} débloqués` : 'Chargement...'}
            </CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/achievements">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats && (
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{stats.totalPoints} points</p>
                <p className="text-sm text-gray-600">{stats.completionRate}% complété</p>
              </div>
            </div>
            <Progress value={stats.completionRate} className="w-16 h-2" />
          </div>
        )}

        {recentAchievements.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-green-600">
              🎉 Récemment débloqués
            </h4>
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="text-green-600">
                  {getIconComponent(achievement.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-green-800 truncate">
                    {achievement.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${rarityColors[achievement.rarity as keyof typeof rarityColors]}`}
                    >
                      {rarityIcons[achievement.rarity as keyof typeof rarityIcons]}
                      {achievement.rarity}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.points} pts
                    </Badge>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm mb-3">
              Aucun achievement débloqué encore
            </p>
            <Button asChild size="sm">
              <Link href="/achievements">
                Voir tous les achievements
              </Link>
            </Button>
          </div>
        )}

        {achievements.length > 0 && (
          <div className="pt-3 border-t">
            <Button asChild variant="outline" className="w-full">
              <Link href="/achievements">
                Voir tous les achievements
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 