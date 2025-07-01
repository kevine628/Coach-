export default function TestSimplePage() {
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
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Test Simple - CoachIA
        </h1>
        <p style={{ 
          color: '#6b7280',
          marginBottom: '2rem'
        }}>
          Page de test ultra-simple
        </p>
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ 
            color: '#059669',
            fontWeight: 'bold'
          }}>
            ✅ Si tu vois cette page, le déploiement fonctionne !
          </p>
        </div>
      </div>
    </div>
  )
} 