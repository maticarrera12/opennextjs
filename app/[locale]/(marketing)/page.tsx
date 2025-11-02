"use client";
import React from "react";
import BentoShowcase from "@/app/[locale]/(marketing)/_components/bento-showcase";
import Hero from "@/app/[locale]/(marketing)/_components/hero";
import Faq from "@/app/[locale]/(marketing)/_components/faq";
import LogoMarquee from "./_components/logo-marquee";
import HoursSavedSection from "./_components/hours-saved-section";

const page = () => {
  return (
    <div className="w-full bg-background">
      <Hero />
      <LogoMarquee />
      <BentoShowcase />
      <HoursSavedSection />
      <Faq />
    </div>
  );
};

export default page;
