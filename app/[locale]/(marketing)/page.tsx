"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { PricingCards } from "@/components/pricing/pricing-cards";
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import BetterAuthActionButton from '@/components/auth/BetterAuthActionButton'

const page = () => {
  const { data: session, isPending: loading } = authClient.useSession();
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <PricingCards />
    </div>
  );
};

export default page;
