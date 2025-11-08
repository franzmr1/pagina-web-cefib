import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Rutas protegidas — cualquier ruta que empiece con /admin
// NOTE: `matcher` MUST be a literal value so Next can statically analyze it.
export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // No intervenir en otras rutas públicas
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  // obtener token JWT de next-auth (asegúrate de tener NEXTAUTH_SECRET en .env)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Redirigir a sign-in y pasar callbackUrl
    const signInUrl = new URL('/api/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Si quieres restringir solo ADMINs (recomendado para panel):
  if (token.role && token.role !== 'ADMIN') {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}