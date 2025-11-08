'use client';
import React from 'react';
import Link from 'next/link';
import CursoForm from '@/components/admin/CursoFormStyled';

export default function NuevoCursoPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Crear nuevo curso</h1>

        {/* Volver a lista: Link sin <a> anidado */}
        <Link href="/admin/cursos" className="text-sm text-slate-600 hover:underline">
          Volver a lista
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <CursoForm />
      </div>
    </div>
  );
}