import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import slugify from 'slugify';
import DOMPurify from 'isomorphic-dompurify';
import { prisma } from '@/lib/prisma';
import { cursoCreateSchema, CursoCreateInput } from '@/lib/validations/curso.schema';

export async function GET() {
  try {
    const cursos = await prisma.curso.findMany({
      where: { estado: 'ACTIVO' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        titulo: true,
        descripcionBreve: true,
        imagenUrl: true,
        fechaInicio: true,
        duracionHoras: true,
        modalidad: true,
        certificado: true,
        precio: true,
        slug: true,
      },
    });
    return NextResponse.json(cursos);
  } catch (err) {
    console.error('GET /api/cursos error:', err);
    return NextResponse.json({ error: 'Error al obtener cursos.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validar con Zod
    const parsed = cursoCreateSchema.safeParse(body);
    if (!parsed.success) {
      // ZodError tiene .issues (no .errors)
      const firstIssue = parsed.error.issues?.[0];
      const message = firstIssue?.message ?? 'Datos inválidos';
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const data: CursoCreateInput = parsed.data;

    // Sanitizar descripción (evitar XSS)
    const sanitizedDescription = data.descripcion ? DOMPurify.sanitize(data.descripcion) : null;

    // Generar slug y asegurar unicidad mínima
    let baseSlug = slugify(data.titulo, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    // findUnique puede lanzar si slug es null; aquí usamos while con findUnique
    while (await prisma.curso.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }

    // Crear curso en DB
    const curso = await prisma.curso.create({
      data: {
        titulo: data.titulo,
        slug,
        descripcion: sanitizedDescription,
        descripcionBreve: data.descripcionBreve || null,
        imagenUrl: data.imagenUrl,
        fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : null,
        fechaFin: data.fechaFin ? new Date(data.fechaFin) : null,
        duracionHoras: data.duracionHoras ?? 0,
        modalidad: data.modalidad as any,
        certificado: data.certificado ?? true,
        precio: data.precio ?? undefined,
        cupoMaximo: data.cupoMaximo ?? undefined,
        creadorId: data.creadorId,
      },
    });

    return NextResponse.json(curso, { status: 201 });
  } catch (err) {
    console.error('POST /api/cursos error:', err);
    return NextResponse.json({ error: 'Error al crear curso.' }, { status: 500 });
  }
}