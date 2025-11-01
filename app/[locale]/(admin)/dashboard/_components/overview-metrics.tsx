import { Card } from "@/components/ui/card";

interface Props {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalAssets: number;
  totalRevenue: number;
  activeSubscriptions: number;
  creditsUsed: number;
}

export default function OverviewMetrics({
  totalUsers,
  activeUsers,
  totalProjects,
  totalAssets,
  totalRevenue,
  activeSubscriptions,
  creditsUsed,
}: Props) {
  const metrics = [
    { label: "Total Users", value: totalUsers },
    { label: "Active Users", value: activeUsers },
    { label: "Total Projects", value: totalProjects },
    { label: "Total Assets", value: totalAssets },
    { label: "Revenue (USD)", value: `$${(totalRevenue / 100).toFixed(2)}` },
    { label: "Active Subscriptions", value: activeSubscriptions },
    { label: "Credits Used", value: creditsUsed },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {metrics.map((m) => (
        <Card key={m.label} className="p-6">
          <p className="text-sm text-muted-foreground">{m.label}</p>
          <p className="text-2xl font-semibold text-foreground">{m.value}</p>
        </Card>
      ))}
    </div>
  );
}
