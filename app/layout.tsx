import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Aloe & Bienestar | Nutrición · Belleza · Bienestar',
  description: 'Productos para acompañarte hacia tu mejor versión.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><Providers>{children}</Providers></body></html>;
}
