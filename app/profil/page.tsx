"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  BarChart3, 
  Target, 
  CheckCircle, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Trash2,
  Download
} from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  location?: string
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      reminders: boolean
    }
    privacy: {
      profileVisibility: 'public' | 'private'
      dataSharing: boolean
    }
    theme: 'light' | 'dark' | 'system'
    language: 'fr' | 'en'
  }
  stats: {
    totalGoals: number
    completedGoals: number
    totalTasks: number
    completedTasks: number
    journalEntries: number
    streakDays: number
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          location: data.location || ''
        })
      } else {
        router.push('/connexion')
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        await fetchProfile()
        setEditing(false)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const updatePreferences = async (section: string, key: string, value: any) => {
    if (!profile) return

    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        [section]: {
          ...profile.preferences[section as keyof typeof profile.preferences],
          [key]: value
        }
      }
    }

    try {
      const response = await fetch('/api/profile/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile.preferences)
      })
      
      if (response.ok) {
        setProfile(updatedProfile)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des préférences:', error)
    }
  }

  const exportData = async () => {
    try {
      const response = await fetch('/api/profile/export')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'mes-donnees-coachia.json'
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error)
    }
  }

  const deleteAccount = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      try {
        const response = await fetch('/api/profile', { method: 'DELETE' })
        if (response.ok) {
          router.push('/connexion')
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Erreur lors du chargement du profil</p>
          <Button onClick={() => router.push('/connexion')} className="mt-4">
            Se connecter
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mon Profil</h1>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button onClick={updateProfile} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
              <Button onClick={() => setEditing(false)} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)} size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profil principal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl">
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-gray-600">{profile.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {editing && (
              <div className="space-y-3 pt-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Paris, France"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contenu principal */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
              <TabsTrigger value="account">Compte</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Mes statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{profile.stats.totalGoals}</div>
                      <div className="text-sm text-gray-600">Objectifs</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{profile.stats.completedGoals}</div>
                      <div className="text-sm text-gray-600">Réalisés</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{profile.stats.totalTasks}</div>
                      <div className="text-sm text-gray-600">Tâches</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">{profile.stats.streakDays}</div>
                      <div className="text-sm text-gray-600">Jours consécutifs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Préférences de notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-gray-600">Recevoir des rappels par email</p>
                    </div>
                    <Switch
                      checked={profile.preferences.notifications.email}
                      onCheckedChange={(checked) => updatePreferences('notifications', 'email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifications push</Label>
                      <p className="text-sm text-gray-600">Recevoir des notifications sur le navigateur</p>
                    </div>
                    <Switch
                      checked={profile.preferences.notifications.push}
                      onCheckedChange={(checked) => updatePreferences('notifications', 'push', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Rappels automatiques</Label>
                      <p className="text-sm text-gray-600">Rappels pour les tâches et objectifs</p>
                    </div>
                    <Switch
                      checked={profile.preferences.notifications.reminders}
                      onCheckedChange={(checked) => updatePreferences('notifications', 'reminders', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Confidentialité et sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Visibilité du profil</Label>
                    <Select
                      value={profile.preferences.privacy.profileVisibility}
                      onValueChange={(value) => updatePreferences('privacy', 'profileVisibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Privé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Partage de données</Label>
                      <p className="text-sm text-gray-600">Autoriser l'utilisation anonyme des données pour améliorer le service</p>
                    </div>
                    <Switch
                      checked={profile.preferences.privacy.dataSharing}
                      onCheckedChange={(checked) => updatePreferences('privacy', 'dataSharing', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Paramètres du compte
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Thème</Label>
                    <Select
                      value={profile.preferences.theme}
                      onValueChange={(value) => updatePreferences('theme', 'theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Clair</SelectItem>
                        <SelectItem value="dark">Sombre</SelectItem>
                        <SelectItem value="system">Système</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Langue</Label>
                    <Select
                      value={profile.preferences.language}
                      onValueChange={(value) => updatePreferences('language', 'language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button onClick={exportData} variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter mes données
                    </Button>
                    <Button onClick={deleteAccount} variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer mon compte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 