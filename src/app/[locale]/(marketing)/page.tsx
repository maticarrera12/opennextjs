"use client";
import React from "react";

import { FeatureTabs } from "./_components/feature-tabs";
import HoursSavedSection from "./_components/hours-saved-section";
import LogoMarquee from "./_components/logo-marquee";
import { TechStackTabs } from "./_components/tech-stack-tabs";
import BentoShowcase from "@/app/[locale]/(marketing)/_components/bento-showcase";
import Faq from "@/app/[locale]/(marketing)/_components/faq";
import Hero from "@/app/[locale]/(marketing)/_components/hero";
import CTAWaitlist from "./_components/cta-waitlist";

const page = () => {
  return (
    <div className="w-full bg-background">
      <Hero />
      <LogoMarquee />
      <TechStackTabs />
      <BentoShowcase />
      <HoursSavedSection />
      <FeatureTabs />
      <Faq />
      <CTAWaitlist />
    </div>
  );
};

export default page;
