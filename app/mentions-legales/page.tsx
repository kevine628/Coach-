import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { 
  ArrowRight,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Scale,
  FileText
} from "lucide-react"

export default function MentionsLegalesPage() {
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
          <h1 className="text-4xl font-bold mb-4">Mentions légales</h1>
          <p className="text-xl text-gray-600">
            Dernière mise à jour : 28 décembre 2024
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Éditeur */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Éditeur du site</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Raison sociale</h3>
                    <p className="text-gray-600">CoachIA SAS</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Capital social</h3>
                    <p className="text-gray-600">10 000 €</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">SIRET</h3>
                    <p className="text-gray-600">123 456 789 00012</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">TVA intracommunautaire</h3>
                    <p className="text-gray-600">FR12345678901</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Adresse</h3>
                      <p className="text-gray-600">
                        123 Rue de la Tech<br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Téléphone</h3>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">contact@coachia.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Site web</h3>
                      <p className="text-gray-600">https://coachia.fr</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Direction */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Direction de la publication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Directeur de la publication</h3>
                    <p className="text-gray-600">Jean Dupont, Président de CoachIA SAS</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Responsable de la rédaction</h3>
                    <p className="text-gray-600">Marie Martin, Directrice du contenu</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Délégué à la protection des données</h3>
                    <p className="text-gray-600">Pierre Durand, DPO</p>
                    <p className="text-gray-600 text-sm">Email : dpo@coachia.fr</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Hébergement */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Hébergement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Hébergeur principal</h3>
                    <p className="text-gray-600">Vercel Inc.</p>
                    <p className="text-gray-600">340 S Lemon Ave #4133</p>
                    <p className="text-gray-600">Walnut, CA 91789, États-Unis</p>
                    <p className="text-gray-600">Site web : https://vercel.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Base de données</h3>
                    <p className="text-gray-600">Railway Corporation</p>
                    <p className="text-gray-600">2261 Market Street #5021</p>
                    <p className="text-gray-600">San Francisco, CA 94114, États-Unis</p>
                    <p className="text-gray-600">Site web : https://railway.app</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Propriété intellectuelle</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Marques déposées</h3>
                  <p className="text-gray-600">
                    "CoachIA" est une marque déposée de CoachIA SAS. Tous les droits sont réservés.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Droits d'auteur</h3>
                  <p className="text-gray-600">
                    L'ensemble du contenu de ce site (textes, images, code, design) est protégé 
                    par les droits d'auteur. Toute reproduction, représentation, modification, 
                    publication, adaptation totale ou partielle des éléments du site, quel que 
                    soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite 
                    préalable de CoachIA SAS.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Licences</h3>
                  <p className="text-gray-600">
                    Certains composants de ce site utilisent des logiciels libres sous licence 
                    MIT, Apache 2.0 ou autres licences open source. Les attributions appropriées 
                    sont disponibles sur demande.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Responsabilité */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Limitation de responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Informations</h3>
                  <p className="text-gray-600">
                    Les informations contenues sur ce site sont aussi précises que possible 
                    et le site est périodiquement remis à jour, mais peut toutefois contenir 
                    des inexactitudes, des omissions ou des lacunes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Liens hypertextes</h3>
                  <p className="text-gray-600">
                    Les liens hypertextes mis en place dans le cadre du présent site web 
                    en direction d'autres ressources présentes sur le réseau Internet ne 
                    sauraient engager la responsabilité de CoachIA SAS.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Disponibilité</h3>
                  <p className="text-gray-600">
                    CoachIA SAS s'efforce d'assurer au mieux de ses possibilités l'exactitude 
                    et la mise à jour des informations diffusées sur ce site, dont elle se 
                    réserve le droit de corriger, à tout moment et sans préavis, le contenu.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Réglementation */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Réglementation applicable</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Droit applicable</h3>
                    <p className="text-gray-600">
                      Le présent site est soumis au droit français. Tout litige sera soumis 
                      à la compétence des tribunaux français.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Réglementation RGPD</h3>
                    <p className="text-gray-600">
                      Le traitement des données personnelles est conforme au Règlement Général 
                      sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Autorité de contrôle</h3>
                    <p className="text-gray-600">
                      Commission Nationale de l'Informatique et des Libertés (CNIL)<br />
                      3 Place de Fontenoy<br />
                      75007 Paris, France
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Médiation */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Médiation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Conformément aux dispositions du Code de la consommation concernant 
                    le règlement amiable des litiges, CoachIA SAS adhère au service du 
                    médiateur de la FEVAD (Fédération du e-commerce et de la vente à distance) 
                    dont les coordonnées sont les suivantes :
                  </p>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Médiateur de la FEVAD</strong><br />
                      60 rue de la Boétie<br />
                      75008 Paris<br />
                      Site web : https://www.mediateurfevad.fr<br />
                      Email : mediateur@fevad.com
                    </p>
                  </div>
                  <p className="text-gray-600">
                    Le consommateur peut également recourir à la plateforme de résolution 
                    en ligne des litiges (RLL) mise en place par la Commission européenne.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Questions légales ?</h3>
                <p className="text-xl mb-6 opacity-90">
                  Notre équipe juridique est à votre disposition
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="mailto:legal@coachia.fr">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      <Mail className="w-4 h-4 mr-2" />
                      Contacter l'équipe juridique
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                      Support général
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