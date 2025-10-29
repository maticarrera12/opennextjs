import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Si es la ruta de docs o legal, renderizar sin el wrapper de locale
  if (pathname.startsWith("/docs") || pathname.startsWith("/legal")) {
    return children;
  }

  // Para otras rutas, renderizar normalmente
  return children;
}
