import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { 
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Smartphone,
  Bell,
  RefreshCw
} from "lucide-react"

export default function StatusPage() {
  const services = [
    {
      name: "Application web",
      description: "Interface utilisateur principale",
      status: "operational",
      uptime: "99.9%",
      lastIncident: null,
      icon: Globe
    },
    {
      name: "API",
      description: "Interface de programmation",
      status: "operational",
      uptime: "99.8%",
      lastIncident: null,
      icon: Server
    },
    {
      name: "Base de données",
      description: "Stockage des données",
      status: "operational",
      uptime: "99.9%",
      lastIncident: null,
      icon: Database
    },
    {
      name: "Authentification",
      description: "Système de connexion",
      status: "operational",
      uptime: "99.7%",
      lastIncident: null,
      icon: Bell
    },
    {
      name: "Assistant IA",
      description: "Intelligence artificielle",
      status: "operational",
      uptime: "99.5%",
      lastIncident: null,
      icon: Activity
    },
    {
      name: "Notifications",
      description: "Système de notifications",
      status: "operational",
      uptime: "99.6%",
      lastIncident: null,
      icon: Bell
    }
  ]

  const regions = [
    {
      name: "Europe (Paris)",
      status: "operational",
      latency: "15ms",
      icon: Globe
    },
    {
      name: "Amérique du Nord (New York)",
      status: "operational",
      latency: "85ms",
      icon: Globe
    },
    {
      name: "Asie (Tokyo)",
      status: "operational",
      latency: "120ms",
      icon: Globe
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-600"
      case "degraded":
        return "bg-yellow-100 text-yellow-600"
      case "outage":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircle
      case "degraded":
        return AlertTriangle
      case "outage":
        return XCircle
      default:
        return Clock
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Opérationnel"
      case "degraded":
        return "Dégradé"
      case "outage":
        return "Panne"
      default:
        return "Inconnu"
    }
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Statut des services</h1>
              <p className="text-xl text-gray-600">
                Surveillez l'état de tous nos services en temps réel
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Status Overview */}
        <section className="mb-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Tous les systèmes opérationnels</h2>
              <p className="text-xl opacity-90">
                Aucun incident en cours - tous nos services fonctionnent normalement
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <span>Uptime global : 99.9%</span>
                <span>•</span>
                <span>Dernière mise à jour : Il y a 2 minutes</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">État des services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status)
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(service.status)}`}>
                          <service.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                      <StatusIcon className={`w-6 h-6 ${service.status === 'operational' ? 'text-green-600' : service.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Statut :</span>
                        <Badge className={getStatusColor(service.status)}>
                          {getStatusText(service.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uptime :</span>
                        <span className="font-medium">{service.uptime}</span>
                      </div>
                      {service.lastIncident && (
                        <div className="text-sm text-gray-600">
                          Dernier incident : {service.lastIncident}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Regions Status */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Régions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {regions.map((region, index) => {
              const StatusIcon = getStatusIcon(region.status)
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(region.status)}`}>
                          <region.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{region.name}</h3>
                        </div>
                      </div>
                      <StatusIcon className={`w-5 h-5 ${region.status === 'operational' ? 'text-green-600' : region.status === 'degraded' ? 'text-yellow-600' : 'text-red-600'}`} />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Latence :</span>
                        <span className="font-medium">{region.latency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Statut :</span>
                        <Badge className={getStatusColor(region.status)}>
                          {getStatusText(region.status)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Historical Data */}
        <section className="mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Données historiques</CardTitle>
              <CardDescription>
                Performance de nos services au cours des 30 derniers jours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime global</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">15ms</div>
                  <div className="text-sm text-gray-600">Latence moyenne</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
                  <div className="text-sm text-gray-600">Incidents majeurs</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-2">2</div>
                  <div className="text-sm text-gray-600">Maintenances planifiées</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notifications */}
        <section className="mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Notifications de statut</CardTitle>
              <CardDescription>
                Restez informé des mises à jour de statut
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input type="email" placeholder="Votre email" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    S'abonner
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    RSS Feed
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Webhook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <Activity className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Problème avec nos services ?</h3>
              <p className="text-xl mb-6 opacity-90">
                Notre équipe technique est disponible 24h/24 pour vous aider
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/support">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    Contacter le support
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Signaler un problème
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