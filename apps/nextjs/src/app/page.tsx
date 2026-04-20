import { HelloButton } from '@experiment-nx/components';

export default function HomePage() {
  return (
    <main style={styles.main}>
      <div style={styles.hero}>
        <div style={styles.badge}>experiment-nx</div>
        <h1 style={styles.title}>
          <span style={styles.gradient}>Nx Monorepo</span>
          <br />
          Next.js + FastAPI
        </h1>
        <p style={styles.subtitle}>
          Full-stack monorepo with shared components, type-safe API proxy, and
          Docker production builds.
        </p>
      </div>

      <div style={styles.card}>
        <HelloButton />
      </div>

      <div style={styles.techStack}>
        <div style={styles.tech}>⚡ Next.js 16</div>
        <div style={styles.tech}>🐍 FastAPI</div>
        <div style={styles.tech}>📦 Nx Monorepo</div>
        <div style={styles.tech}>🐳 Docker</div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23, #1a1a3e, #0f0f23)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    padding: '2rem',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    color: '#e0e7ff',
  },
  hero: {
    textAlign: 'center' as const,
    maxWidth: '600px',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(99, 102, 241, 0.15)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '9999px',
    padding: '6px 16px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#a5b4fc',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: 1.1,
    margin: '0 0 1rem 0',
    letterSpacing: '-0.02em',
  },
  gradient: {
    background: 'linear-gradient(135deg, #6366f1, #a78bfa, #c084fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#94a3b8',
    lineHeight: 1.6,
    margin: 0,
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '1rem',
    backdropFilter: 'blur(20px)',
    minWidth: '360px',
  },
  techStack: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  tech: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '10px 18px',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#94a3b8',
  },
};
