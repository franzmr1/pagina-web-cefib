import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs'; // asegurarnos de usar Node runtime

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const DEFAULT_MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const maxBytes = Number(process.env.MAX_UPLOAD_SIZE_BYTES || DEFAULT_MAX_BYTES);

    // file.size is not always available on File from server FormData in every env,
    // but File in this runtime should expose it. Fallback to ArrayBuffer length check below.
    const mime = (file as any).type || '';
    if (!ALLOWED_MIME.includes(mime)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > maxBytes) {
      return NextResponse.json({ error: 'Archivo demasiado grande' }, { status: 413 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Determine extension from mime OR from file.name when available
    let ext = '';
    if ((file as any).name) {
      const parts = (file as any).name.split('.');
      ext = parts.length > 1 ? parts.pop()!.toLowerCase() : '';
    }
    if (!ext) {
      // fallback by mime
      if (mime === 'image/png') ext = 'png';
      else if (mime === 'image/webp') ext = 'webp';
      else ext = 'jpg';
    }

    const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const filepath = path.join(uploadsDir, filename);

    await fs.writeFile(filepath, buffer, { mode: 0o644 });

    const url = `/uploads/${filename}`;

    return NextResponse.json({ ok: true, url });
  } catch (err: any) {
    console.error('UPLOAD ERROR', err);
    return NextResponse.json({ error: 'Error interno al subir archivo' }, { status: 500 });
  }
}