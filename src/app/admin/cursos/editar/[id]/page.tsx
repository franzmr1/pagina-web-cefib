'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Curso = {
  id: string;
  titulo: string;
  descripcionBreve?: string | null;
  descripcion?: string | null;
  imagenUrl?: string | null;
  duracionHoras?: number | null;
  modalidad?: string | null;
  fechaInicio?: string | null;
};

export default function EditarCursoPage() {
  const router = useRouter();
  const params = useParams() as { id?: string };
  const id = params?.id ?? '';
  const [curso, setCurso] = useState<Partial<Curso> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Upload related state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    fetch(`/api/cursos/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (mounted) setCurso(data);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Error cargando curso');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  // handle file selection (preview only, not uploaded yet)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setSelectedFile(f);
    setMessage(null);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreviewSrc(url);
    } else {
      setPreviewSrc(null);
    }
  };

  // Upload to /api/upload and set curso.imagenUrl with returned url
  const uploadImage = async () => {
    setMessage(null);
    if (!selectedFile) {
      setMessage('Selecciona una imagen primero.');
      return;
    }

    // Client-side basic validation
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(selectedFile.type)) {
      setMessage('Tipo de imagen no soportado. Usa PNG, JPG o WEBP.');
      return;
    }

    const maxBytes = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_BYTES || process.env.MAX_UPLOAD_SIZE_BYTES || 5 * 1024 * 1024);
    if (selectedFile.size > maxBytes) {
      setMessage(`La imagen supera el límite de ${(maxBytes / (1024 * 1024)).toFixed(1)} MB.`);
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', selectedFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const json = await res.json();
      if (!res.ok) {
        setMessage(json?.error || 'Error al subir imagen');
        return;
      }

      // Update curso state with new imagenUrl
      setCurso((prev) => ({ ...(prev ?? {}), imagenUrl: json.url }));
      setMessage('Imagen subida correctamente.');
      // revoke preview object URL to avoid memory leak
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
        setPreviewSrc(null);
      }
      // clear selected file
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error(err);
      setMessage('Error al subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteLocalImage = () => {
    // Removes imagenUrl from the curso object (does not delete from disk)
    if (!confirm('¿Quitar la imagen actual del curso? (esto no eliminará el archivo subido en el servidor)')) return;
    setCurso((prev) => ({ ...(prev ?? {}), imagenUrl: '' }));
    setMessage('Imagen eliminada (campo). Guarda para aplicar cambios.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!id) return setMessage('ID inválido');

    setSaving(true);
    try {
      const body = {
        titulo: curso?.titulo,
        descripcionBreve: curso?.descripcionBreve,
        descripcion: curso?.descripcion,
        imagenUrl: curso?.imagenUrl,
        duracionHoras: curso?.duracionHoras,
        modalidad: curso?.modalidad,
        fechaInicio: curso?.fechaInicio,
      };

      const res = await fetch(`/api/cursos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const js = await res.json();
      if (!res.ok) {
        setMessage(js?.error || 'Error al guardar');
        return;
      }

      setMessage('Curso actualizado correctamente');
      router.push('/admin/cursos');
    } catch (err: any) {
      console.error(err);
      setMessage('Error al actualizar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!curso) return <div>Curso no encontrado</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Editar curso</h1>
        <button onClick={() => router.push('/admin/cursos')} className="text-sm text-slate-600 hover:underline">
          Volver a lista
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Título</span>
            <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={curso?.titulo ?? ''} onChange={(e) => setCurso({ ...curso, titulo: e.target.value })} required />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Descripción breve</span>
            <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={curso?.descripcionBreve ?? ''} onChange={(e) => setCurso({ ...curso, descripcionBreve: e.target.value })} />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-medium">Descripción (HTML permitido)</span>
            <textarea rows={6} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={curso?.descripcion ?? ''} onChange={(e) => setCurso({ ...curso, descripcion: e.target.value })} />
          </label>

          {/* IMAGE: current preview + file input + upload */}
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm font-medium">Imagen actual / reemplazar</span>
            </label>

            {curso?.imagenUrl ? (
              <div className="flex items-start gap-4">
                <div className="w-48 h-28 border rounded overflow-hidden">
                  <img src={curso.imagenUrl} alt="imagen actual" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-600 break-words">{curso.imagenUrl}</div>
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={handleDeleteLocalImage} className="px-3 py-1 border rounded-md text-sm">Quitar imagen</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">No hay imagen configurada.</div>
            )}

            <div className="mt-2">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} />
            </div>

            {previewSrc && (
              <div className="mt-2">
                <div className="text-sm font-medium">Vista previa (seleccionada)</div>
                <div className="mt-1 w-48 h-28 border rounded overflow-hidden">
                  <img src={previewSrc} alt="preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="mt-2 flex items-center gap-3">
              <button type="button" onClick={uploadImage} disabled={uploading || !selectedFile} className="px-3 py-2 bg-indigo-600 text-white rounded-md">
                {uploading ? 'Subiendo...' : 'Subir imagen'}
              </button>
              <button type="button" onClick={() => {
                setSelectedFile(null);
                setPreviewSrc(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
                setMessage(null);
              }} className="px-3 py-2 border rounded-md">Limpiar</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Fecha inicio</span>
            <input type="date" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={curso?.fechaInicio ?? ''} onChange={(e) => setCurso({ ...curso, fechaInicio: e.target.value })} />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Duración horas</span>
            <input type="number" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={curso?.duracionHoras ?? 0} onChange={(e) => setCurso({ ...curso, duracionHoras: Number(e.target.value) || 0 })} />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Modalidad</span>
            <select className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={curso?.modalidad ?? 'VIRTUAL'} onChange={(e) => setCurso({ ...curso, modalidad: e.target.value })}>
              <option value="VIRTUAL">VIRTUAL</option>
              <option value="PRESENCIAL">PRESENCIAL</option>
              <option value="HIBRIDO">HIBRIDO</option>
            </select>
          </label>

          <div className="flex gap-3 items-center">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button type="button" onClick={() => router.push('/admin/cursos')} className="px-4 py-2 border rounded-md">Cancelar</button>
          </div>

          {message && <p className="text-sm text-slate-600">{message}</p>}
        </div>
      </form>
    </div>
  );
}