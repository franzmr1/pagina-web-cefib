import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const curso = await prisma.curso.findUnique({ where: { id } });
    if (!curso) return NextResponse.json({ error: 'Curso no encontrado' }, { status: 404 });

    return NextResponse.json(curso);
  } catch (err: any) {
    console.error('GET /api/cursos/[id] error', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const body = await req.json();
    // Permitir sólo los campos esperados
    const {
      titulo,
      descripcionBreve,
      descripcion,
      imagenUrl,
      duracionHoras,
      modalidad,
      fechaInicio,
      certificado,
      precio,
      slug,
    } = body;

    const dataToUpdate: any = {};
    if (titulo !== undefined) dataToUpdate.titulo = titulo;
    if (descripcionBreve !== undefined) dataToUpdate.descripcionBreve = descripcionBreve;
    if (descripcion !== undefined) dataToUpdate.descripcion = descripcion;
    if (imagenUrl !== undefined) dataToUpdate.imagenUrl = imagenUrl;
    if (duracionHoras !== undefined) dataToUpdate.duracionHoras = Number(duracionHoras) || 0;
    if (modalidad !== undefined) dataToUpdate.modalidad = modalidad;
    if (fechaInicio !== undefined) dataToUpdate.fechaInicio = fechaInicio;
    if (certificado !== undefined) dataToUpdate.certificado = certificado;
    if (precio !== undefined) dataToUpdate.precio = precio;
    if (slug !== undefined) dataToUpdate.slug = slug;

    const updated = await prisma.curso.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error('PUT /api/cursos/[id] error', err);
    // si prisma lanza error de not found o validación manejarlo aquí si quieres
    return NextResponse.json({ error: 'Error interno al actualizar' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await prisma.curso.delete({ where: { id } });

    // devolver 204 No Content o 200 con ok
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('DELETE /api/cursos/[id] error', err);
    return NextResponse.json({ error: 'Error interno al eliminar' }, { status: 500 });
  }
}