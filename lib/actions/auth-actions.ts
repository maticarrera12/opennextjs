'use server'
import { auth } from "../auth";
import { headers } from "next/headers";
import { signInSchema, signUpSchema } from "../schemas";

/**
 * Server Actions para operaciones críticas de autenticación
 * Usar estas funciones en lugar de authClient.signIn/signUp para:
 * - Mejor seguridad
 * - Validación del lado del servidor
 * - Manejo correcto de cookies en Next.js App Router
 */

export const signUp = async(email: string, password: string, name: string) => {
    // Validación del lado del servidor
    const validated = signUpSchema.safeParse({ email, password, name });
    
    if (!validated.success) {
        return {
            error: {
                message: validated.error.issues[0].message,
            },
            user: null,
        };
    }

    const result = await auth.api.signUpEmail({
        body: {
            name: validated.data.name,
            email: validated.data.email,
            password: validated.data.password,
            callbackURL: "/",
        }
    })

    return result;
}

export const signIn = async(email: string, password: string) => {
    // Validación del lado del servidor
    const validated = signInSchema.safeParse({ email, password });
    
    if (!validated.success) {
        return {
            error: {
                message: validated.error.issues[0].message,
            },
            user: null,
        };
    }

    const result = await auth.api.signInEmail({
        body: {
            email: validated.data.email,
            password: validated.data.password,
            callbackURL: "/",
        }
    })

    return result;
}

export const signOut = async() => {
    const result = await auth.api.signOut({
        headers: await headers(),
    })

    return result;
}
