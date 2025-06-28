"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Filter,
  Search,
  RefreshCw,
  AlertCircle
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
  criteria: any
}

interface AchievementStats {
  total: number
  unlocked: number
  totalPoints: number
  completionRate: number
}

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 border-gray-200',
  rare: 'bg-blue-100 text-blue-800 border-blue-200',
  epic: 'bg-purple-100 text-purple-800 border-purple-200',
  legendary: 'bg-yellow-100 text-yellow-800 border-yellow-200'
}

const rarityIcons = {
  common: <Star className="w-4 h-4" />,
  rare: <Gem className="w-4 h-4" />,
  epic: <Crown className="w-4 h-4" />,
  legendary: <Sparkles className="w-4 h-4" />
}

const categoryIcons = {
  goals: <Target className="w-5 h-5" />,
  tasks: <CheckCircle className="w-5 h-5" />,
  journal: <BookOpen className="w-5 h-5" />,
  streak: <Zap className="w-5 h-5" />,
  special: <Award className="w-5 h-5" />
}

export default function AchievementsComponent() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [stats, setStats] = useState<AchievementStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [initializing, setInitializing] = useState(false)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    setLoading(true)
    setError(null)
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
      } else if (response.status === 404) {
        setError('Aucun achievement trouvé. Initialisez les achievements pour commencer.')
      } else {
        setError('Erreur lors du chargement des achievements')
      }
    } catch (error) {
      console.error('Erreur lors du chargement des achievements:', error)
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const initializeAchievements = async () => {
    setInitializing(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Token manquant')
        return
      }

      const response = await fetch('/api/achievements/init', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchAchievements()
      } else {
        setError('Erreur lors de l\'initialisation des achievements')
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error)
      setError('Erreur de connexion')
    } finally {
      setInitializing(false)
    }
  }

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'trophy': <Trophy className="w-6 h-6" />,
      'target': <Target className="w-6 h-6" />,
      'checkCircle': <CheckCircle className="w-6 h-6" />,
      'bookOpen': <BookOpen className="w-6 h-6" />,
      'zap': <Zap className="w-6 h-6" />,
      'star': <Star className="w-6 h-6" />,
      'award': <Award className="w-6 h-6" />,
      'trendingUp': <TrendingUp className="w-6 h-6" />,
      'medal': <Medal className="w-6 h-6" />,
      'crown': <Crown className="w-6 h-6" />,
      'gem': <Gem className="w-6 h-6" />,
      'sparkles': <Sparkles className="w-6 h-6" />
    }
    return iconMap[iconName] || <Trophy className="w-6 h-6" />
  }

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory
    const matchesSearch = achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: 'all', name: 'Tous', icon: <Trophy className="w-4 h-4" /> },
    { id: 'goals', name: 'Objectifs', icon: <Target className="w-4 h-4" /> },
    { id: 'tasks', name: 'Tâches', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'journal', name: 'Journal', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'streak', name: 'Séries', icon: <Zap className="w-4 h-4" /> },
    { id: 'special', name: 'Spéciaux', icon: <Award className="w-4 h-4" /> }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des achievements...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={fetchAchievements} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            {error.includes('Initialisez') && (
              <Button onClick={initializeAchievements} disabled={initializing}>
                {initializing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Initialisation...
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    Initialiser les achievements
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
              </div>
              <Trophy className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Débloqués</p>
                <p className="text-2xl font-bold text-green-600">{stats?.unlocked || 0}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Points</p>
                <p className="text-2xl font-bold text-blue-600">{stats?.totalPoints || 0}</p>
              </div>
              <Star className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux</p>
                <p className="text-2xl font-bold text-purple-600">{stats?.completionRate || 0}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher des achievements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Liste des achievements */}
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`transition-all duration-200 hover:shadow-lg ${
                achievement.unlocked 
                  ? 'ring-2 ring-green-200 bg-green-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {getIconComponent(achievement.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.name}</CardTitle>
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
                  </div>
                  
                  {achievement.unlocked && (
                    <div className="text-green-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="mb-4">
                  {achievement.description}
                </CardDescription>

                {!achievement.unlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}

                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="text-sm text-gray-600">
                    Débloqué le {new Date(achievement.unlockedAt).toLocaleDateString('fr-FR')}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3">
                  {categoryIcons[achievement.category as keyof typeof categoryIcons]}
                  <span className="text-xs text-gray-500 capitalize">
                    {achievement.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun achievement trouvé
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Commencez à utiliser l\'application pour débloquer des achievements !'
              }
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
} 