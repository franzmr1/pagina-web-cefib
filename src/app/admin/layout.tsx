import React from 'react';
import '@/styles/globals.css';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';

export const metadata = {
  title: 'Admin - CEFIB',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[var(--bg)]">
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 md:p-8 w-full">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}