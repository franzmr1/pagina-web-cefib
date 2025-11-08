'use client';
import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/ui/CourseCard';
import Link from 'next/link';

type Curso = {
  id: string;
  titulo: string;
  descripcionBreve?: string;
  imagenUrl?: string;
  modalidad?: string;
  duracionHoras?: number;
};

export default function CursosAdminPage() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchCursos() {
      try {
        const res = await fetch('/api/cursos');
        if (!res.ok) throw new Error('Error');
        const data = await res.json();
        if (mounted) setCursos(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCursos();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDeleted = (id: string) => {
    setCursos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Cursos (Admin)</h1>

        <Link href="/admin/cursos/nuevo" className="inline-block px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
          Nuevo Curso
        </Link>
      </div>

      {loading ? (
        <div className="text-slate-500">Cargando cursos...</div>
      ) : cursos.length === 0 ? (
        <div className="text-slate-500">No hay cursos aún.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((c) => (
            <CourseCard key={c.id} curso={c} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}