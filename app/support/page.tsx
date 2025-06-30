import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  Headphones,
  MessageSquare,
  Mail,
  Phone,
  Video,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  Zap,
  Star
} from "lucide-react"

export default function SupportPage() {
  const supportOptions = [
    {
      title: "Chat en direct",
      description: "Parlez directement avec notre équipe",
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
      availability: "24h/24",
      responseTime: "Immédiat",
      features: ["Support instantané", "Conversation en temps réel", "Partage d'écran possible"],
      action: "Démarrer le chat",
      href: "/support/chat"
    },
    {
      title: "Email",
      description: "Envoyez-nous un message détaillé",
      icon: Mail,
      color: "bg-blue-100 text-blue-600",
      availability: "24h/24",
      responseTime: "Sous 24h",
      features: ["Réponse détaillée", "Pièces jointes acceptées", "Suivi de ticket"],
      action: "Envoyer un email",
      href: "/contact"
    },
    {
      title: "Téléphone",
      description: "Appelez-nous directement",
      icon: Phone,
      color: "bg-purple-100 text-purple-600",
      availability: "Lun-Ven 9h-18h",
      responseTime: "Immédiat",
      features: ["Support vocal", "Résolution rapide", "Personnalisé"],
      action: "Appeler maintenant",
      href: "tel:+33123456789"
    },
    {
      title: "Vidéoconférence",
      description: "Rendez-vous en visioconférence",
      icon: Video,
      color: "bg-orange-100 text-orange-600",
      availability: "Sur rendez-vous",
      responseTime: "Sous 48h",
      features: ["Support visuel", "Démonstration en direct", "Formation personnalisée"],
      action: "Prendre rendez-vous",
      href: "/support/rdv"
    }
  ]

  const resources = [
    {
      title: "Centre d'aide",
      description: "Articles et guides détaillés",
      icon: BookOpen,
      href: "/aide",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Documentation",
      description: "Documentation technique complète",
      icon: BookOpen,
      href: "/documentation",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Communauté",
      description: "Forum et discussions utilisateurs",
      icon: Users,
      href: "/communaute",
      color: "bg-purple-100 text-purple-600"
    }
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
          <h1 className="text-4xl font-bold mb-4">Support</h1>
          <p className="text-xl text-gray-600">
            Nous sommes là pour vous accompagner. Choisissez la méthode qui vous convient le mieux.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Support Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Comment pouvons-nous vous aider ?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${option.color}`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Disponibilité :</span>
                    <span className="font-medium">{option.availability}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Délai de réponse :</span>
                    <span className="font-medium">{option.responseTime}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Avantages :</p>
                    <ul className="space-y-1">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={option.href} className="block mt-6">
                    <Button className="w-full">
                      {option.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Ressources utiles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Link key={index} href={resource.href}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${resource.color}`}>
                        <resource.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{resource.title}</h3>
                        <p className="text-gray-600 text-sm">{resource.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Status */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Statut des services</CardTitle>
              <CardDescription>
                Vérifiez l'état de nos services en temps réel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Application web</p>
                    <p className="text-sm text-gray-600">Opérationnel</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">API</p>
                    <p className="text-sm text-gray-600">Opérationnel</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Base de données</p>
                    <p className="text-sm text-gray-600">Opérationnel</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <Link href="/status">
                  <Button variant="outline">
                    Voir le statut détaillé
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <Headphones className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Besoin d'aide urgente ?</h3>
              <p className="text-xl mb-6 opacity-90">
                Notre équipe est disponible 24h/24 pour vous accompagner
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support/chat">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    <Zap className="w-4 h-4 mr-2" />
                    Chat en direct
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyer un email
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
} 