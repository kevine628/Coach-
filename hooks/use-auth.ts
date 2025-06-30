"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string | null
  email: string
  phone?: string | null
  preferences?: any
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
      // Vérifier l'authentification via l'API qui utilise les cookies
      const response = await fetch('/api/profile', {
        credentials: 'include' // Important pour inclure les cookies
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
        // Non authentifié
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
        credentials: 'include', // Important pour recevoir les cookies
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de connexion')
      }

      // Mettre à jour l'état avec les données utilisateur
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
        credentials: 'include',
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur d\'inscription')
      }

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

  const logout = async () => {
    try {
      // Appeler l'API de déconnexion pour nettoyer les cookies
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }

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