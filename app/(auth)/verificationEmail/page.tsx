"use client";
import React, { useEffect, useRef, useState } from "react";
import BetterAuthActionButton from "@/components/auth/BetterAuthActionButton";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

function EmailVerification({ email }: { email: string }) {
  const [timeToNextResend, setTimeToNextResend] = useState(5);
  const interval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    startEmailVerificationCountdown();
  }, []);

  function startEmailVerificationCountdown(time = 5) {
    setTimeToNextResend(time);

    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;

        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mt-2">
        We sent you a verification link. Please check your email and click the
        link to verify your account.
      </p>

      <BetterAuthActionButton
        variant="outline"
        className="w-full"
        successMessage="Verification email sent!"
        disabled={timeToNextResend > 0}
        action={() => {
          startEmailVerificationCountdown();
          return authClient.sendVerificationEmail({
            email,
            callbackURL: "/",
          });
        }}
      >
        {timeToNextResend > 0
          ? `Resend Email (${timeToNextResend})`
          : "Resend Email"}
      </BetterAuthActionButton>
    </div>
  );
}

export default function VerificationEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Check your email</h1>
      <EmailVerification email={email} />
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Once verified, you&apos;ll be automatically signed in.
        </p>
      </div>
    </div>
  );
}
