"use client";

import { Code, Palette, Database, Plug } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TechItem {
  name: string;
  image: string;
  description: string;
}

export function TechStackTabs() {
  const t = useTranslations("techStack");

  const techStack = {
    core: [
      {
        name: "Next.js",
        image: "/assets/nextjs.png",
        description: t("core.nextjs"),
      },
      {
        name: "TypeScript",
        image: "/assets/Typescript.png",
        description: t("core.typescript"),
      },
      {
        name: "Prettier",
        image: "/assets/prettier.png",
        description: t("core.prettier"),
      },
      {
        name: "ESLint",
        image: "/assets/eslint.jpg",
        description: t("core.eslint"),
      },
      {
        name: "Husky",
        image: "/assets/husky.png",
        description: t("core.husky"),
      },
    ],
    frontend: [
      {
        name: "Shadcn UI",
        image: "/assets/shadcn.png",
        description: t("frontend.shadcn"),
      },
      {
        name: "Tailwind CSS",
        image: "/assets/tailwindcss.png",
        description: t("frontend.tailwind"),
      },
      {
        name: "DaisyUI",
        image: "/assets/daisyui.png",
        description: t("frontend.daisyui"),
      },
      {
        name: "Zod",
        image: "/assets/zod.png",
        description: t("frontend.zod"),
      },
      {
        name: "Framer Motion",
        image: "/assets/framer.png",
        description: t("frontend.framerMotion"),
      },
      {
        name: "GSAP",
        image: "/assets/gsap.jpg",
        description: t("frontend.gsap"),
      },
    ],
    backend: [
      {
        name: "Zod",
        image: "/assets/zod.png",
        description: t("backend.zod"),
      },
      {
        name: "Prisma",
        image: "/assets/prisma.png",
        description: t("backend.prisma"),
      },
      {
        name: "PostgreSQL",
        image: "/assets/db.svg",
        description: t("backend.postgresql"),
      },
    ],
    integrations: [
      {
        name: "Lemon Squeezy",
        image: "/assets/Lemon_Squeezy.png",
        description: t("integrations.lemonSqueezy"),
      },
      {
        name: "Stripe",
        image: "/assets/stripe.png",
        description: t("integrations.stripe"),
      },
      {
        name: "Better Auth",
        image: "/assets/better-auth-logo.png",
        description: t("integrations.betterAuth"),
      },
      {
        name: "Crisp",
        image: "/assets/crisp.jpeg",
        description: t("integrations.crisp"),
      },
      {
        name: "PostHog",
        image: "/assets/posthog.png",
        description: t("integrations.posthog"),
      },
      {
        name: "Resend",
        image: "/assets/resend.png",
        description: t("integrations.resend"),
      },
      {
        name: "OpenAI",
        image: "/assets/openai.png",
        description: t("integrations.openai"),
      },
      {
        name: "Nextra",
        image: "/assets/nextra.jpeg",
        description: t("integrations.nextra"),
      },
    ],
  };

  return (
    <Tabs defaultValue="core" className="w-full max-w-4xl py-20 md:mx-auto space-y-3">
      {/* TAB LIST */}
      <TabsList className="flex w-full justify-between bg-card/60 backdrop-blur-md py-8 px-2 rounded-full border border-border">
        {[
          { value: "core", label: t("tabs.core"), icon: Code },
          { value: "frontend", label: t("tabs.frontend"), icon: Palette },
          { value: "backend", label: t("tabs.backend"), icon: Database },
          { value: "integrations", label: t("tabs.integrations"), icon: Plug },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 rounded-full py-6 text-base font-medium transition-all 
                data-[state=active]:bg-linear-to-r data-[state=active]:from-pink-500
                data-[state=active]:to-purple-600 data-[state=active]:text-white 
                data-[state=active]:shadow-md hover:bg-muted/30 flex items-center justify-center gap-2"
            >
              <Icon className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* CORE */}
      <TabsContent value="core">
        <TechCards items={techStack.core} />
      </TabsContent>

      {/* FRONTEND */}
      <TabsContent value="frontend">
        <TechCards items={techStack.frontend} />
      </TabsContent>

      {/* BACKEND */}
      <TabsContent value="backend">
        <TechCards items={techStack.backend} />
      </TabsContent>

      {/* INTEGRATIONS */}
      <TabsContent value="integrations">
        <TechCards items={techStack.integrations} />
      </TabsContent>
    </Tabs>
  );
}

function TechCards({ items }: { items: TechItem[] }) {
  return (
    <div className="w-full overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:overflow-x-visible scrollbar-hide">
      <div className="flex gap-3 md:grid md:grid-cols-2 md:gap-4 min-w-max md:min-w-0">
        {items.map((item, index) => (
          <TechCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function TechCard({ item }: { item: TechItem }) {
  return (
    <Card
      className="
        p-3 md:p-5 
        bg-card/60 backdrop-blur-md border border-border rounded-2xl 
        flex flex-col justify-between
        min-w-[180px] max-w-[180px] md:max-w-none
        min-h-[140px] md:min-h-[160px]
        h-full
        shrink-0
      "
    >
      <div className="flex items-center gap-2.5 md:gap-4">
        <div className="relative w-9 h-9 md:w-14 md:h-14 shrink-0 rounded-lg overflow-hidden bg-muted/50">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-1.5 md:p-2"
            sizes="(max-width: 768px) 36px, 56px"
          />
        </div>
        <h3 className="text-sm md:text-lg font-semibold text-foreground truncate">{item.name}</h3>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground leading-snug line-clamp-3 md:line-clamp-2 mt-2 min-h-12 md:min-h-10">
        {item.description}
      </p>
    </Card>
  );
}
