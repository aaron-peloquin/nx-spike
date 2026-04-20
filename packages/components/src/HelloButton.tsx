'use client';

import { useState } from 'react';

interface HelloResponse {
  time: string;
  message: string;
}

export function HelloButton() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/hello');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: HelloResponse = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          ...styles.button,
          ...(loading ? styles.buttonDisabled : {}),
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
        }}
      >
        {loading ? (
          <span style={styles.spinner}>⏳</span>
        ) : (
          '🚀 Fetch Server Time'
        )}
      </button>

      {error && (
        <div style={styles.error}>
          <span style={styles.errorIcon}>⚠️</span> {error}
        </div>
      )}

      {data && !error && (
        <div style={styles.result}>
          <div style={styles.resultHeader}>
            <span style={styles.resultIcon}>🕐</span>
            <span style={styles.resultLabel}>{data.message}</span>
          </div>
          <div style={styles.time}>{data.time}</div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '2rem',
  },
  button: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 32px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
    letterSpacing: '0.025em',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  spinner: {
    display: 'inline-block',
    animation: 'spin 1s linear infinite',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    padding: '12px 20px',
    color: '#fca5a5',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorIcon: {
    fontSize: '1.1rem',
  },
  result: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '20px 28px',
    textAlign: 'center' as const,
    backdropFilter: 'blur(10px)',
    minWidth: '280px',
  },
  resultHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  resultIcon: {
    fontSize: '1.2rem',
  },
  resultLabel: {
    color: '#a5b4fc',
    fontSize: '0.85rem',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },
  time: {
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#e0e7ff',
    letterSpacing: '0.05em',
  },
};
