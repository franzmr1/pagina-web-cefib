'use client';
import React from 'react';
import Link from 'next/link';

type Curso = {
  id: string;
  titulo: string;
  descripcionBreve?: string | null;
  imagenUrl?: string | null;
  modalidad?: string | null;
  duracionHoras?: number | null;
};

export default function CourseCard({
  curso,
  onDeleted,
}: {
  curso: Curso;
  onDeleted?: (id: string) => void;
}) {
  const handleDelete = async () => {
    const ok = confirm(`¿Eliminar el curso "${curso.titulo}"? Esta acción no se puede deshacer.`);
    if (!ok) return;

    try {
      const res = await fetch(`/api/cursos/${curso.id}`, { method: 'DELETE' });
      const js = await res.json();
      if (!res.ok) {
        alert(js?.error || 'Error al eliminar');
        return;
      }
      // informar al padre para actualizar UI
      if (onDeleted) onDeleted(curso.id);
    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  return (
    <article className="card">
      <div className="h-44 bg-gradient-to-tr from-slate-50 to-slate-100 flex items-center">
        {curso.imagenUrl ? (
          <img src={curso.imagenUrl} alt={curso.titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-400">Sin imagen</div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{curso.titulo}</h3>
        {curso.descripcionBreve && <p className="text-sm text-slate-600 mb-3">{curso.descripcionBreve}</p>}

        <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
          <div>Modalidad: <span className="font-medium text-slate-700 ml-1">{curso.modalidad ?? '—'}</span></div>
          <div>Horas: <span className="font-medium text-slate-700 ml-1">{curso.duracionHoras ?? 0}</span></div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/admin/cursos/editar/${curso.id}`} className="inline-block px-3 py-2 rounded-lg text-white bg-gradient-to-r from-[var(--brand-start)] to-[var(--brand-end)]">Editar</Link>

          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-2 rounded-lg border text-red-600 border-red-100"
            aria-label={`Eliminar ${curso.titulo}`}
          >
            Eliminar
          </button>

          <a href={`/api/cursos/${curso.id}`} target="_blank" rel="noreferrer" className="text-slate-600 text-sm">
            Ver JSON
          </a>
        </div>
      </div>
    </article>
  );
}