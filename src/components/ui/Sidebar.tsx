'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'Cursos', href: '/admin/cursos' },
  { label: 'Usuarios', href: '/admin/usuarios' },
  { label: 'Etiquetas', href: '/admin/etiquetas' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-72 hidden md:block border-r bg-white">
      <div className="h-full flex flex-col">
        <div className="p-6">
          <div className="text-xl font-bold text-primary">CEFIB</div>
          <div className="text-sm text-slate-500 mt-1">Administrador</div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {nav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${active ? 'bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)] text-white' : 'text-slate-700 hover:bg-slate-50'}`}>
                <span className="w-2 h-2 rounded-full bg-primary/70" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button className="w-full btn-ghost">Cerrar sesión</button>
        </div>
      </div>
    </aside>
  );
}