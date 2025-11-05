import { LanguageSwitcher } from "@/components/navbar/languaje-switcher";
import Logo from "@/components/navbar/logo";
import ThemeToggle from "@/components/navbar/theme-toggle";
import {WaitlistMetrics} from "./waitlist-metrics";
import React from "react";

const BentoShowcase = () => {
  return (
    <section className="w-full py-10 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Bento Grid Container - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[100px] md:auto-rows-[110px] gap-2 md:gap-3 p-3 md:p-4 bg-muted/50 rounded-2xl md:rounded-3xl border border-border">
          {/* Hero Card */}
          <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2 rounded-xl overflow-hidden relative bg-card border border-border flex items-center justify-center">
            <div className="text-3xl md:text-4xl lg:text-5xl">✨</div>
          </div>

          {/* Logo/Brand */}
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1 gap-6 bg-card border border-border rounded-xl flex items-center justify-center">
            <Logo />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              OpenNextJS
            </h1>
          </div>

          {/* Features Grid */}
          <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1 bg-card border border-border rounded-xl grid grid-cols-2 gap-1 p-1.5 md:p-2">
            <div className="flex items-center justify-center text-base md:text-lg lg:text-xl">
              ⚡
            </div>
            <div className="flex items-center justify-center text-base md:text-lg lg:text-xl">
              🎯
            </div>
            <div className="flex items-center justify-center text-base md:text-lg lg:text-xl">
              🚀
            </div>
            <div className="flex items-center justify-center text-base md:text-lg lg:text-xl">
              💡
            </div>
          </div>

          {/* Feature Title */}
          <div className="col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 bg-card border border-border rounded-xl p-3 md:p-4 flex flex-col justify-end">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground leading-tight">
              Feature
              <br className="hidden md:block" />
              Showcase
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Discover amazing capabilities
            </p>
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

          {/* Timer Card */}
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 bg-card border border-border rounded-xl flex items-center justify-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              24:00
            </div>
          </div>

          {/* Device Preview */}
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1 bg-card border border-border rounded-xl flex items-center justify-center p-2 md:p-3 overflow-hidden relative">
            <span className="text-xs md:text-sm text-muted-foreground">
              Cool feature
            </span>
          </div>

          {/* CTA Card */}
          <div className="col-span-2 row-span-1 md:col-span-4 md:row-span-1 lg:col-span-4 lg:row-span-1 bg-card border border-border rounded-xl flex items-center justify-between px-4 md:px-6 py-3 overflow-hidden relative">
            <div className="z-10">
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                Get Started
                <br />
                Today
              </h3>
              <div className="text-xs text-muted-foreground mt-0.5">
                Build something amazing
              </div>
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl opacity-20">
              🚀
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoShowcase;
