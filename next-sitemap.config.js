/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://www.opennextjs.com",
  generateRobotsTxt: true, // genera robots.txt también
  outDir: "public", // dónde guardar los archivos generados
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  transform: async (config, path) => {
    // evita incluir rutas que no quieras indexar
    if (path.includes("/admin") || path.includes("/dashboard")) return null;
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};

export default config;
