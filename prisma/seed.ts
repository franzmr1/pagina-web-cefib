// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes (opcional)
  await prisma.asistencia.deleteMany();
  await prisma.etiquetaCurso.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.etiqueta.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuario administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador CEFIB',
      email: 'admin@cefib.pe',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuario admin creado:', admin.email);

  // Crear etiquetas por defecto
  const etiquetas = await Promise.all([
    prisma.etiqueta.create({
      data: { nombre: 'Salud', slug: 'salud', color: '#EF4444' },
    }),
    prisma.etiqueta.create({
      data: { nombre: 'Educación', slug: 'educacion', color: '#3B82F6' },
    }),
    prisma.etiqueta.create({
      data: { nombre: 'Gestión Pública', slug: 'gestion-publica', color: '#8B5CF6' },
    }),
    prisma.etiqueta.create({
      data: { nombre: 'Tecnología', slug: 'tecnologia', color: '#10B981' },
    }),
    prisma.etiqueta.create({
      data: { nombre: 'Minería', slug: 'mineria', color: '#F59E0B' },
    }),
  ]);

  console.log(`✅ ${etiquetas.length} etiquetas creadas`);

  // Crear curso de ejemplo
  const cursoEjemplo = await prisma.curso.create({
    data: {
      titulo: 'Diplomado en Gestión Pública',
      slug: 'diplomado-gestion-publica',
      descripcion: 'Programa completo de formación en gestión pública orientado a resultados',
      descripcionBreve: 'Formación integral en gestión pública moderna',
      imagenUrl: '/images/cursos/ejemplo.jpg',
      duracionHoras: 120,
      modalidad: 'VIRTUAL',
      certificado: true,
      precio: 500,
      estado: 'ACTIVO',
      cupoMaximo: 30,
      destacado: true,
      creadorId: admin.id,
      fechaInicio: new Date('2025-02-01'),
      fechaFin: new Date('2025-05-01'),
    },
  });

  console.log('✅ Curso de ejemplo creado:', cursoEjemplo.titulo);

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });