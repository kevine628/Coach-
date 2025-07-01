import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from "../../../../lib/auth"
import { prisma } from "../../../../lib/prisma"

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Token manquant' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const { message, userProfile } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 })
    }

    // Récupérer les données de l'utilisateur pour personnaliser les réponses
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        goals: {
          include: {
            tasks: true
          }
        },
        journalEntries: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Analyser le message et générer une réponse intelligente
    const response = await generateAIResponse(message, user)

    return NextResponse.json({
      response: response.content,
      suggestions: response.suggestions
    })

  } catch (error) {
    console.error('Erreur dans l\'API chat:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

async function generateAIResponse(message: string, user: any) {
  const lowerMessage = message.toLowerCase()
  
  // Analyse des objectifs et progression
  if (lowerMessage.includes('progression') || lowerMessage.includes('avancement') || lowerMessage.includes('statut')) {
    const completedGoals = user.goals.filter((goal: any) => goal.status === 'COMPLETED').length
    const totalGoals = user.goals.length
    const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0
    
    return {
      content: `Voici votre progression actuelle :\n\n📊 **Objectifs complétés** : ${completedGoals}/${totalGoals} (${progressPercentage}%)\n\n${getProgressAnalysis(user.goals)}`,
      suggestions: [
        "Créer un nouvel objectif",
        "Voir le détail de mes objectifs",
        "Demander des conseils pour avancer"
      ]
    }
  }

  // Création d'objectifs
  if (lowerMessage.includes('créer') && (lowerMessage.includes('objectif') || lowerMessage.includes('but'))) {
    return {
      content: `Parfait ! Pour créer un objectif efficace, suivez la méthode SMART :\n\n🎯 **S**pécifique : Définissez clairement ce que vous voulez accomplir\n📏 **M**esurable : Comment saurez-vous que vous avez réussi ?\n✅ **A**tteignable : Est-ce réaliste avec vos ressources ?\n🎯 **R**éaliste : Correspond-il à vos priorités ?\n⏰ **T**emporel : Quel est votre délai ?\n\nPouvez-vous me décrire votre objectif ?`,
      suggestions: [
        "Je veux perdre du poids",
        "Je veux apprendre une nouvelle compétence",
        "Je veux améliorer ma productivité",
        "Je veux mieux gérer mon stress"
      ]
    }
  }

  // Conseils bien-être
  if (lowerMessage.includes('bien-être') || lowerMessage.includes('stress') || lowerMessage.includes('santé')) {
    const wellnessTips = [
      "🧘‍♀️ **Méditation quotidienne** : 10 minutes par jour pour réduire le stress",
      "💧 **Hydratation** : Buvez au moins 2L d'eau par jour",
      "🌿 **Marche en nature** : 30 minutes par jour pour l'équilibre mental",
      "😴 **Sommeil de qualité** : 7-9h par nuit avec une routine relaxante",
      "🍎 **Alimentation équilibrée** : Privilégiez les aliments non transformés"
    ]
    
    return {
      content: `Voici mes conseils pour votre bien-être :\n\n${wellnessTips.join('\n\n')}\n\nQuel aspect souhaitez-vous approfondir ?`,
      suggestions: [
        "Comment méditer efficacement ?",
        "Routine matinale pour bien commencer",
        "Gestion du stress au travail",
        "Améliorer mon sommeil"
      ]
    }
  }

  // Productivité
  if (lowerMessage.includes('productivité') || lowerMessage.includes('efficacité') || lowerMessage.includes('organisation')) {
    const productivityTips = [
      "⏰ **Technique Pomodoro** : 25min de travail + 5min de pause",
      "📝 **Liste de tâches** : Priorisez avec la matrice d'Eisenhower",
      "🚫 **Éliminez les distractions** : Désactivez les notifications",
      "🎯 **Objectif unique** : Concentrez-vous sur une tâche à la fois",
      "📊 **Suivi du temps** : Analysez où va votre temps"
    ]
    
    return {
      content: `Voici mes astuces pour améliorer votre productivité :\n\n${productivityTips.join('\n\n')}\n\nQuelle technique voulez-vous explorer ?`,
      suggestions: [
        "Comment utiliser la technique Pomodoro ?",
        "Créer ma matrice de priorités",
        "Organiser mon espace de travail",
        "Gérer mes emails efficacement"
      ]
    }
  }

  // Analyse des entrées de journal
  if (lowerMessage.includes('journal') || lowerMessage.includes('humeur') || lowerMessage.includes('réflexion')) {
    const recentEntries = user.journalEntries.slice(0, 3)
    const moodAnalysis = analyzeMoodTrend(recentEntries)
    
    return {
      content: `Voici l'analyse de vos dernières entrées de journal :\n\n${moodAnalysis}\n\n${recentEntries.length > 0 ? '**Dernières réflexions :**\n' + recentEntries.map((entry: any) => `• ${entry.title || 'Sans titre'} - ${new Date(entry.createdAt).toLocaleDateString('fr-FR')}`).join('\n') : 'Aucune entrée récente'}`,
      suggestions: [
        "Écrire une nouvelle entrée",
        "Analyser mes tendances d'humeur",
        "Conseils pour améliorer mon bien-être",
        "Voir toutes mes entrées"
      ]
    }
  }

  // Réponse par défaut
  return {
    content: `Merci pour votre message ! Je suis là pour vous accompagner dans votre développement personnel. Je peux vous aider avec :\n\n🎯 **Objectifs** : Créer, suivre et analyser vos objectifs\n📊 **Progression** : Évaluer votre avancement\n🧘‍♀️ **Bien-être** : Conseils pour votre équilibre\n⚡ **Productivité** : Techniques d'amélioration\n📝 **Journal** : Analyser vos réflexions\n\nQue souhaitez-vous explorer ?`,
    suggestions: [
      "Analyser ma progression",
      "Créer un nouvel objectif",
      "Conseils bien-être",
      "Astuces productivité"
    ]
  }
}

function getProgressAnalysis(goals: any[]) {
  if (goals.length === 0) {
    return "Vous n'avez pas encore d'objectifs. C'est le moment de commencer ! 🚀"
  }

  const activeGoals = goals.filter((goal: any) => goal.status === 'IN_PROGRESS')
  const completedGoals = goals.filter((goal: any) => goal.status === 'COMPLETED')
  const overdueGoals = goals.filter((goal: any) => {
    if (goal.deadline && goal.status !== 'COMPLETED') {
      return new Date(goal.deadline) < new Date()
    }
    return false
  })

  let analysis = ""
  
  if (completedGoals.length > 0) {
    analysis += `🎉 **Félicitations !** Vous avez complété ${completedGoals.length} objectif(s).\n\n`
  }
  
  if (activeGoals.length > 0) {
    analysis += `🔄 **En cours** : ${activeGoals.length} objectif(s) actif(s).\n\n`
  }
  
  if (overdueGoals.length > 0) {
    analysis += `⚠️ **Attention** : ${overdueGoals.length} objectif(s) en retard.\n\n`
  }

  return analysis || "Continuez sur cette lancée ! 💪"
}

function analyzeMoodTrend(entries: any[]) {
  if (entries.length === 0) {
    return "Aucune entrée récente pour analyser votre humeur."
  }

  const moodCounts: { [key: string]: number } = {}
  entries.forEach((entry: any) => {
    if (entry.mood) {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1
    }
  })

  const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
    moodCounts[a] > moodCounts[b] ? a : b, Object.keys(moodCounts)[0]
  )

  const moodEmojis: { [key: string]: string } = {
    'happy': '😊',
    'sad': '😢',
    'excited': '🤩',
    'calm': '😌',
    'stressed': '😰',
    'grateful': '🙏',
    'motivated': '💪',
    'tired': '😴'
  }

  return `📈 **Tendance d'humeur** : ${moodEmojis[dominantMood] || '😐'} ${dominantMood || 'Neutre'}\n\nBasé sur vos ${entries.length} dernières entrées.`
} 