'use client';
import React, { useState, useRef } from 'react';

export default function CursoForm() {
  const [titulo, setTitulo] = useState('');
  const [descripcionBreve, setDescripcionBreve] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenUrl, setImagenUrl] = useState('');
  const [duracionHoras, setDuracionHoras] = useState<number | ''>(0);
  const [modalidad, setModalidad] = useState<'PRESENCIAL' | 'VIRTUAL' | 'HIBRIDO'>('VIRTUAL');
  const [creadorId, setCreadorId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setImagenFile(f);
    setMessage(null);

    if (f) {
      // Preview using an object URL (release when new file chosen)
      const url = URL.createObjectURL(f);
      setPreviewSrc(url);
    } else {
      setPreviewSrc(null);
    }
  };

  const uploadImage = async () => {
    setMessage(null);
    if (!imagenFile) {
      setMessage('Selecciona una imagen primero.');
      return;
    }

    // Client-side basic validation
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(imagenFile.type)) {
      setMessage('Tipo de imagen no soportado. Usa PNG, JPG o WEBP.');
      return;
    }

    const maxBytes = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE_BYTES || process.env.MAX_UPLOAD_SIZE_BYTES || 5 * 1024 * 1024);
    if (imagenFile.size > maxBytes) {
      setMessage(`La imagen supera el límite de ${(maxBytes / (1024 * 1024)).toFixed(1)} MB.`);
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', imagenFile);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });

      const json = await res.json();
      if (!res.ok) {
        setMessage(json?.error || 'Error al subir imagen');
        return;
      }

      setImagenUrl(json.url);
      setMessage('Imagen subida correctamente.');
      // revoke the object URL we created to avoid memory leak
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
        setPreviewSrc(null);
      }
    } catch (err: any) {
      console.error(err);
      setMessage('Error al subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!creadorId) {
      setMessage('Debes indicar el creadorId (desde Prisma Studio).');
      return;
    }
    if (!imagenUrl) {
      setMessage('Sube una imagen primero (botón "Subir imagen").');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        titulo,
        descripcionBreve,
        descripcion,
        imagenUrl,
        duracionHoras: Number(duracionHoras) || 0,
        modalidad,
        creadorId,
      };
      const res = await fetch('/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const js = await res.json();
      if (!res.ok) {
        setMessage(js?.error || 'Error al crear curso');
        return;
      }
      setMessage('Curso creado correctamente');
      // reset fields
      setTitulo('');
      setDescripcionBreve('');
      setDescripcion('');
      setImagenFile(null);
      setImagenUrl('');
      setDuracionHoras(0);
      setPreviewSrc(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setMessage(err.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Título</span>
          <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Descripción breve</span>
          <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={descripcionBreve} onChange={(e) => setDescripcionBreve(e.target.value)} />
        </label>

        <label className="block md:col-span-2">
          <span className="text-sm font-medium">Descripción (HTML permitido)</span>
          <textarea rows={6} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Imagen (archivo)</span>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className="mt-1" />
        </label>

        {previewSrc && (
          <div className="mt-2">
            <span className="text-sm font-medium">Vista previa:</span>
            <div className="mt-1 w-48 h-28 border rounded overflow-hidden">
              <img src={previewSrc} alt="preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {imagenUrl && (
          <div className="mt-2">
            <span className="text-sm font-medium">Imagen subida:</span>
            <div className="mt-1 w-48 h-28 border rounded overflow-hidden">
              <img src={imagenUrl} alt="uploaded" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button type="button" onClick={uploadImage} disabled={uploading || !imagenFile} className="px-3 py-2 bg-indigo-600 text-white rounded-md">
            {uploading ? 'Subiendo...' : 'Subir imagen'}
          </button>
          <button type="button" onClick={() => {
            setImagenFile(null);
            setPreviewSrc(null);
            setImagenUrl('');
            setMessage(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }} className="px-3 py-2 border rounded-md">Limpiar</button>
          {imagenFile && <div className="text-sm text-slate-600">Archivo: {imagenFile.name}</div>}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Fecha inicio</span>
          <input type="date" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Duración horas</span>
          <input type="number" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={duracionHoras ?? ''} onChange={(e) => setDuracionHoras(Number(e.target.value))} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Modalidad</span>
          <select className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={modalidad} onChange={(e) => setModalidad(e.target.value as any)}>
            <option value="VIRTUAL">VIRTUAL</option>
            <option value="PRESENCIAL">PRESENCIAL</option>
            <option value="HIBRIDO">HIBRIDO</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium">creadorId (copiar desde Prisma Studio)</span>
          <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" value={creadorId} onChange={(e) => setCreadorId(e.target.value)} required />
        </label>

        <div className="flex gap-3 items-center">
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            {submitting ? 'Guardando...' : 'Crear curso'}
          </button>
          <button type="button" onClick={() => { /* opcional limpiar */ }} className="px-4 py-2 border rounded-md">Cancelar</button>
        </div>

        {message && <p className="text-sm text-slate-600">{message}</p>}
      </div>
    </form>
  );
}