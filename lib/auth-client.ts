import { createAuthClient } from "better-auth/react";

/**
 * Auth Client para operaciones del lado del cliente
 * 
 * Úsalo para:
 * - Verificar sesión actual en componentes
 * - Obtener usuario actual
 * - Verificar autenticación en client components
 * 
 * NO uses authClient.signIn/signUp directamente en Next.js App Router
 * En su lugar, usa las Server Actions de lib/actions/auth-actions.ts
 */

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
})

// Exportar hooks para usar en client components
export const { useSession } = authClient
