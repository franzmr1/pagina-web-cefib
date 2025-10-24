// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CEFIB - Centro de Formación Profesional | Train Win Leaders',
  description: 'Centro de Formación y Especialización Profesional Iberoamericano. Diplomados, Especializaciones y Cursos de alta calidad.',
  keywords: 'formación profesional, diplomados, especializaciones, capacitación, CEFIB, cursos',
  authors: [{ name: 'CEFIB' }],
  openGraph: {
    title: 'CEFIB - Train Win Leaders',
    description: 'Centro de Formación Profesional de Excelencia',
    url: 'https://cefib.pe',
    siteName: 'CEFIB',
    locale: 'es_PE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'tu-codigo-de-verificacion', // Añadir después
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}