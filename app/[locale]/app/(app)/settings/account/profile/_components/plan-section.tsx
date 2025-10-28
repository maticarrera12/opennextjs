import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PlanSectionProps {
  plan: string;
}

export function PlanSection({ plan }: PlanSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>Manage your subscription and billing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="font-medium">Current Plan: {plan}</p>
            <p className="text-sm text-muted-foreground">
              {plan === "FREE"
                ? "Free tier with basic features"
                : `${plan} tier with all features`}
            </p>
          </div>
          <Button variant="outline">Manage Plan</Button>
        </div>
      </CardContent>
    </Card>
  );
}
