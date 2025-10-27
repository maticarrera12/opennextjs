"use client";
import React from "react";
import { PricingCards } from "@/components/pricing/pricing-cards";
import BentoShowcase from "@/components/bento/bento-showcase";
import Hero from "@/components/hero/hero";

const page = () => {
  return (
    <div className="w-full bg-background">
      <Hero />
      <BentoShowcase />
      <PricingCards />
    </div>
  );
};

export default page;
