const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Vérification de la base de données...\n');

    // 1. Tester la connexion
    console.log('1. Test de connexion à la base de données...');
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');

    // 2. Vérifier les tables
    console.log('\n2. Vérification des tables...');
    
    // Compter les utilisateurs
    const userCount = await prisma.user.count();
    console.log('   👥 Utilisateurs:', userCount);

    // Compter les objectifs
    const goalCount = await prisma.goal.count();
    console.log('   🎯 Objectifs:', goalCount);

    // Compter les tâches
    const taskCount = await prisma.task.count();
    console.log('   ✅ Tâches:', taskCount);

    // Compter les entrées de journal
    const journalCount = await prisma.journalEntry.count();
    console.log('   📝 Entrées de journal:', journalCount);

    // Compter les notifications
    const notificationCount = await prisma.notification.count();
    console.log('   🔔 Notifications:', notificationCount);

    // Compter les achievements
    const achievementCount = await prisma.achievement.count();
    console.log('   🏆 Achievements:', achievementCount);

    // 3. Vérifier les variables d'environnement
    console.log('\n3. Variables d\'environnement...');
    console.log('   DATABASE_URL:', process.env.DATABASE_URL ? '✅ Définie' : '❌ Non définie');
    console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Définie' : '❌ Non définie');
    console.log('   NODE_ENV:', process.env.NODE_ENV || 'development');

    // 4. Lister quelques utilisateurs récents
    if (userCount > 0) {
      console.log('\n4. Utilisateurs récents:');
      const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true
        }
      });

      recentUsers.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name || 'Sans nom'} (${user.email}) - ${user.createdAt.toLocaleDateString()}`);
      });
    }

    // 5. Vérifier la structure de la base
    console.log('\n5. Structure de la base de données...');
    try {
      // Tester une requête complexe
      const userWithData = await prisma.user.findFirst({
        include: {
          goals: true,
          tasks: true,
          journalEntries: true,
          notifications: true
        }
      });
      console.log('✅ Structure de la base de données valide');
    } catch (error) {
      console.log('❌ Problème avec la structure:', error.message);
    }

    console.log('\n🎉 Vérification de la base de données terminée !');

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    
    if (error.code === 'P1001') {
      console.log('\n💡 Solution: Vérifiez votre DATABASE_URL dans les variables d\'environnement');
    } else if (error.code === 'P2002') {
      console.log('\n💡 Solution: Problème de contrainte unique');
    } else if (error.code === 'P2025') {
      console.log('\n💡 Solution: Enregistrement non trouvé');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la vérification
checkDatabase(); 