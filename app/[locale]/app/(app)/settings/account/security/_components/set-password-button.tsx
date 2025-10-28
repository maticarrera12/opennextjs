"use client";
import BetterAuthActionButton from "@/components/auth/better-auth-action-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function SetPasswordButton({ email }: { email: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Password</CardTitle>
        <CardDescription>
          We will send you an email to set a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BetterAuthActionButton
          action={async () => {
            const result = await authClient.requestPasswordReset({
              email,
              redirectTo: "/reset-password",
            });
            return { error: result.error };
          }}
          successMessage="Email sent"
          variant="outline"
        >
          Send set password Email
        </BetterAuthActionButton>
      </CardContent>
    </Card>
  );
}
