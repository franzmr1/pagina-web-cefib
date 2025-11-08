import { z } from 'zod';

// Zod schema para crear/validar cursos en el backend
export const cursoCreateSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(200),
  descripcionBreve: z.string().max(200).optional().nullable(),
  descripcion: z.string().max(5000).optional().nullable(),
  // Acepta URL absolute (http(s)://...) o rutas relativas que comiencen por /uploads/
  imagenUrl: z.string().refine((val) => {
    try {
      if (/^\/uploads\/.+/.test(val)) return true; // ruta relativa permitida
      // Si empieza con http/https, valida URL
      return /^https?:\/\//.test(val) && Boolean(new URL(val));
    } catch {
      return false;
    }
  }, { message: 'imagenUrl debe ser una URL válida o una ruta relativa que comience con /uploads/' }),
  fechaInicio: z.string().optional().nullable(),
  fechaFin: z.string().optional().nullable(),
  duracionHoras: z.coerce
    .number()
    .int()
    .nonnegative()
    .optional()
    .default(0),
  modalidad: z.enum(['PRESENCIAL', 'VIRTUAL', 'HIBRIDO']).optional().default('VIRTUAL'),
  certificado: z.boolean().optional().default(true),
  precio: z.coerce.number().nonnegative().optional().nullable(),
  cupoMaximo: z.coerce.number().int().positive().optional().nullable(),
  creadorId: z.string().min(1, 'creadorId es requerido'),
  etiquetas: z.array(z.string()).optional().nullable(),
});
export type CursoCreateInput = z.infer<typeof cursoCreateSchema>;