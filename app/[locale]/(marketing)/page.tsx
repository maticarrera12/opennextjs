"use client";
import React from "react";
import { PricingCards } from "@/components/pricing/pricing-cards";
import BentoShowcase from "@/components/bento/bento-showcase";

const page = () => {
  return (
    <div className="w-full bg-background">
      <BentoShowcase />
      <PricingCards />
    </div>
  );
};

export default page;
