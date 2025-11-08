import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Creamos el handler y casteamos authOptions a any para evitar incompatibilidades de tipos entre versiones
const nextAuthHandler = NextAuth(authOptions as any);

// Envolver el handler en funciones GET/POST para cumplir la firma que Next.js espera
export async function GET(req: NextRequest, context: any) {
  // nextAuthHandler puede ser una función que acepte (req, res). Simplemente llamamos y retornamos su resultado.
  const result = await (nextAuthHandler as any)(req, context);
  return result as Response;
}

export async function POST(req: NextRequest, context: any) {
  const result = await (nextAuthHandler as any)(req, context);
  return result as Response;
}