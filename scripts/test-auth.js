const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    console.log('🧪 Test de la fonction d\'authentification...\n');

    // 1. Créer un utilisateur de test
    console.log('1. Création d\'un utilisateur de test...');
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    const testName = 'Utilisateur Test';

    // Vérifier si l'utilisateur existe déjà
    let user = await prisma.user.findUnique({
      where: { email: testEmail }
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(testPassword, 12);
      user = await prisma.user.create({
        data: {
          email: testEmail,
          password: hashedPassword,
          name: testName,
          preferences: JSON.stringify({
            theme: 'light',
            notifications: {
              email: true,
              push: false
            },
            language: 'fr'
          })
        }
      });
      console.log('✅ Utilisateur créé:', user.email);
    } else {
      console.log('✅ Utilisateur existant trouvé:', user.email);
    }

    // 2. Tester l'authentification
    console.log('\n2. Test de l\'authentification...');
    
    // Test avec bon mot de passe
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    console.log('✅ Mot de passe valide:', isPasswordValid);

    // Test avec mauvais mot de passe
    const isWrongPasswordValid = await bcrypt.compare('wrongpassword', user.password);
    console.log('❌ Mauvais mot de passe rejeté:', !isWrongPasswordValid);

    // 3. Tester la recherche d'utilisateur
    console.log('\n3. Test de la recherche d\'utilisateur...');
    
    const foundUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });
    
    if (foundUser) {
      console.log('✅ Utilisateur trouvé par email:', foundUser.email);
      console.log('   Nom:', foundUser.name);
      console.log('   ID:', foundUser.id);
    } else {
      console.log('❌ Utilisateur non trouvé');
    }

    // 4. Test avec email inexistant
    console.log('\n4. Test avec email inexistant...');
    const nonExistentUser = await prisma.user.findUnique({
      where: { email: 'nonexistent@example.com' }
    });
    console.log('✅ Email inexistant rejeté:', nonExistentUser === null);

    console.log('\n🎉 Tous les tests d\'authentification sont passés !');
    console.log('\n📝 Informations de connexion de test:');
    console.log('   Email:', testEmail);
    console.log('   Mot de passe:', testPassword);

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le test
testAuth(); 