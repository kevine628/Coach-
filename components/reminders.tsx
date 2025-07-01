"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Clock, Target, CheckCircle, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "ui/card"
import { Button } from "ui/button"
import { Badge } from "ui/badge"
import { Alert, AlertDescription } from "ui/alert"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

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
    progress: number
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

export function RemindersWidget() {
  const [reminders, setReminders] = useState<Reminder | null>(null)
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState<string[]>([])

  useEffect(() => {
    fetchReminders()
  }, [])

  const fetchReminders = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/reminders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setReminders(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des rappels:', error)
    } finally {
      setLoading(false)
    }
  }

  const dismissReminder = (id: string) => {
    setDismissed(prev => [...prev, id])
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Rappels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!reminders) return null

  const hasOverdueTasks = reminders.overdueTasks.length > 0
  const hasUpcomingGoals = reminders.upcomingGoals.length > 0
  const hasTodayTasks = reminders.todayTasks.length > 0

  if (!hasOverdueTasks && !hasUpcomingGoals && !hasTodayTasks) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Rappels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Aucun rappel urgent pour le moment. Continuez comme ça !
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Rappels
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tâches en retard */}
        {hasOverdueTasks && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">Tâches en retard</span>
            </div>
            {reminders.overdueTasks
              .filter(task => !dismissed.includes(`overdue-${task.id}`))
              .map(task => (
                <Alert key={`overdue-${task.id}`} className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-red-800">{task.title}</p>
                      {task.goal && (
                        <p className="text-sm text-red-600">Objectif: {task.goal.title}</p>
                      )}
                      <p className="text-xs text-red-500">
                        En retard depuis {formatDistanceToNow(new Date(task.dueDate), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissReminder(`overdue-${task.id}`)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
          </div>
        )}

        {/* Objectifs à venir */}
        {hasUpcomingGoals && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Objectifs à venir</span>
            </div>
            {reminders.upcomingGoals
              .filter(goal => !dismissed.includes(`goal-${goal.id}`))
              .map(goal => (
                <Alert key={`goal-${goal.id}`} className="border-blue-200 bg-blue-50">
                  <Target className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">{goal.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-blue-600">{goal.progress}%</span>
                      </div>
                      <p className="text-xs text-blue-500 mt-1">
                        Échéance dans {formatDistanceToNow(new Date(goal.targetDate), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissReminder(`goal-${goal.id}`)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
          </div>
        )}

        {/* Tâches du jour */}
        {hasTodayTasks && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Tâches du jour</span>
            </div>
            {reminders.todayTasks
              .filter(task => !dismissed.includes(`today-${task.id}`))
              .map(task => (
                <Alert key={`today-${task.id}`} className="border-orange-200 bg-orange-50">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-orange-800">{task.title}</p>
                      {task.goal && (
                        <p className="text-sm text-orange-600">Objectif: {task.goal.title}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissReminder(`today-${task.id}`)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 