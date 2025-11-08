import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import type { Adapter } from 'next-auth/adapters';

// DEBUG: información del adapter (temporal - quitar después)
//console.log('DEBUG auth - PrismaAdapter type:', typeof PrismaAdapter);
//try {
//  const _test = PrismaAdapter(prisma);
//  console.log('DEBUG auth - PrismaAdapter(prisma) typeof:', typeof _test, 'keys:', Object.keys(_test || {}));
//} catch (err) {
//  console.error('DEBUG auth - PrismaAdapter(prisma) threw:', err);
//}

// Exportamos authOptions sin forzar import de tipos de next-auth (varía por versión).
// Aseguramos que session.strategy sea el literal 'jwt' para que TypeScript lo infiera correctamente.
export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'tu@email.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new Error('Email y contraseña son requeridos');
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          throw new Error('Credenciales inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Credenciales inválidas');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  // Aquí forzamos el literal con `as const` (o puedes usar 'jwt' as const)
  session: {
    strategy: 'jwt' as const,
    maxAge: 24 * 60 * 60, // 24 horas
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};