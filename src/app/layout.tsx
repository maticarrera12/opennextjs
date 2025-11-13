import { headers } from "next/headers";

export default async function RootLayout({ children, params }: { children: React.ReactNode;
  params: Promise<{ locale: string }>; }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Si es la ruta de docs o legal, renderizar sin el wrapper de locale
  if (pathname.startsWith("/docs") || pathname.startsWith("/legal")) {
    return children;
  }
  const {locale} = await params
  // Para otras rutas, root layout debe proveer <html> y <body>
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
