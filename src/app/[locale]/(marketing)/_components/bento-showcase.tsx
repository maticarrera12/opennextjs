import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

import { WaitlistMetrics } from "./waitlist-metrics";
import { LanguageSwitcher } from "@/components/navbar/languaje-switcher";
import Logo from "@/components/navbar/logo";
import ThemeToggle from "@/components/navbar/theme-toggle";

const BentoShowcase = () => {
  const tHero = useTranslations("bentoShowcase.heroCard");
  const tFeatures = useTranslations("bentoShowcase.featuresGrid");
  const tFeatureTitle = useTranslations("bentoShowcase.featureTitle");
  const tTimeToMarket = useTranslations("bentoShowcase.timeToMarket");
  const tTechStack = useTranslations("bentoShowcase.techStack");
  const tCta = useTranslations("bentoShowcase.ctaCard");
  return (
    <section className="w-full py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Bento Grid Container - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[100px] md:auto-rows-[110px] gap-2 md:gap-3 p-3 md:p-4 bg-muted/50 rounded-2xl md:rounded-3xl border border-border">
          {/* Hero Card */}
          <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 rounded-xl overflow-hidden relative border border-border flex flex-col items-center justify-center p-4 md:p-6 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-2">
              {tHero("title")}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">{tHero("subtitle")}</p>
          </div>

          {/* Logo/Brand */}
          <div className="bg-linear-to-r from-pink-500 to-purple-600 col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1 gap-6 border border-border rounded-xl flex items-center justify-center overflow-hidden relative">
            <Logo />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">
              OpenNextJS
            </h1>
          </div>

          {/* Features Grid - Tech Stack */}
          <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1 border border-border rounded-xl overflow-hidden relative p-2 md:p-3 flex flex-col justify-center">
            <p className="text-[8px] md:text-xs text-foreground mb-1 font-medium">
              {tFeatures("title")}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-4 md:w-5 md:h-5 shrink-0 rounded overflow-hidden bg-white/20">
                <Image
                  src="/assets/nextjs.png"
                  alt="Next.js"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 16px, 20px"
                />
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-muted-foreground truncate">
                {tFeatures("nextjs")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="relative w-4 h-4 md:w-5 md:h-5 shrink-0 rounded overflow-hidden bg-white/20">
                <Image
                  src="/assets/Typescript.png"
                  alt="TypeScript"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 16px, 20px"
                />
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-muted-foreground truncate">
                {tFeatures("typescript")}
              </span>
            </div>
          </div>

          {/* Feature Title - Auth & Payments */}
          <div className="col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 border border-border rounded-xl p-3 md:p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative w-6 h-6 md:w-7 md:h-7 rounded overflow-hidden bg-white/20 shrink-0">
                <Image
                  src="/assets/better-auth-logo.png"
                  alt="Better Auth"
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 24px, 28px"
                />
              </div>
              <div className="relative w-6 h-6 md:w-7 md:h-7 rounded overflow-hidden bg-white/20 shrink-0">
                <Image
                  src="/assets/stripe.png"
                  alt="Stripe"
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 24px, 28px"
                />
              </div>
            </div>
            <div>
              <h2 className="text-base md:text-lg lg:text-xl font-bold text-foreground leading-tight">
                {tFeatureTitle("title")}
              </h2>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                {tFeatureTitle("subtitle")}
              </p>
            </div>
          </div>

          {/* Date Card */}
          <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1 bg-card border border-border rounded-xl flex flex-col items-center justify-center gap-0.5 p-2 md:p-3">
            <ThemeToggle />
          </div>

          {/* Icon Card */}
          <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1 bg-card border border-border rounded-xl flex items-center justify-center">
            <div className="flex items-center justify-center max-w-32">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Metrics Card */}
          <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 flex w-full h-full">
            <WaitlistMetrics />
          </div>

          {/* Hours Saved Card */}
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 border border-border rounded-xl flex items-center justify-between px-4 md:px-6 py-3 md:py-4 overflow-hidden relative">
            <div className="flex flex-col z-10">
              <h3 className="text-xl font-bold text-foreground mb-0.5">{tTimeToMarket("title")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {tTimeToMarket("subtitle")}
              </p>
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl opacity-80">⚡</div>
          </div>

          {/* Tech Stack Preview */}
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 border border-border rounded-xl flex items-center justify-between px-3 md:px-4 py-2 md:py-3 overflow-hidden relative">
            <div className="flex flex-col z-10">
              <h3 className="text-sm md:text-base font-bold text-foreground mb-0.5">
                {tTechStack("title")}
              </h3>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                {tTechStack("subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded overflow-hidden bg-white/20 shrink-0">
                <Image
                  src="/assets/prisma.png"
                  alt="Prisma"
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 24px, 32px"
                />
              </div>
              <div className="relative w-6 h-6 md:w-8 md:h-8 rounded overflow-hidden bg-white/20 shrink-0">
                <Image
                  src="/assets/db.svg"
                  alt="PostgreSQL"
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 768px) 24px, 32px"
                />
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div
            className="col-span-2 row-span-1 md:col-span-4 md:row-span-1 lg:col-span-4 lg:row-span-1 border border-border rounded-xl flex items-center justify-between px-4 md:px-6 py-3 overflow-hidden relative"
            style={
              {
                backgroundImage: "url('/assets/moon.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              } as React.CSSProperties
            }
          >
            <div className="z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {tCta("title")}
              </h3>
              <div className="text-xs text-white mt-0.5">{tCta("subtitle")}</div>
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl">🚀</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoShowcase;
