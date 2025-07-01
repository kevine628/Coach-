const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function migrateToPostgres() {
  try {
    console.log('🚀 Migration vers PostgreSQL...')

    // Générer le client Prisma
    console.log('📦 Génération du client Prisma...')
    await prisma.$executeRaw`SELECT 1`
    console.log('✅ Connexion à PostgreSQL réussie')

    // Appliquer les migrations
    console.log('🔄 Application des migrations...')
    // Les migrations seront appliquées automatiquement par Render

    // Créer un utilisateur test pour la production
    console.log('👤 Création d\'un utilisateur test...')
    const testUser = await prisma.user.upsert({
      where: { email: 'admin@coachia.com' },
      update: {},
      create: {
        email: 'admin@coachia.com',
        name: 'Administrateur CoachIA',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK8i', // password123
        preferences: JSON.stringify({
          theme: 'light',
          notifications: { email: true, push: false },
          language: 'fr'
        })
      }
    })
    console.log('✅ Utilisateur test créé:', testUser.email)

    console.log('🎉 Migration vers PostgreSQL terminée avec succès!')
    console.log('📝 Identifiants de test:')
    console.log('   Email: admin@coachia.com')
    console.log('   Mot de passe: password123')

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateToPostgres() 