"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Trophy, Star, Award, User } from "lucide-react"
import Link from "next/link"
import { Button } from "../../components/ui/button"

interface LeaderboardUser {
  id: string
  name: string
  email: string
  createdAt: string
  totalPoints: number
  achievementsCount: number
  rank: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/leaderboard', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      })
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data.leaderboard)
        setCurrentUser(data.currentUser)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
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
              <Link href="/leaderboard" className="text-blue-600 font-medium">Classement</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/profil">
                <User className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <Trophy className="w-10 h-10 text-yellow-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Classement</h1>
            <p className="text-gray-600">Top 10 des utilisateurs les plus actifs</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-500" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-12 text-center text-gray-500">Chargement du classement...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rang</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Achievements</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user) => (
                      <tr key={user.id} className={user.rank === 1 ? "bg-yellow-50" : user.rank === 2 ? "bg-gray-100" : user.rank === 3 ? "bg-orange-50" : ""}>
                        <td className="px-4 py-2 font-bold text-lg text-center">{user.rank}</td>
                        <td className="px-4 py-2 flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={"/placeholder-user.jpg"} alt={user.name} />
                            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-900 truncate max-w-[120px]">{user.name}</span>
                        </td>
                        <td className="px-4 py-2 font-semibold text-blue-700">{user.totalPoints}</td>
                        <td className="px-4 py-2 text-gray-700">{user.achievementsCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {currentUser && (
                  <div className="mt-6 p-4 rounded-lg bg-blue-50 flex items-center gap-4 border-t border-blue-200">
                    <span className="font-bold text-blue-700">Vous</span>
                    <span className="text-gray-700">Rang {currentUser.rank}</span>
                    <span className="text-gray-700">{currentUser.name}</span>
                    <span className="text-blue-700 font-semibold">{currentUser.totalPoints} pts</span>
                    <span className="text-gray-700">{currentUser.achievementsCount} achievements</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 