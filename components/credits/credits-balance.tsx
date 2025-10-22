"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

interface CreditInfo {
  balance: number;
  plan: string;
  monthlyAllocation: number;
  usedThisMonth: number;
  resetDate?: string;
}

export function CreditBalance() {
  const { data: session } = useSession();
  const [credits, setCredits] = useState<CreditInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchCredits();
    }
  }, [session]);

  async function fetchCredits() {
    try {
      const res = await fetch("/api/credits/balance");
      const data = await res.json();
      setCredits(data);
    } catch (error) {
      console.error("Failed to fetch credits:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !credits) {
    return <div className="animate-pulse h-20 bg-gray-200 rounded-lg" />;
  }

  const percentage = (credits.balance / credits.monthlyAllocation) * 100;
  const isLow = percentage < 20;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Credit Balance</h3>
        <span className="text-sm text-gray-500">{credits.plan} Plan</span>
      </div>

      {/* Balance Display */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between">
          <span className="text-4xl font-bold text-gray-900">
            {credits.balance}
          </span>
          <span className="text-sm text-gray-500">
            / {credits.monthlyAllocation} credits
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isLow ? "bg-red-500" : "bg-blue-500"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Usage Stats */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Used this month:</span>
          <span className="font-medium">{credits.usedThisMonth} credits</span>
        </div>

        {credits.resetDate && (
          <div className="flex justify-between">
            <span>Resets on:</span>
            <span className="font-medium">
              {new Date(credits.resetDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Low Balance Warning */}
      {isLow && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">
            ⚠️ You&apos;re running low on credits!
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <Link
          href="/pricing"
          className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Buy Credits
        </Link>
        <Link
          href="/dashboard/billing"
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
        >
          View Usage
        </Link>
      </div>
    </div>
  );
}
