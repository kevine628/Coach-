import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  BookOpen, 
  Video, 
  MessageSquare, 
  ArrowRight,
  Target,
  Brain,
  BookOpen as JournalIcon,
  Bell,
  Star,
  Users,
  TrendingUp
} from "lucide-react"

export default function AidePage() {
  const categories = [
    {
      title: "Premiers pas",
      description: "Commencer avec CoachIA",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      articles: [
        { title: "Comment créer votre premier objectif", href: "/aide/premiers-pas/creer-objectif" },
        { title: "Configurer votre profil", href: "/aide/premiers-pas/configurer-profil" },
        { title: "Naviguer dans l'interface", href: "/aide/premiers-pas/navigation" },
        { title: "Comprendre le tableau de bord", href: "/aide/premiers-pas/tableau-bord" }
      ]
    },
    {
      title: "Objectifs et tâches",
      description: "Gérer vos objectifs efficacement",
      icon: Target,
      color: "bg-green-100 text-green-600",
      articles: [
        { title: "Créer des objectifs SMART", href: "/aide/objectifs/objectifs-smart" },
        { title: "Suivre vos progrès", href: "/aide/objectifs/suivre-progres" },
        { title: "Gérer les rappels", href: "/aide/objectifs/gerer-rappels" },
        { title: "Archiver et compléter", href: "/aide/objectifs/archiver-completer" }
      ]
    },
    {
      title: "Assistant IA",
      description: "Utiliser l'intelligence artificielle",
      icon: Brain,
      color: "bg-purple-100 text-purple-600",
      articles: [
        { title: "Poser des questions à l'IA", href: "/aide/assistant/poser-questions" },
        { title: "Générer des plans d'action", href: "/aide/assistant/plans-action" },
        { title: "Personnaliser l'assistant", href: "/aide/assistant/personnaliser" },
        { title: "Conseils pour de meilleures réponses", href: "/aide/assistant/conseils" }
      ]
    },
    {
      title: "Journal et notes",
      description: "Organiser vos pensées",
      icon: JournalIcon,
      color: "bg-orange-100 text-orange-600",
      articles: [
        { title: "Créer votre premier journal", href: "/aide/journal/premier-journal" },
        { title: "Organiser vos notes", href: "/aide/journal/organiser-notes" },
        { title: "Utiliser les tags", href: "/aide/journal/utiliser-tags" },
        { title: "Exporter vos données", href: "/aide/journal/exporter-donnees" }
      ]
    },
    {
      title: "Notifications",
      description: "Rester informé",
      icon: Bell,
      color: "bg-red-100 text-red-600",
      articles: [
        { title: "Configurer les notifications", href: "/aide/notifications/configurer" },
        { title: "Types de notifications", href: "/aide/notifications/types" },
        { title: "Gérer les préférences", href: "/aide/notifications/preferences" },
        { title: "Dépanner les notifications", href: "/aide/notifications/depanner" }
      ]
    },
    {
      title: "Achievements",
      description: "Débloquer des récompenses",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
      articles: [
        { title: "Comprendre le système d'achievements", href: "/aide/achievements/systeme" },
        { title: "Débloquer des achievements", href: "/aide/achievements/debloquer" },
        { title: "Voir vos statistiques", href: "/aide/achievements/statistiques" },
        { title: "Partager vos succès", href: "/aide/achievements/partager" }
      ]
    }
  ]

  const popularArticles = [
    "Comment créer votre premier objectif",
    "Configurer les notifications",
    "Utiliser l'assistant IA",
    "Gérer votre profil",
    "Exporter vos données"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Retour à l'accueil
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">Centre d'aide</h1>
          <p className="text-xl text-gray-600 mb-8">
            Trouvez rapidement l'aide dont vous avez besoin pour utiliser CoachIA efficacement
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Popular Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Articles populaires</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article, index) => (
              <Link key={index} href={`/aide/article/${index + 1}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <p className="font-medium text-gray-900">{article}</p>
                    <ArrowRight className="w-4 h-4 text-gray-400 mt-2" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Parcourir par catégorie</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Link 
                          href={article.href}
                          className="text-blue-600 hover:text-blue-800 text-sm block py-1"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-16 bg-white rounded-lg p-8 border">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Besoin d'aide supplémentaire ?</h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Contacter le support
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline">
                  Voir toutes les options
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 