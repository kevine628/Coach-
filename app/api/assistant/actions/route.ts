import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from "../../../../lib/auth"
import { prisma } from "../../../../lib/prisma"

interface ActionResponse {
  content: string
  suggestions: string[]
  data?: any
}

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

    const { action, userProfile } = await request.json()

    if (!action) {
      return NextResponse.json({ error: 'Action requise' }, { status: 400 })
    }

    // Récupérer les données de l'utilisateur
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
          take: 10
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 })
    }

    // Traiter l'action demandée
    const response = await handleAction(action, user)

    return NextResponse.json({
      response: response.content,
      suggestions: response.suggestions,
      ...(response.data && { data: response.data })
    })

  } catch (error) {
    console.error('Erreur dans l\'API actions:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

async function handleAction(action: string, user: any): Promise<ActionResponse> {
  switch (action) {
    case 'analyze_progress':
      return analyzeProgress(user)
    
    case 'create_goal':
      return createGoalGuide(user)
    
    case 'wellness_tips':
      return wellnessTips(user)
    
    case 'productivity_hacks':
      return productivityHacks(user)
    
    default:
      return {
        content: "Action non reconnue. Je peux vous aider avec : analyse de progression, création d'objectifs, conseils bien-être, ou astuces productivité.",
        suggestions: [
          "Analyser ma progression",
          "Créer un nouvel objectif",
          "Conseils bien-être",
          "Astuces productivité"
        ]
      }
  }
}

function analyzeProgress(user: any) {
  const goals = user.goals
  const totalGoals = goals.length
  const completedGoals = goals.filter((goal: any) => goal.status === 'COMPLETED').length
  const activeGoals = goals.filter((goal: any) => goal.status === 'IN_PROGRESS').length
  const overdueGoals = goals.filter((goal: any) => {
    if (goal.deadline && goal.status !== 'COMPLETED') {
      return new Date(goal.deadline) < new Date()
    }
    return false
  }).length

  const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  // Analyser les tendances
  const recentGoals = goals.filter((goal: any) => {
    const goalDate = new Date(goal.createdAt)
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    return goalDate >= monthAgo
  })

  const analysis = `
📊 **RAPPORT DE PROGRESSION DÉTAILLÉ**

🎯 **Vue d'ensemble :**
• Objectifs totaux : ${totalGoals}
• Complétés : ${completedGoals} (${progressPercentage}%)
• En cours : ${activeGoals}
• En retard : ${overdueGoals}

${getDetailedAnalysis(goals, recentGoals)}

💡 **Recommandations :**
${getRecommendations(goals, progressPercentage)}
  `.trim()

  return {
    content: analysis,
    suggestions: [
      "Créer un nouvel objectif",
      "Voir le détail de mes objectifs",
      "Demander des conseils spécifiques",
      "Analyser mes tendances d'humeur"
    ],
    data: {
      totalGoals,
      completedGoals,
      activeGoals,
      overdueGoals,
      progressPercentage
    }
  }
}

function createGoalGuide(user: any) {
  const existingGoals = user.goals.length
  const categories = ['Fitness', 'Carrière', 'Apprentissage', 'Relations', 'Bien-être', 'Finances']

  const guide = `
🎯 **GUIDE DE CRÉATION D'OBJECTIFS SMART**

📋 **Méthode SMART :**
**S**pécifique : Définissez clairement ce que vous voulez accomplir
**M**esurable : Comment saurez-vous que vous avez réussi ?
**A**tteignable : Est-ce réaliste avec vos ressources ?
**R**éaliste : Correspond-il à vos priorités ?
**T**emporel : Quel est votre délai ?

📊 **Votre situation actuelle :**
• Objectifs existants : ${existingGoals}
• Catégories populaires : ${categories.join(', ')}

💡 **Exemples d'objectifs SMART :**
• "Perdre 5kg en 3 mois en faisant 30min d'exercice 3x/semaine"
• "Lire 12 livres cette année (1 par mois)"
• "Apprendre l'espagnol : niveau B1 en 6 mois"

🚀 **Prêt à créer votre objectif ?**
  `.trim()

  return {
    content: guide,
    suggestions: [
      "Je veux perdre du poids",
      "Je veux apprendre une nouvelle compétence",
      "Je veux améliorer ma productivité",
      "Je veux mieux gérer mon stress"
    ]
  }
}

function wellnessTips(user: any) {
  // Analyser les entrées de journal pour personnaliser les conseils
  const recentEntries = user.journalEntries.slice(0, 5)
  const stressLevel = analyzeStressLevel(recentEntries)
  
  const tips = `
🧘‍♀️ **CONSEILS BIEN-ÊTRE PERSONNALISÉS**

${stressLevel > 0.6 ? '⚠️ **Niveau de stress élevé détecté** - Voici des conseils prioritaires :' : '💚 **Votre bien-être semble équilibré** - Continuez sur cette lancée :'}

🌅 **Routine matinale (15 min) :**
• 5 min : Étirements doux
• 5 min : Méditation ou respiration profonde
• 5 min : Planification de la journée

💧 **Hydratation optimale :**
• Buvez 2L d'eau par jour
• Commencez par un verre d'eau au réveil
• Évitez la caféine après 14h

😴 **Sommeil de qualité :**
• Couchez-vous à heure fixe
• Évitez les écrans 1h avant le coucher
• Créez une routine relaxante

🌿 **Activités anti-stress :**
• Marche en nature (30 min/jour)
• Journaling (10 min/jour)
• Activité créative (dessin, musique)

🍎 **Nutrition équilibrée :**
• 3 repas + 2 collations
• Privilégiez les aliments non transformés
• Mangez en pleine conscience

${stressLevel > 0.6 ? '\n🚨 **Conseils urgents pour réduire le stress :**\n• Pratiquez la respiration 4-7-8\n• Prenez des micro-pauses toutes les heures\n• Limitez les notifications' : ''}
  `.trim()

  return {
    content: tips,
    suggestions: [
      "Comment méditer efficacement ?",
      "Routine matinale détaillée",
      "Gestion du stress au travail",
      "Améliorer mon sommeil"
    ],
    data: { stressLevel }
  }
}

function productivityHacks(user: any) {
  const activeGoals = user.goals.filter((goal: any) => goal.status === 'IN_PROGRESS').length
  
  const hacks = `
⚡ **ASTUCES PRODUCTIVITÉ AVANCÉES**

📈 **Basé sur vos ${activeGoals} objectifs actifs, voici mes recommandations :**

⏰ **Technique Pomodoro :**
• 25 min de travail concentré
• 5 min de pause courte
• 15 min de pause après 4 cycles
• Utilisez un minuteur visuel

📝 **Matrice d'Eisenhower :**
**Urgent + Important** : Faites maintenant
**Important + Pas urgent** : Planifiez
**Urgent + Pas important** : Déléguez
**Pas urgent + Pas important** : Éliminez

🎯 **Focus et concentration :**
• Mode avion pendant le travail
• Espace de travail minimaliste
• Une seule tâche à la fois
• Éliminez les distractions visuelles

📊 **Suivi et optimisation :**
• Time-tracking de vos activités
• Revue hebdomadaire de productivité
• Ajustez vos méthodes régulièrement
• Célébrez les petites victoires

🔄 **Routines efficaces :**
• Planification du soir pour le lendemain
• Batch processing des tâches similaires
• Règle des 2 minutes (si ça prend <2min, faites-le maintenant)
• Système de capture des idées

💡 **Outils recommandés :**
• Minuteur Pomodoro
• Liste de tâches digitale
• Bloc-notes pour les idées
• Calendrier pour la planification
  `.trim()

  return {
    content: hacks,
    suggestions: [
      "Comment utiliser la technique Pomodoro ?",
      "Créer ma matrice de priorités",
      "Organiser mon espace de travail",
      "Gérer mes emails efficacement"
    ]
  }
}

function getDetailedAnalysis(goals: any[], recentGoals: any[]) {
  if (goals.length === 0) {
    return "🎯 **Aucun objectif défini** - C'est le moment de commencer votre voyage !"
  }

  const categories = goals.reduce((acc: any, goal: any) => {
    const category = goal.category || 'Général'
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  const topCategory = Object.keys(categories).reduce((a, b) => 
    categories[a] > categories[b] ? a : b, Object.keys(categories)[0]
  )

  return `
📈 **Analyse détaillée :**
• Catégorie favorite : ${topCategory} (${categories[topCategory]} objectifs)
• Objectifs récents (1 mois) : ${recentGoals.length}
• Taux de complétion : ${Math.round((goals.filter(g => g.status === 'COMPLETED').length / goals.length) * 100)}%

${recentGoals.length > 0 ? '🆕 **Objectifs récents :**\n' + recentGoals.map((goal: any) => `• ${goal.title} - ${goal.status}`).join('\n') : ''}
  `.trim()
}

function getRecommendations(goals: any[], progressPercentage: number) {
  if (goals.length === 0) {
    return "🚀 Commencez par définir votre premier objectif SMART !"
  }

  if (progressPercentage >= 80) {
    return "🎉 Excellent travail ! Continuez sur cette lancée et envisagez de nouveaux défis."
  } else if (progressPercentage >= 50) {
    return "👍 Bonne progression ! Concentrez-vous sur la finalisation de vos objectifs en cours."
  } else if (progressPercentage >= 25) {
    return "💪 Vous êtes sur la bonne voie ! Identifiez les obstacles et ajustez vos stratégies."
  } else {
    return "🔍 Analysez les raisons du retard et divisez vos objectifs en étapes plus petites."
  }
}

function analyzeStressLevel(entries: any[]) {
  if (entries.length === 0) return 0.5

  const stressKeywords = ['stress', 'fatigué', 'épuisé', 'anxieux', 'inquiet', 'pressé']
  const positiveKeywords = ['heureux', 'calme', 'motivé', 'reconnaissant', 'excitant']

  let stressCount = 0
  let positiveCount = 0

  entries.forEach((entry: any) => {
    const content = (entry.content + ' ' + (entry.title || '')).toLowerCase()
    
    stressKeywords.forEach(keyword => {
      if (content.includes(keyword)) stressCount++
    })
    
    positiveKeywords.forEach(keyword => {
      if (content.includes(keyword)) positiveCount++
    })
  })

  const total = entries.length
  return stressCount / (total + positiveCount)
} 