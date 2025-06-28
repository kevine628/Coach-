import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { message, conversationHistory = [] } = await request.json()
    const userId = payload.userId

    // Récupérer le contexte de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true }
    })

    const userGoals = await prisma.goal.findMany({
      where: { userId, status: 'active' },
      select: { title: true, description: true, priority: true }
    })

    const recentTasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { title: true, completed: true, priority: true }
    })

    // Créer le contexte pour l'IA
    const context = `
Utilisateur: ${user?.name || 'Utilisateur'}
Objectifs actifs: ${userGoals.map((g: any) => `${g.title} (${g.priority})`).join(', ') || 'Aucun objectif'}
Tâches récentes: ${recentTasks.map((t: any) => `${t.title} - ${t.completed ? 'complétée' : 'en cours'}`).join(', ')}
    `.trim()

    // Générer une réponse intelligente basée sur le contexte
    const aiResponse = generateIntelligentResponse(message, context, userGoals, recentTasks)

    // Sauvegarder la conversation dans la base de données (optionnel)
    await prisma.journalEntry.create({
      data: {
        title: 'Conversation IA',
        content: `User: ${message}\nAI: ${aiResponse}`,
        userId
      }
    })

    return NextResponse.json({
      response: aiResponse,
      suggestions: generateSuggestions(message, userGoals)
    })

  } catch (error) {
    console.error('Erreur lors du traitement du message:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

function generateIntelligentResponse(
  userMessage: string, 
  context: string, 
  goals: any[], 
  tasks: any[]
): string {
  const message = userMessage.toLowerCase()
  
  // Réponses basées sur les mots-clés et le contexte
  if (message.includes('objectif') || message.includes('but') || message.includes('goal')) {
    if (goals.length === 0) {
      return "Je vois que vous n'avez pas encore d'objectifs définis. C'est le moment parfait pour en créer un ! Voulez-vous que je vous aide à définir votre premier objectif ? Je peux vous guider avec la méthode SMART (Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini)."
    }
    return `Excellente question ! Vous avez actuellement ${goals.length} objectif(s) actif(s) : ${goals.map(g => g.title).join(', ')}. Comment puis-je vous aider à progresser vers ces objectifs ? Voulez-vous que je vous aide à créer un plan d'action ou à ajuster vos priorités ?`
  }

  if (message.includes('tâche') || message.includes('task') || message.includes('todo')) {
    const completedTasks = tasks.filter(t => t.completed).length
    const totalTasks = tasks.length
    return `Voici un aperçu de vos tâches récentes : ${completedTasks}/${totalTasks} complétées. ${completedTasks > totalTasks / 2 ? 'Excellent travail !' : 'Continuez comme ça !'} Voulez-vous que je vous aide à organiser vos priorités ou à créer de nouvelles tâches ?`
  }

  if (message.includes('productivité') || message.includes('efficacité')) {
    return "Pour améliorer votre productivité, je recommande de commencer par identifier vos moments les plus productifs de la journée. En France, beaucoup de personnes sont plus efficaces le matin. Essayez de planifier vos tâches importantes entre 9h et 11h. Voulez-vous que je vous aide à créer un planning personnalisé ?"
  }

  if (message.includes('bien-être') || message.includes('santé') || message.includes('équilibre')) {
    return "L'équilibre vie-travail est essentiel ! En France, il est important de respecter les pauses déjeuner et de prendre du temps pour soi. Je vous suggère de planifier des moments de détente dans votre journée. Voulez-vous que je vous aide à intégrer des activités de bien-être dans votre routine ?"
  }

  if (message.includes('motivation') || message.includes('démotivé')) {
    return "La motivation fluctue naturellement. Quand vous vous sentez moins motivé, rappelez-vous pourquoi vous avez commencé. Regardez vos objectifs et célébrez vos petites victoires. Voulez-vous que je vous aide à redéfinir vos objectifs ou à créer un système de récompenses ?"
  }

  if (message.includes('plan') || message.includes('planifier')) {
    return "La planification est la clé du succès ! Je vous recommande de commencer par planifier votre semaine le dimanche soir. Identifiez vos 3 priorités principales et répartissez-les sur la semaine. Voulez-vous que je vous aide à créer un planning hebdomadaire personnalisé ?"
  }

  if (message.includes('stress') || message.includes('anxiété')) {
    return "Le stress est normal, mais il faut savoir le gérer. Je vous recommande la technique de respiration 4-7-8 : inspirez 4 secondes, retenez 7 secondes, expirez 8 secondes. Aussi, prenez des pauses régulières et pratiquez la gratitude. Voulez-vous que je vous guide dans une séance de relaxation ?"
  }

  // Réponse par défaut
  return "Merci pour votre message ! Je suis là pour vous accompagner dans votre développement personnel. Je peux vous aider avec vos objectifs, votre productivité, votre bien-être ou tout autre aspect de votre vie. Que souhaitez-vous explorer aujourd'hui ?"
}

function generateSuggestions(userMessage: string, goals: any[]): string[] {
  const message = userMessage.toLowerCase()
  
  if (message.includes('objectif') || goals.length === 0) {
    return ["Créer un nouvel objectif", "Voir mes objectifs actuels", "Planifier ma semaine"]
  }
  
  if (message.includes('tâche') || message.includes('productivité')) {
    return ["Créer une nouvelle tâche", "Organiser mes priorités", "Voir mes progrès"]
  }
  
  if (message.includes('bien-être') || message.includes('stress')) {
    return ["Séance de relaxation", "Conseils bien-être", "Planifier une pause"]
  }
  
  return ["Créer un objectif", "Planifier ma journée", "Conseils personnalisés"]
}
