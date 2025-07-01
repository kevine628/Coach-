"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button-simple"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-simple"
import { ThemeToggle } from "@/components/theme-toggle-simple"
import { NotificationsComponent } from "@/components/notifications-simple"
import { AchievementsComponent } from "@/components/achievements-simple"
import { Brain, Trophy, Target, CheckCircle, BookOpen, Zap, Award } from "lucide-react"

export default function AchievementsPage() {
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
              <Link href="/tableau-de-bord" className="text-gray-600 hover:text-gray-900">
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
              <Link href="/achievements" className="text-blue-600 font-medium">
                Achievements
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NotificationsComponent />
            <Button variant="ghost" size="icon">
              <Award className="w-5 h-5" />
            </Button>
            <Avatar src="/placeholder.svg" alt="User" fallback="U" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
              <p className="text-gray-600">Débloquez des badges et récompenses en progressant</p>
            </div>
          </div>
        </div>

        {/* Achievements Component */}
        <AchievementsComponent />
      </main>
    </div>
  )
} 