import { useNavigate } from 'react-router-dom'

export interface ErrorPageProps {
  code: number
  title: string
  message: string
  showBackButton?: boolean
  showHomeButton?: boolean
  onBack?: () => void
}

export function ErrorPage({
  code,
  title,
  message,
  showBackButton = true,
  showHomeButton = true,
  onBack,
}: ErrorPageProps) {
  const navigate = useNavigate()

  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <div style={styles.codeBox}>
          <span style={styles.code}>{code}</span>
        </div>

        <h1 style={styles.title}>{title}</h1>
        <p style={styles.message}>{message}</p>

        <div style={styles.actions}>
          {showBackButton && (
            <button
              style={styles.buttonSecondary}
              onClick={onBack ? onBack : () => navigate(-1)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d0d0d0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
            >
              Go back
            </button>
          )}
          {showHomeButton && (
            <button
              style={styles.buttonPrimary}
              onClick={() => navigate('/')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            >
              Go home
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#fafafa',
  } as React.CSSProperties,
  content: {
    textAlign: 'center' as const,
    maxWidth: '500px',
  } as React.CSSProperties,
  codeBox: {
    marginBottom: '2.5rem',
  } as React.CSSProperties,
  code: {
    fontSize: '6rem',
    fontWeight: '900',
    color: '#1976d2',
    lineHeight: '1',
    letterSpacing: '-0.05em',
  } as React.CSSProperties,
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#222',
    marginBottom: '1rem',
    letterSpacing: '-0.01em',
  } as React.CSSProperties,
  message: {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '2.5rem',
    lineHeight: '1.7',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  buttonPrimary: {
    padding: '0.75rem 2rem',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  buttonSecondary: {
    padding: '0.75rem 2rem',
    backgroundColor: '#e8e8e8',
    color: '#333',
    border: '1px solid #d0d0d0',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  } as React.CSSProperties,
}
