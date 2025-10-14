# Arquitectura de Autenticación

## 📋 Resumen

Este proyecto usa **Better Auth** con un enfoque híbrido que combina Server Actions y Client Hooks para máxima seguridad y mejor UX.

## 🎯 Cuándo usar qué

### ✅ Usa Server Actions (`lib/actions/auth-actions.ts`)

**Para operaciones críticas que modifican estado:**
- `signUp()` - Registro de nuevos usuarios
- `signIn()` - Inicio de sesión
- `signOut()` - Cerrar sesión
- Cualquier operación que requiera validación del lado del servidor

**¿Por qué?**
- ✅ Más seguro (código ejecutado solo en servidor)
- ✅ Cookies manejadas automáticamente
- ✅ Validación robusta con Zod
- ✅ Mejor para Next.js App Router
- ✅ No expone lógica al cliente

**Ejemplo:**
```tsx
'use client'

import { signIn } from '@/lib/actions/auth-actions'
import { toast } from 'sonner'

async function handleLogin(email: string, password: string) {
  const result = await signIn(email, password)
  
  if (result.user) {
    toast.success('Welcome back!')
    router.push('/dashboard')
  } else {
    toast.error('Invalid credentials')
  }
}
```

### ✅ Usa Client Hooks (`lib/auth-client.ts` + `hooks/use-auth.ts`)

**Para leer estado de autenticación:**
- Verificar si el usuario está logueado
- Obtener información del usuario actual
- Mostrar/ocultar UI basado en autenticación
- Proteger rutas en el cliente

**¿Por qué?**
- ✅ Actualización en tiempo real
- ✅ Sin necesidad de revalidación manual
- ✅ Optimizado para client components
- ✅ Mejor UX (loading states)

**Ejemplo:**
```tsx
'use client'

import { useAuth } from '@/hooks/use-auth'

export function DashboardHeader() {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <Skeleton />
  }

  if (!isAuthenticated) {
    return <LoginPrompt />
  }

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## 📁 Estructura de archivos

```
lib/
├── auth.ts                  # Configuración de better-auth (servidor)
├── auth-client.ts           # Cliente de better-auth (cliente)
├── actions/
│   └── auth-actions.ts      # Server Actions (signIn, signUp, signOut)
└── schemas/
    └── auth.schema.ts       # Validaciones con Zod

hooks/
└── use-auth.ts              # Hook personalizado para auth

app/
├── (auth)/
│   ├── signin/
│   │   └── page.tsx         # ✅ Usa Server Actions + Form
│   └── signup/
│       └── page.tsx         # ✅ Usa Server Actions + Form
└── dashboard/
    └── page.tsx             # ✅ Usa useAuth() para proteger
```

## 🔐 Flujo de Autenticación

### Registro (Sign Up)
```
Usuario → Formulario (Client)
          ↓
       Server Action (signUp)
          ↓
       Validación Zod
          ↓
       Better Auth API
          ↓
       Retorna resultado
          ↓
       Toast + Redirect
```

### Verificar sesión
```
Component (Client)
    ↓
useAuth() hook
    ↓
useSession() (authClient)
    ↓
Estado en tiempo real
```

## 🚀 Best Practices

### ✅ DO:
- ✅ Usa Server Actions para signIn/signUp/signOut
- ✅ Usa useAuth() para verificar autenticación
- ✅ Valida datos en el servidor con Zod
- ✅ Maneja errores gracefully con toast notifications
- ✅ Usa loading states para mejor UX

### ❌ DON'T:
- ❌ No uses authClient.signIn() directamente en Next.js App Router
- ❌ No expongas lógica de autenticación crítica en el cliente
- ❌ No olvides validar en el servidor (nunca confíes solo en validación cliente)
- ❌ No manejes tokens manualmente (better-auth lo hace por ti)

## 🔄 Migrar de authClient a Server Actions

Si tienes código usando authClient directamente:

**Antes (❌ No recomendado):**
```tsx
const handleLogin = async () => {
  await authClient.signIn.email({
    email,
    password
  })
}
```

**Después (✅ Recomendado):**
```tsx
import { signIn } from '@/lib/actions/auth-actions'

const handleLogin = async () => {
  const result = await signIn(email, password)
  if (result.user) {
    router.push('/dashboard')
  }
}
```

## 📚 Recursos

- [Better Auth Docs](https://www.better-auth.com/docs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Zod Validation](https://zod.dev/)

