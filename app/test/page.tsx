export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0f9ff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#1e40af',
          marginBottom: '1rem'
        }}>
          Test de Déploiement
        </h1>
        <p style={{ 
          fontSize: '1.1rem',
          color: '#475569',
          marginBottom: '2rem'
        }}>
          CoachIA - Version Simplifiée
        </p>
        <div style={{ 
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '2px solid #3b82f6'
        }}>
          <p style={{ 
            color: '#059669',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            marginBottom: '1rem'
          }}>
            🎉 Déploiement Réussi !
          </p>
          <p style={{ 
            color: '#6b7280',
            fontSize: '1rem'
          }}>
            L'application fonctionne parfaitement sur Render.
          </p>
        </div>
      </div>
    </div>
  )
} 