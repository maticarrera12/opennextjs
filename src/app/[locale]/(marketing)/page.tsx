"use client";
import React from "react";
import BentoShowcase from "@/app/[locale]/(marketing)/_components/bento-showcase";
import Hero from "@/app/[locale]/(marketing)/_components/hero";
import Faq from "@/app/[locale]/(marketing)/_components/faq";
import LogoMarquee from "./_components/logo-marquee";
import HoursSavedSection from "./_components/hours-saved-section";
import { FeatureTabs } from "./_components/feature-tabs";
import { TechStackTabs } from "./_components/tech-stack-tabs";

const page = () => {
  return (
    <div className="w-full bg-background">
      <Hero />
      <LogoMarquee />
      <TechStackTabs/>
      <BentoShowcase />
      <HoursSavedSection />
      <FeatureTabs />
      <Faq />
    </div>
  );
};

export default page;
