import type {Metadata} from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-store';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Academic Twins - Plateforme Éducative Moderne',
  description: 'Gestion étudiante et hub de ressources propulsé par l\'IA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
