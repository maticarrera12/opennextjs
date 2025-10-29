import { Layout } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import Navbar from "@/components/navbar/comp-582";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/navbar/theme-provider";

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageMap = await getPageMap("/legal");

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="pt-16">
            <Layout
              navbar={null}
              pageMap={pageMap}
              docsRepositoryBase="https://github.com/maticarrera12/open_next"
              footer={null}
            >
              {children}
            </Layout>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
