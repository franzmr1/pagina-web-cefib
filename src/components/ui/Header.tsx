'use client';
import React from 'react';
import Button from './Button';

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-primary">CEFIB</div>
            <div className="hidden md:block text-sm text-slate-500">Panel administrativo</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-slate-50 border border-gray-100 px-3 py-1 rounded-lg text-sm text-slate-600">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Buscar...
            </div>
            <Button className="hidden sm:inline-flex" variant="primary">Nuevo</Button>
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <img src="/images/avatar-placeholder.png" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}