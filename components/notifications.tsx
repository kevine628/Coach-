"use client"

import { useState, useEffect } from "react"
import { Bell, Check, X, Clock, Target, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
  goal?: {
    id: string
    title: string
  }
  task?: {
    id: string
    title: string
  }
}

interface NotificationsResponse {
  notifications: Notification[]
  total: number
  unreadCount: number
  hasMore: boolean
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/notifications?limit=20', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data: NotificationsResponse = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'markRead',
          notificationIds: [notificationId]
        })
      })

      if (response.ok) {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId 
              ? { ...notif, read: true }
              : notif
          )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'markAllRead'
        })
      })

      if (response.ok) {
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, read: true }))
        )
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Erreur lors du marquage de toutes comme lues:', error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'goal_reminder':
        return <Target className="w-4 h-4 text-blue-600" />
      case 'task_due':
        return <Clock className="w-4 h-4 text-orange-600" />
      case 'achievement':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'goal_reminder':
        return 'bg-blue-50 border-blue-200'
      case 'task_due':
        return 'bg-orange-50 border-orange-200'
      case 'achievement':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-6 px-2 text-xs"
            >
              <Check className="w-3 h-3 mr-1" />
              Tout marquer comme lu
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-80">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Chargement...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Aucune notification
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt), {
                            addSuffix: true,
                            locale: fr
                          })}
                        </span>
                        {(notification.goal || notification.task) && (
                          <span className="text-xs text-blue-600">
                            {notification.goal ? notification.goal.title : notification.task?.title}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-blue-600 hover:text-blue-700">
              Voir toutes les notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 