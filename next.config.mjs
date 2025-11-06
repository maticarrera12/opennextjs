import createNextIntlPlugin from "next-intl/plugin";
import nextra from "nextra";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withNextra = nextra({
  theme: "nextra-theme-docs",
  defaultShowCopyCode: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure Nextra works correctly in production
  experimental: {
    serverComponentsExternalPackages: ["nextra", "nextra-theme-docs"],
  },
  // Transpile Nextra packages
  transpilePackages: ["nextra", "nextra-theme-docs"],
};

export default withNextIntl(withNextra(nextConfig));
