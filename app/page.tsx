import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  Brain, 
  Target, 
  BookOpen, 
  Bell, 
  Shield, 
  Sparkles, 
  Check, 
  Star, 
  Users, 
  HelpCircle, 
  Mail, 
  FileText, 
  Lock,
  Zap,
  TrendingUp,
  Award,
  Globe,
  Smartphone,
  BarChart3,
  MessageSquare,
  Headphones,

  Scale,
  Eye,
  Cookie
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CoachIA
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#produit" className="text-gray-600 hover:text-gray-900 transition-colors">
              Produit
            </Link>
            <Link href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#tarifs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Tarifs
            </Link>
            <Link href="#securite" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sécurité
            </Link>
            <Link href="/connexion" className="text-gray-600 hover:text-gray-900 transition-colors">
              Connexion
            </Link>
            <Link href="/inscription">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Commencer gratuitement
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Sparkles className="w-4 h-4 mr-1" />
            Nouveau : Assistant IA personnalisé
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Votre coach IA personnel pour une vie équilibrée
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Organisez votre vie, atteignez vos objectifs et améliorez votre bien-être avec l'aide de l'intelligence
            artificielle. Conçu spécialement pour les habitudes françaises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscription">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
              >
                Commencer gratuitement
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Voir la démo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Gratuit pendant 14 jours • Aucune carte bancaire requise</p>
        </div>
      </section>

      {/* Produit Section */}
      <section id="produit" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Découvrez CoachIA</h2>
            <p className="text-xl text-gray-600">Une plateforme complète pour votre développement personnel</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Interface intuitive</CardTitle>
                <CardDescription>
                  Design moderne et responsive adapté à tous vos appareils
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Suivi de progression</CardTitle>
                <CardDescription>
                  Visualisez vos progrès avec des graphiques et statistiques détaillées
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Système de récompenses</CardTitle>
                <CardDescription>
                  Débloquez des achievements et restez motivé dans votre parcours
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Disponible partout</CardTitle>
                <CardDescription>
                  Accédez à votre compte depuis n'importe quel appareil
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Application mobile</CardTitle>
                <CardDescription>
                  Version mobile optimisée pour iOS et Android
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Analytics avancés</CardTitle>
                <CardDescription>
                  Comprenez vos habitudes avec des insights détaillés
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Fonctionnalités principales</h2>
            <p className="text-xl text-gray-600">Des outils puissants et simples pour transformer votre quotidien</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Tableau de bord personnalisé</CardTitle>
                <CardDescription>
                  Vue synthétique de vos objectifs, tâches et progrès avec un suivi quotidien et hebdomadaire
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Assistant IA intelligent</CardTitle>
                <CardDescription>
                  Suggestions personnalisées pour votre productivité et bien-être, avec génération automatique de plans
                  d'action
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Journal & Notes</CardTitle>
                <CardDescription>
                  Espace de prise de notes libre et journal quotidien pour suivre votre évolution personnelle
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Notifications intelligentes</CardTitle>
                <CardDescription>
                  Rappels par email pour vos tâches importantes et objectifs, adaptés à votre rythme
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Sécurité maximale</CardTitle>
                <CardDescription>
                  Authentification sécurisée avec options de connexion Google et Apple pour votre tranquillité d'esprit
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Objectifs SMART</CardTitle>
                <CardDescription>
                  Création et suivi d'objectifs structurés avec méthode SMART et rappels personnalisés
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tarifs simples et transparents</h2>
            <p className="text-xl text-gray-600">Commencez gratuitement, évoluez selon vos besoins</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Plan Gratuit</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  0€<span className="text-lg font-normal text-gray-600">/mois</span>
                </div>
                <CardDescription>Parfait pour commencer votre transformation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>3 objectifs actifs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Journal personnel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Assistant IA basique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Notifications email</span>
                  </li>
                </ul>
                <Link href="/inscription" className="block mt-6">
                  <Button className="w-full bg-transparent" variant="outline">
                    Commencer gratuitement
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Populaire</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Plan Premium</CardTitle>
                <div className="text-4xl font-bold mt-4">
                  9.99€<span className="text-lg font-normal text-gray-600">/mois</span>
                </div>
                <CardDescription>Tout ce dont vous avez besoin pour réussir</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Objectifs illimités</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Assistant IA avancé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Analytics détaillés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Support prioritaire</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>Export de données</span>
                  </li>
                </ul>
                <Link href="/inscription" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Commencer l'essai gratuit
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sécurité Section */}
      <section id="securite" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Sécurité et confidentialité</h2>
            <p className="text-xl text-gray-600">Vos données sont protégées avec les plus hauts standards</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Chiffrement de bout en bout</CardTitle>
                <CardDescription>
                  Toutes vos données sont chiffrées avec les algorithmes les plus sécurisés
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Authentification sécurisée</CardTitle>
                <CardDescription>
                  Connexion avec Google, Apple ou mot de passe fort avec 2FA
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Contrôle total</CardTitle>
                <CardDescription>
                  Vous gardez le contrôle de vos données et pouvez les supprimer à tout moment
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Support et aide</h2>
            <p className="text-xl text-gray-600">Nous sommes là pour vous accompagner</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Centre d'aide</CardTitle>
                <CardDescription>
                  Articles et guides pour utiliser CoachIA efficacement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/aide">
                  <Button variant="outline" className="w-full">
                    Accéder à l'aide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Contact</CardTitle>
                <CardDescription>
                  Contactez notre équipe pour toute question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Nous contacter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Headphones className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Support</CardTitle>
                <CardDescription>
                  Assistance technique et support client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/support">
                  <Button variant="outline" className="w-full">
                    Obtenir de l'aide
                  </Button>
                </Link>
              </CardContent>
            </Card>


          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CoachIA</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre coach IA personnel pour une vie équilibrée et productive.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produit</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#produit" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="#tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="#securite" className="hover:text-white transition-colors">Sécurité</Link></li>

              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/aide" className="hover:text-white transition-colors">Centre d'aide</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Statut du service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link href="/conditions" className="hover:text-white transition-colors">Conditions</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CoachIA. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
