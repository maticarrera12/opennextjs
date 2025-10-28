"use client";
import React from "react";
import { PricingCards } from "@/app/[locale]/(marketing)/_components/pricing/pricing-cards";
import BentoShowcase from "@/app/[locale]/(marketing)/_components/bento/bento-showcase";
import Hero from "@/app/[locale]/(marketing)/_components/hero/hero";
import Faq from "@/app/[locale]/(marketing)/_components/faq";

const page = () => {
  return (
    <div className="w-full bg-background">
      <Hero />
      <BentoShowcase />
      <PricingCards />
      <Faq />
    </div>
  );
};

export default page;
