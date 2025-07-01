import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Switch } from "../../components/ui/switch"
import { 
  ArrowRight,
  Cookie,
  Settings,
  Shield,
  Eye,
  BarChart3,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react"

export default function CookiesPage() {
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
          <h1 className="text-4xl font-bold mb-4">Politique des cookies</h1>
          <p className="text-xl text-gray-600">
            Dernière mise à jour : 28 décembre 2024
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Qu'est-ce qu'un cookie ?</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Un cookie est un petit fichier texte stocké sur votre appareil qui nous aide 
                  à améliorer votre expérience sur CoachIA. Découvrez comment nous les utilisons.
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          {/* Types de cookies */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Types de cookies que nous utilisons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Cookies essentiels */}
                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Cookies essentiels</h3>
                        <p className="text-gray-600">Nécessaires au fonctionnement du site</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Toujours actifs</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      Ces cookies sont indispensables au fonctionnement de CoachIA. Ils permettent :
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• L'authentification et la sécurité de votre session</li>
                      <li>• La mémorisation de vos préférences de base</li>
                      <li>• La protection contre les attaques CSRF</li>
                      <li>• Le fonctionnement des formulaires</li>
                    </ul>
                    <p className="text-sm text-gray-500">
                      Ces cookies ne peuvent pas être désactivés car ils sont essentiels au fonctionnement du site.
                    </p>
                  </div>
                </div>

                {/* Cookies de performance */}
                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Cookies de performance</h3>
                        <p className="text-gray-600">Nous aident à améliorer le site</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm text-gray-500">Actif</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      Ces cookies nous aident à comprendre comment vous utilisez CoachIA :
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Pages les plus visitées</li>
                      <li>• Temps passé sur chaque page</li>
                      <li>• Erreurs rencontrées</li>
                      <li>• Performance du site</li>
                    </ul>
                    <p className="text-sm text-gray-500">
                      Ces données sont anonymisées et nous aident à améliorer votre expérience.
                    </p>
                  </div>
                </div>

                {/* Cookies de personnalisation */}
                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Cookies de personnalisation</h3>
                        <p className="text-gray-600">Personnalisent votre expérience</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm text-gray-500">Actif</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      Ces cookies mémorisent vos préférences pour personnaliser votre expérience :
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Thème (clair/sombre)</li>
                      <li>• Langue préférée</li>
                      <li>• Paramètres de notifications</li>
                      <li>• Préférences d'affichage</li>
                    </ul>
                    <p className="text-sm text-gray-500">
                      Sans ces cookies, vous devriez reconfigurer vos préférences à chaque visite.
                    </p>
                  </div>
                </div>

                {/* Cookies marketing */}
                <div className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Cookies marketing</h3>
                        <p className="text-gray-600">Améliorent la pertinence des publicités</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch />
                      <span className="text-sm text-gray-500">Inactif</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      Ces cookies sont utilisés pour afficher des publicités pertinentes :
                    </p>
                    <ul className="space-y-2 text-gray-600 ml-4">
                      <li>• Publicités personnalisées</li>
                      <li>• Mesure de l'efficacité des campagnes</li>
                      <li>• Limitation du nombre d'affichages</li>
                      <li>• Reconnaissance entre sites</li>
                    </ul>
                    <p className="text-sm text-gray-500">
                      Ces cookies peuvent être partagés avec nos partenaires publicitaires.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Gestion des cookies */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Comment gérer vos cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Dans votre navigateur</h3>
                  <p className="text-gray-600 mb-4">
                    Vous pouvez contrôler les cookies via les paramètres de votre navigateur :
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Chrome</h4>
                      <p className="text-sm text-gray-600">
                        Paramètres → Confidentialité et sécurité → Cookies et autres données de sites
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Firefox</h4>
                      <p className="text-sm text-gray-600">
                        Options → Confidentialité et sécurité → Cookies et données de sites
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Safari</h4>
                      <p className="text-sm text-gray-600">
                        Préférences → Confidentialité → Cookies et données de sites web
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Edge</h4>
                      <p className="text-sm text-gray-600">
                        Paramètres → Cookies et autorisations de sites → Cookies
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Dans votre compte CoachIA</h3>
                  <p className="text-gray-600 mb-4">
                    Vous pouvez également gérer vos préférences de cookies dans votre compte :
                  </p>
                  <Link href="/profil">
                    <Button>
                      <Settings className="w-4 h-4 mr-2" />
                      Aller aux paramètres
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cookies tiers */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Cookies tiers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-600">
                    Nous utilisons également des services tiers qui peuvent placer des cookies :
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Google Analytics</h3>
                      <p className="text-gray-600 text-sm">
                        Nous utilisons Google Analytics pour analyser l'utilisation du site. 
                        Google peut utiliser les données collectées pour personnaliser les publicités 
                        de son propre réseau publicitaire.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Stripe</h3>
                      <p className="text-gray-600 text-sm">
                        Pour le traitement des paiements, Stripe peut placer des cookies 
                        pour assurer la sécurité des transactions.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Intercom</h3>
                      <p className="text-gray-600 text-sm">
                        Pour le support client en temps réel, Intercom peut utiliser des cookies 
                        pour identifier les utilisateurs et améliorer le service.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-blue-800 font-medium mb-1">Important</p>
                        <p className="text-blue-700 text-sm">
                          Les cookies tiers sont soumis aux politiques de confidentialité 
                          de ces services. Nous vous encourageons à les consulter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Durée de conservation */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Durée de conservation des cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Cookies de session</h3>
                      <p className="text-gray-600">
                        Supprimés automatiquement lorsque vous fermez votre navigateur.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Cookies persistants</h3>
                      <p className="text-gray-600">
                        Conservés jusqu'à leur expiration ou suppression manuelle.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Durées typiques :</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Cookies essentiels : 1 an</li>
                      <li>• Cookies de performance : 2 ans</li>
                      <li>• Cookies de personnalisation : 1 an</li>
                      <li>• Cookies marketing : 90 jours</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Mise à jour */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Mise à jour de cette politique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Cette politique des cookies peut être mise à jour pour refléter :
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• L'ajout de nouveaux services tiers</li>
                    <li>• Les changements dans nos pratiques</li>
                    <li>• Les évolutions de la réglementation</li>
                    <li>• Les nouvelles fonctionnalités</li>
                  </ul>
                  <p className="text-gray-600">
                    Nous vous informerons des modifications importantes par email 
                    ou via une notification sur le site.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <Cookie className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Questions sur les cookies ?</h3>
                <p className="text-xl mb-6 opacity-90">
                  Notre équipe est là pour vous expliquer notre utilisation des cookies
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      Nous contacter
                    </Button>
                  </Link>
                  <Link href="/confidentialite">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      Politique de confidentialité
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
} 