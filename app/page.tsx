export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          CoachIA
        </h1>
        <p style={{ 
          fontSize: '1.2rem',
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Votre Coach IA Personnel
        </p>
        <div style={{ 
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ 
            color: '#059669',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            ✅ Application déployée avec succès !
          </p>
          <p style={{ 
            color: '#6b7280',
            marginTop: '1rem'
          }}>
            Le déploiement sur Render fonctionne parfaitement.
          </p>
        </div>
      </div>
    </div>
  )
}
