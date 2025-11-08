'use client';
import React, { useState } from 'react';

type FormState = {
  titulo: string;
  descripcionBreve: string;
  descripcion: string;
  imagenFile: File | null;
  imagenUrl: string;
  fechaInicio: string;
  duracionHoras: number;
  modalidad: 'PRESENCIAL' | 'VIRTUAL' | 'HIBRIDO';
  certificado: boolean;
  precio?: number | '';
  cupoMaximo?: number | '';
  creadorId: string;
};

export default function CursoForm() {
  const [form, setForm] = useState<FormState>({
    titulo: '',
    descripcionBreve: '',
    descripcion: '',
    imagenFile: null,
    imagenUrl: '',
    fechaInicio: '',
    duracionHoras: 0,
    modalidad: 'VIRTUAL',
    certificado: true,
    precio: '',
    cupoMaximo: '',
    creadorId: '',
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setForm((s) => ({ ...s, imagenFile: f }));
  };

  const uploadImage = async () => {
    if (!form.imagenFile) {
      setMessage('Selecciona una imagen primero.');
      return null;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', form.imagenFile);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || 'Error al subir imagen');
      }
      const json = await res.json();
      // json.url es ruta relativa (/uploads/...)
      setForm((s) => ({ ...s, imagenUrl: json.url }));
      setMessage('Imagen subida correctamente.');
      return json.url;
    } catch (err: any) {
      setMessage('Error upload: ' + (err.message || err));
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // require creatorId for now (copiar desde Prisma Studio)
    if (!form.creadorId) {
      setMessage('Ingresa creadorId (copia desde Prisma Studio).');
      return;
    }
    // if file selected but not uploaded, upload first
    if (form.imagenFile && !form.imagenUrl) {
      const url = await uploadImage();
      if (!url) return;
    }

    setSubmitting(true);
    try {
      const payload: any = {
        titulo: form.titulo,
        descripcionBreve: form.descripcionBreve || null,
        descripcion: form.descripcion || null,
        imagenUrl: form.imagenUrl,
        fechaInicio: form.fechaInicio || null,
        duracionHoras: Number(form.duracionHoras) || 0,
        modalidad: form.modalidad,
        certificado: Boolean(form.certificado),
        precio: form.precio === '' ? null : Number(form.precio),
        cupoMaximo: form.cupoMaximo === '' ? null : Number(form.cupoMaximo),
        creadorId: form.creadorId,
      };

      const res = await fetch('/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        setMessage('Error al crear curso: ' + (json?.error || res.statusText));
        return;
      }
      setMessage('Curso creado correctamente.');
      // Opcional: limpiar formulario
      setForm({
        titulo: '',
        descripcionBreve: '',
        descripcion: '',
        imagenFile: null,
        imagenUrl: '',
        fechaInicio: '',
        duracionHoras: 0,
        modalidad: 'VIRTUAL',
        certificado: true,
        precio: '',
        cupoMaximo: '',
        creadorId: form.creadorId, // keep creator id
      });
    } catch (err: any) {
      setMessage('Error: ' + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <label>
        Título
        <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
      </label>

      <label>
        Descripción breve
        <input value={form.descripcionBreve} onChange={(e) => setForm({ ...form, descripcionBreve: e.target.value })} />
      </label>

      <label>
        Descripción (HTML permitido)
        <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
      </label>

      <label>
        Imagen (archivo)
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={uploadImage} disabled={uploading || !form.imagenFile}>
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </button>
        <span style={{ alignSelf: 'center' }}>{form.imagenUrl ? <em>URL: {form.imagenUrl}</em> : null}</span>
      </div>

      <label>
        Fecha inicio
        <input type="date" value={form.fechaInicio} onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })} />
      </label>

      <label>
        Duración horas
        <input type="number" value={form.duracionHoras} onChange={(e) => setForm({ ...form, duracionHoras: Number(e.target.value) })} />
      </label>

      <label>
        Modalidad
        <select value={form.modalidad} onChange={(e) => setForm({ ...form, modalidad: e.target.value as any })}>
          <option value="VIRTUAL">VIRTUAL</option>
          <option value="PRESENCIAL">PRESENCIAL</option>
          <option value="HIBRIDO">HIBRIDO</option>
        </select>
      </label>

      <label>
        Certificado
        <input type="checkbox" checked={form.certificado} onChange={(e) => setForm({ ...form, certificado: e.target.checked })} />
      </label>

      <label>
        Precio
        <input type="number" value={String(form.precio ?? '')} onChange={(e) => setForm({ ...form, precio: e.target.value === '' ? '' : Number(e.target.value) })} />
      </label>

      <label>
        Cupo máximo
        <input type="number" value={String(form.cupoMaximo ?? '')} onChange={(e) => setForm({ ...form, cupoMaximo: e.target.value === '' ? '' : Number(e.target.value) })} />
      </label>

      <label>
        creadorId (copiar desde Prisma Studio)
        <input value={form.creadorId} onChange={(e) => setForm({ ...form, creadorId: e.target.value })} required />
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={submitting}>{submitting ? 'Guardando...' : 'Crear curso'}</button>
      </div>

      {message && <p>{message}</p>}
    </form>
  );
}