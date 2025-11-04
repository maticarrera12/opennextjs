"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  ShieldCheck,
  CreditCard,
  Cloud,
  LayoutDashboard,
  Brain,
} from "lucide-react";

export function FeatureTabs() {
  return (
    <Tabs defaultValue="auth" className="w-full max-w-3xl  md:mx-auto space-y-3">
      {/* TAB LIST */}
      <TabsList className="flex w-full justify-between bg-card/60 backdrop-blur-md py-8 px-2 rounded-full border border-border">
        {[
          { value: "auth", label: "Authentication", icon: ShieldCheck },
          { value: "payments", label: "Payments", icon: CreditCard },
          { value: "storage", label: "Storage", icon: Cloud },
          { value: "admin", label: "Admin Dashboard", icon: LayoutDashboard },
          { value: "ai", label: "AI & Brand", icon: Brain },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex-1 rounded-full py-6 text-base font-medium transition-all 
                data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/40 
                data-[state=active]:to-violet-700/40 data-[state=active]:text-white 
                data-[state=active]:shadow-md hover:bg-muted/30 flex items-center justify-center gap-2"
            >
              <Icon className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {/* AUTH */}
      <TabsContent value="auth">
        <FeatureCard
          icon={ShieldCheck}
          title="Authentication"
          items={[
            "Plug & Play auth with Better Auth.",
            "Supports Email, OAuth (Google / GitHub) & Magic Links.",
            "Role-based access and secure sessions.",
            "Custom user fields integrated with Prisma.",
          ]}
        />
      </TabsContent>

      {/* PAYMENTS */}
      <TabsContent value="payments">
        <FeatureCard
          icon={CreditCard}
          title="Payments"
          items={[
            "Integrates Stripe & Lemon Squeezy.",
            "Subscriptions, credits, and LTD campaigns ready.",
            "Automatic webhooks & plan gating.",
            "Billing panel with real-time analytics.",
          ]}
        />
      </TabsContent>

      {/* STORAGE */}
      <TabsContent value="storage">
        <FeatureCard
          icon={Cloud}
          title="Storage & Uploads"
          items={[
            "Upload files with Vercel Blob or Cloudinary.",
            "Optimized image management.",
            "Secure, signed URLs with expiration.",
            "Drag & drop uploads preconfigured.",
          ]}
        />
      </TabsContent>

      {/* ADMIN DASHBOARD */}
      <TabsContent value="admin">
        <FeatureCard
          icon={LayoutDashboard}
          title="Admin Dashboard"
          items={[
            "Comprehensive overview of your app’s data and users.",
            "Track subscriptions, usage, and analytics in real-time.",
            "Manage users, plans, credits, and system health.",
            "Built with Recharts + Shadcn UI for a modern and clean layout.",
          ]}
        />
      </TabsContent>

      {/* AI */}
      <TabsContent value="ai">
        <FeatureCard
          icon={Brain}
          title="AI & Brand Tools"
          items={[
            "Ready-to-use OpenAI API integration.",
            "Generate text, images, color palettes, and more.",
            "Usage-based credit system with tracking.",
            "Persistent storage via the BrandAsset model.",
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}

/* ✅ Reusable FeatureCard component */
function FeatureCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  items: string[];
}) {
  return (
    <Card className="p-6 bg-card/60 backdrop-blur-md border border-border rounded-2xl space-y-4">
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-2"
        style={{
          background:
            "linear-gradient(to right, rgba(244, 114, 182, 0.7), rgba(76, 29, 149, 0.7))",
        }}
      >
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
