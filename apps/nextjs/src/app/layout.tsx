import './global.css';

export const metadata = {
  title: 'experiment-nx | Nx Monorepo',
  description:
    'Full-stack Nx monorepo with Next.js, FastAPI, and shared React components.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
