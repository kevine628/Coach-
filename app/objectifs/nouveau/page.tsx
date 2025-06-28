"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Target, ArrowLeft, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NouvelObjectifPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "Général",
    priority: "moyenne"
  })

  const categories = [
    "Général",
    "Santé",
    "Loisirs", 
    "Culture",
    "Apprentissage",
    "Bien-être",
    "Travail",
    "Finance",
    "Relations"
  ]

  const priorities = [
    { value: "haute", label: "Haute" },
    { value: "moyenne", label: "Moyenne" },
    { value: "basse", label: "Basse" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour créer un objectif",
          variant: "destructive"
        })
        router.push("/connexion")
        return
      }

      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Erreur lors de la création de l'objectif")
      }

      const goal = await response.json()
      
      toast({
        title: "Succès",
        description: "Objectif créé avec succès !"
      })

      router.push("/objectifs")
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Erreur lors de la création de l'objectif",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

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
              <Link href="/objectifs" className="text-blue-600 font-medium">
                Objectifs
              </Link>
              <Link href="/journal" className="text-gray-600 hover:text-gray-900">
                Journal
              </Link>
              <Link href="/assistant" className="text-gray-600 hover:text-gray-900">
                Assistant IA
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/objectifs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-600" />
              Nouvel Objectif
            </h1>
            <p className="text-gray-600 mt-1">Créez un nouvel objectif pour votre développement personnel</p>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'objectif</CardTitle>
              <CardDescription>
                Remplissez les informations ci-dessous pour créer votre nouvel objectif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Apprendre le piano"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre objectif en détail..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetDate">Date d'échéance</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => handleInputChange("targetDate", e.target.value)}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Créer l'objectif
                  </Button>
                  
                  <Link href="/objectifs">
                    <Button type="button" variant="outline">
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 