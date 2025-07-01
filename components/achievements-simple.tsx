import React from "react"

export const AchievementsComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos Achievements</h2>
        <p className="text-gray-600">Débloquez des badges en progressant dans vos objectifs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Premier objectif</h3>
          <p className="text-sm text-gray-600">Créez votre premier objectif</p>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Débloqué
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Première entrée</h3>
          <p className="text-sm text-gray-600">Écrivez votre première entrée de journal</p>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              À débloquer
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Série de 3 jours</h3>
          <p className="text-sm text-gray-600">Maintenez une série de 3 jours consécutifs</p>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              À débloquer
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 