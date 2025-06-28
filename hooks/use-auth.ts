"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string | null
  email: string
  plan: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  notificationsCount: number
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    notificationsCount: 0
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false, isAuthenticated: false }))
        return
      }

      // Vérifier le token avec l'API
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setAuthState({
          user: userData.user,
          isAuthenticated: true,
          isLoading: false,
          notificationsCount: userData.notificationsCount || 0
        })
      } else {
        // Token invalide, le supprimer
        localStorage.removeItem('token')
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          notificationsCount: 0
        })
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error)
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        notificationsCount: 0
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de connexion')
      }

      // Stocker le token
      localStorage.setItem('token', data.token)
      
      // Mettre à jour l'état
      setAuthState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        notificationsCount: data.notificationsCount || 0
      })

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${data.user.name || data.user.email} !`
      })

      router.push('/tableau-de-bord')
      return { success: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de connexion'
      toast({
        title: "Erreur de connexion",
        description: message,
        variant: "destructive"
      })
      return { success: false, error: message }
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
  }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur d\'inscription')
      }

      // Stocker le token
      localStorage.setItem('token', data.token)
      
      // Mettre à jour l'état
      setAuthState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        notificationsCount: 0
      })

      toast({
        title: "Inscription réussie",
        description: `Bienvenue ${data.user.name} ! Votre compte a été créé avec succès.`
      })

      router.push('/tableau-de-bord')
      return { success: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur d\'inscription'
      toast({
        title: "Erreur d'inscription",
        description: message,
        variant: "destructive"
      })
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      notificationsCount: 0
    })
    
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès"
    })
    
    router.push('/connexion')
  }

  const updateNotificationsCount = (count: number) => {
    setAuthState(prev => ({ ...prev, notificationsCount: count }))
  }

  const refreshUser = async () => {
    await checkAuth()
  }

  return {
    ...authState,
    login,
    register,
    logout,
    updateNotificationsCount,
    refreshUser
  }
} 