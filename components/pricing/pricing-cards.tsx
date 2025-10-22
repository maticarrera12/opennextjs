"use client";

import { PLANS, CREDIT_PACKS } from "@/lib/credits/constants";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Modal } from "@/components/ui/modal";
import { PaymentMethodSelector } from "./payment-method-selector";

interface PlanCardProps {
  plan: (typeof PLANS)[keyof typeof PLANS];
  interval: "monthly" | "annual";
  isPopular: boolean;
  t: ReturnType<typeof useTranslations>;
  onChoosePlan: () => void;
  currentUserPlan: string | null;
}

interface CreditPackCardProps {
  pack: (typeof CREDIT_PACKS)[keyof typeof CREDIT_PACKS];
  t: ReturnType<typeof useTranslations>;
  onBuyCredits: () => void;
}

export function PricingCards() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [interval, setInterval] = useState<"monthly" | "annual">("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    type: "subscription" | "credit_pack";
    id: string;
  } | null>(null);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const isDevelopment = process.env.NEXT_PUBLIC_PAYMENT_MODE === "development";

  // Fetch user's current plan
  useEffect(() => {
    async function fetchUserPlan() {
      try {
        const response = await fetch("/api/auth/get-session");
        const data = await response.json();
        if (data?.user?.plan) {
          setUserPlan(data.user.plan);
        }
      } catch (error) {
        console.error("Error fetching user plan:", error);
      }
    }
    fetchUserPlan();
  }, []);

  // Filtrar planes activos (que tengan price IDs configurados o estemos en dev)
  const activePlans = Object.entries(PLANS).filter(([key, plan]) => {
    if (key === "FREE") return true; // Free siempre visible

    // En desarrollo, mostrar todos
    if (isDevelopment) return true;

    // En producción, solo mostrar si tiene price IDs configurados
    return plan.stripe[interval] || plan.lemonSqueezy[interval];
  });

  const handleChoosePlan = (planKey: string) => {
    const plan = PLANS[planKey as keyof typeof PLANS];
    if (plan.id === "free") {
      // Free plan - just redirect to app
      window.location.href = "/app";
      return;
    }
    setSelectedPlan({ type: "subscription", id: plan.id });
    setIsModalOpen(true);
  };

  const handleBuyCredits = (packKey: string) => {
    const pack = CREDIT_PACKS[packKey as keyof typeof CREDIT_PACKS];
    setSelectedPlan({ type: "credit_pack", id: pack.id });
    setIsModalOpen(true);
  };

  const handleStripeCheckout = async () => {
    if (!selectedPlan) return;

    try {
      const response = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedPlan.type,
          locale,
          ...(selectedPlan.type === "subscription"
            ? { planId: selectedPlan.id, interval }
            : { packId: selectedPlan.id }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create checkout session";

      // Show a styled alert for development mode errors
      if (errorMessage.includes("Development mode:")) {
        alert(`⚠️ Configuration Required\n\n${errorMessage}`);
      } else {
        alert(`❌ Error: ${errorMessage}`);
      }

      setIsModalOpen(false);
    }
  };

  const handleLemonCheckout = () => {
    alert("Lemon Squeezy coming soon!");
  };

  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600">{t("subtitle")}</p>

          {/* Toggle Monthly/Annual */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setInterval("monthly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  interval === "monthly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t("interval.monthly")}
              </button>
              <button
                onClick={() => setInterval("annual")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  interval === "annual"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t("interval.annual")}
                <span className="ml-2 text-green-600 text-xs font-semibold">
                  {t("interval.savePercent")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Development Mode Warning */}
        {isDevelopment && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ <strong>{t("developmentMode.title")}</strong>{" "}
              {t("developmentMode.message")}
            </p>
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activePlans.map(([key, plan]) => (
            <PlanCard
              key={key}
              plan={plan}
              interval={interval}
              isPopular={key === "PRO"}
              t={t}
              onChoosePlan={() => handleChoosePlan(key)}
              currentUserPlan={userPlan}
            />
          ))}
        </div>

        {/* Credit Packs Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">
            {t("creditPacks.title")}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 max-w-md mx-auto">
            {Object.entries(CREDIT_PACKS).map(([key, pack]) => (
              <CreditPackCard
                key={key}
                pack={pack}
                t={t}
                onBuyCredits={() => handleBuyCredits(key)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PaymentMethodSelector
          onSelectStripe={handleStripeCheckout}
          onSelectLemon={handleLemonCheckout}
        />
      </Modal>
    </div>
  );
}

function PlanCard({
  plan,
  interval,
  isPopular,
  t,
  onChoosePlan,
  currentUserPlan,
}: PlanCardProps) {
  const price =
    interval === "monthly"
      ? plan.price.monthly
      : "annual" in plan.price
        ? plan.price.annual
        : plan.price.monthly;
  const pricePerMonth =
    interval === "annual" && "annual" in plan.price
      ? Math.round(plan.price.annual / 12)
      : price;

  return (
    <div
      className={`relative border-2 rounded-lg p-6 flex flex-col bg-white ${
        isPopular ? "border-blue-500 shadow-lg" : "border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
        <div className="mt-4 flex items-baseline justify-center">
          <span className="text-5xl font-bold text-gray-900">
            ${pricePerMonth}
          </span>
          <span className="ml-2 text-gray-500">{t("perMonth")}</span>
        </div>
        {interval === "annual" && (
          <p className="mt-1 text-sm text-gray-500">
            {t("billedAnnually", { price: `$${price}` })}
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="mt-8 space-y-3 flex-grow">
        <li className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-green-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm text-gray-700">
            <strong>{plan.credits.monthly}</strong>{" "}
            {t("plans.free.features.credits")}
            {plan.credits.rollover && ` (${t("plans.free.features.rollover")})`}
          </span>
        </li>
        {plan.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-green-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onChoosePlan}
        disabled={currentUserPlan?.toUpperCase() === plan.id.toUpperCase()}
        className={`mt-8 w-full py-3 rounded-lg font-semibold transition ${
          currentUserPlan?.toUpperCase() === plan.id.toUpperCase()
            ? "bg-green-100 text-green-700 cursor-not-allowed"
            : isPopular
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {currentUserPlan?.toUpperCase() === plan.id.toUpperCase()
          ? t("buttons.currentPlan")
          : plan.id === "free"
            ? t("buttons.getStarted")
            : t("buttons.choosePlan")}
      </button>
    </div>
  );
}

function CreditPackCard({ pack, t, onBuyCredits }: CreditPackCardProps) {
  return (
    <div className="relative border-2 border-gray-200 rounded-lg p-6 flex flex-col bg-white">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">{pack.name}</h3>
        <div className="mt-4 flex items-baseline justify-center">
          <span className="text-5xl font-bold text-gray-900">
            ${pack.price}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {pack.credits} {t("creditPacks.credits")}
        </p>
        {pack.savings > 0 && (
          <p className="mt-1 text-sm text-green-600 font-semibold">
            {t("creditPacks.savePercent", { percent: pack.savings })}
          </p>
        )}
      </div>

      {/* Features/Benefits */}
      <ul className="mt-8 space-y-3 flex-grow">
        <li className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-green-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm text-gray-700">
            <strong>{pack.credits}</strong>{" "}
            {t("creditPacks.features.addedInstantly")}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-green-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm text-gray-700">
            {t("creditPacks.features.noExpiration")}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-green-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm text-gray-700">
            {t("creditPacks.features.oneTimePayment")}
          </span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-green-500 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm text-gray-700">
            {t("creditPacks.features.useAnytime")}
          </span>
        </li>
      </ul>

      {/* CTA */}
      <button
        onClick={onBuyCredits}
        className="mt-8 w-full py-3 rounded-lg font-semibold transition bg-gray-100 text-gray-900 hover:bg-gray-200"
      >
        {t("buttons.buyCredits")}
      </button>
    </div>
  );
}
