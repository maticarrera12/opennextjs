"use client";

import BetterAuthActionButton from "@/components/auth/better-auth-action-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function DangerZone() {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Irreversible actions that will affect your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-destructive">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <BetterAuthActionButton
            action={() => {
              return authClient.deleteUser({
                callbackURL: "/",
              });
            }}
              requireAreYouSure
              variant="destructive"
              successMessage="Account deletion initiated. Please check your email for a confirmation link."
            >Delete Account</BetterAuthActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
