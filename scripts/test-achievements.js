const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testAchievements() {
  try {
    console.log('🧪 Test du système d\'achievements...\n')

    // 1. Vérifier que les achievements existent
    console.log('1. Vérification des achievements dans la base de données...')
    const achievements = await prisma.achievement.findMany()
    console.log(`✅ ${achievements.length} achievements trouvés dans la base de données`)

    if (achievements.length === 0) {
      console.log('⚠️  Aucun achievement trouvé. Initialisation nécessaire.')
      return
    }

    // 2. Afficher quelques achievements
    console.log('\n2. Exemples d\'achievements:')
    achievements.slice(0, 3).forEach(achievement => {
      console.log(`   - ${achievement.name} (${achievement.rarity}) - ${achievement.points} points`)
    })

    // 3. Vérifier les utilisateurs
    console.log('\n3. Vérification des utilisateurs...')
    const users = await prisma.user.findMany()
    console.log(`✅ ${users.length} utilisateurs trouvés`)

    if (users.length === 0) {
      console.log('⚠️  Aucun utilisateur trouvé. Créez un utilisateur d\'abord.')
      return
    }

    // 4. Vérifier les achievements des utilisateurs
    console.log('\n4. Vérification des achievements des utilisateurs...')
    const userAchievements = await prisma.userAchievement.findMany({
      include: {
        user: true,
        achievement: true
      }
    })
    console.log(`✅ ${userAchievements.length} achievements utilisateur trouvés`)

    if (userAchievements.length > 0) {
      console.log('\n   Achievements débloqués:')
      userAchievements.forEach(ua => {
        console.log(`   - ${ua.user.email}: ${ua.achievement.name}`)
      })
    }

    // 5. Statistiques
    console.log('\n5. Statistiques:')
    const totalAchievements = achievements.length
    const totalUnlocked = userAchievements.length
    const completionRate = totalAchievements > 0 ? Math.round((totalUnlocked / totalAchievements) * 100) : 0
    
    console.log(`   - Total achievements: ${totalAchievements}`)
    console.log(`   - Achievements débloqués: ${totalUnlocked}`)
    console.log(`   - Taux de completion: ${completionRate}%`)

    // 6. Vérifier les catégories
    console.log('\n6. Répartition par catégorie:')
    const categories = {}
    achievements.forEach(achievement => {
      categories[achievement.category] = (categories[achievement.category] || 0) + 1
    })
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} achievements`)
    })

    // 7. Vérifier les raretés
    console.log('\n7. Répartition par rareté:')
    const rarities = {}
    achievements.forEach(achievement => {
      rarities[achievement.rarity] = (rarities[achievement.rarity] || 0) + 1
    })
    
    Object.entries(rarities).forEach(([rarity, count]) => {
      console.log(`   - ${rarity}: ${count} achievements`)
    })

    console.log('\n✅ Test terminé avec succès!')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Exécuter le test
testAchievements() 