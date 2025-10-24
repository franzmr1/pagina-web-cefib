// app/lib/security.ts
/**
 * Sanitiza inputs para prevenir XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 500); // Límite de caracteres
}

/**
 * Valida email de forma segura
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Valida teléfono peruano
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Previene inyección de código en URLs
 */
export function sanitizeURL(url: string): string {
  try {
    const parsed = new URL(url);
    // Solo permite https y http
    if (!['https:', 'http:'].includes(parsed.protocol)) {
      return '#';
    }
    return parsed.toString();
  } catch {
    return '#';
  }
}

/**
 * Rate limiting simple en cliente
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Filtrar intentos dentro de la ventana de tiempo
    const recentAttempts = userAttempts.filter(
      time => now - time < this.windowMs
    );
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }
}