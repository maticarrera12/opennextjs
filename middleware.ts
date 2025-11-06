import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

// Crea la instancia de next-intl con tus settings de locales
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1️⃣ Si estás en la raíz "/", detectar idioma del navegador
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const preferredLocale = acceptLanguage.includes("es") ? "es" : "en";

    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // 2️⃣ Para el resto, deja que next-intl maneje la localización
  const response = intlMiddleware(request);

  // 3️⃣ Guarda una cookie para recordar el idioma (opcional)
  const localeMatch = pathname.match(/^\/(en|es)(\/|$)/);
  if (localeMatch) {
    const locale = localeMatch[1];
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
  }

  return response;
}

// 4️⃣ Configuración: interceptar todas las rutas excepto las internas
export const config = {
  matcher: ["/((?!api|_next|_vercel|docs|legal|.*\\.).*)", "/"],
};
