import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowRight,
  FileText,
  Scale,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Mail
} from "lucide-react"

export default function ConditionsPage() {
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
          <h1 className="text-4xl font-bold mb-4">Conditions d'utilisation</h1>
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
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Bienvenue chez CoachIA</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Ces conditions d'utilisation régissent votre utilisation de la plateforme CoachIA. 
                  En utilisant nos services, vous acceptez ces conditions.
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          {/* Définitions */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Définitions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">"CoachIA", "nous", "notre"</h3>
                  <p className="text-gray-600">Désigne la société CoachIA et ses services.</p>
                </div>
                <div>
                  <h3 className="font-semibold">"Utilisateur", "vous", "votre"</h3>
                  <p className="text-gray-600">Désigne toute personne utilisant nos services.</p>
                </div>
                <div>
                  <h3 className="font-semibold">"Services"</h3>
                  <p className="text-gray-600">Désigne la plateforme CoachIA, ses fonctionnalités et API.</p>
                </div>
                <div>
                  <h3 className="font-semibold">"Contenu"</h3>
                  <p className="text-gray-600">Désigne toutes les données, textes, images que vous créez ou partagez.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Acceptation */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Acceptation des conditions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    En créant un compte ou en utilisant nos services, vous confirmez que :
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Vous avez lu et compris ces conditions d'utilisation</li>
                    <li>• Vous acceptez d'être lié par ces conditions</li>
                    <li>• Vous avez l'âge légal pour contracter (18 ans ou plus)</li>
                    <li>• Vous avez le pouvoir de contracter au nom de votre organisation si applicable</li>
                  </ul>
                  <p className="text-gray-600">
                    Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Services */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Description des services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-gray-600">
                    CoachIA est une plateforme de développement personnel qui propose :
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Fonctionnalités principales</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Gestion d'objectifs personnels</li>
                        <li>• Journal et prise de notes</li>
                        <li>• Assistant IA intelligent</li>
                        <li>• Suivi de progression</li>
                        <li>• Notifications personnalisées</li>
                        <li>• Système d'achievements</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Services inclus</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Application web responsive</li>
                        <li>• API pour développeurs</li>
                        <li>• Support client</li>
                        <li>• Sauvegarde automatique</li>
                        <li>• Mises à jour régulières</li>
                        <li>• Documentation complète</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Compte utilisateur */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Compte utilisateur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Création de compte</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Vous devez fournir des informations exactes et à jour</li>
                    <li>• Vous êtes responsable de la confidentialité de vos identifiants</li>
                    <li>• Vous devez nous informer immédiatement de toute utilisation non autorisée</li>
                    <li>• Un seul compte par personne est autorisé</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Responsabilités</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Vous êtes responsable de toutes les activités sous votre compte</li>
                    <li>• Vous ne devez pas partager vos identifiants</li>
                    <li>• Vous devez maintenir la sécurité de votre compte</li>
                    <li>• Vous devez respecter les lois applicables</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Utilisation acceptable */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Utilisation acceptable</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Vous pouvez :</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Utiliser nos services pour vos objectifs personnels</li>
                      <li>• Créer et partager du contenu original</li>
                      <li>• Utiliser l'API conformément à notre documentation</li>
                      <li>• Contacter notre support pour obtenir de l'aide</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Vous ne pouvez pas :</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Utiliser nos services à des fins illégales</li>
                      <li>• Violer les droits de propriété intellectuelle</li>
                      <li>• Tenter de pirater ou compromettre la sécurité</li>
                      <li>• Spammer ou harceler d'autres utilisateurs</li>
                      <li>• Utiliser des bots ou scripts automatisés non autorisés</li>
                      <li>• Revendre ou redistribuer nos services</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Nos droits</h3>
                  <p className="text-gray-600">
                    CoachIA et son contenu (code, design, marques, etc.) sont protégés par les droits 
                    de propriété intellectuelle. Nous conservons tous les droits sur nos services.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Vos droits</h3>
                  <p className="text-gray-600">
                    Vous conservez la propriété de votre contenu. En utilisant nos services, vous nous 
                    accordez une licence limitée pour héberger et afficher votre contenu.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Licence d'utilisation</h3>
                  <p className="text-gray-600">
                    Nous vous accordons une licence personnelle, non exclusive, non transférable 
                    pour utiliser nos services conformément à ces conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Paiements */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Paiements et abonnements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Tarifs</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Les tarifs sont affichés sur notre site et peuvent être modifiés</li>
                    <li>• Les prix sont exprimés en euros et incluent la TVA</li>
                    <li>• Les paiements sont prélevés automatiquement selon votre plan</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Résiliation</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Vous pouvez annuler votre abonnement à tout moment</li>
                    <li>• L'annulation prend effet à la fin de la période de facturation</li>
                    <li>• Aucun remboursement pour les périodes déjà payées</li>
                    <li>• Nous pouvons suspendre votre compte en cas de non-paiement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Limitation de responsabilité */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Limitation de responsabilité</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Dans toute la mesure permise par la loi, CoachIA ne sera pas responsable de :
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Les dommages indirects, accessoires ou consécutifs</li>
                    <li>• La perte de données ou d'informations</li>
                    <li>• Les interruptions de service non intentionnelles</li>
                    <li>• Les actions d'autres utilisateurs</li>
                    <li>• Les dommages dépassant le montant payé pour nos services</li>
                  </ul>
                  <p className="text-gray-600">
                    Cette limitation ne s'applique pas en cas de faute intentionnelle ou de négligence grave.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Modifications */}
          <section>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Modifications des conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Nous nous réservons le droit de modifier ces conditions à tout moment. 
                    Les modifications seront publiées sur cette page avec une nouvelle date de mise à jour.
                  </p>
                  <p className="text-gray-600">
                    Votre utilisation continue de nos services après publication des modifications 
                    constitue votre acceptation des nouvelles conditions.
                  </p>
                  <p className="text-gray-600">
                    Pour les modifications importantes, nous vous informerons par email 
                    au moins 30 jours à l'avance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <Scale className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Questions sur nos conditions ?</h3>
                <p className="text-xl mb-6 opacity-90">
                  Notre équipe juridique est là pour vous aider
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