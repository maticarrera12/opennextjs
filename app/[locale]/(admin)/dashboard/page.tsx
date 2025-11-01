import { prisma } from "@/lib/auth";
import OverviewMetrics from "./_components/overview-metrics";
import OverviewChart from "./_components/overview-chart";
import { Card } from "@/components/ui/card";


export default async function AdminDashboardPage() {
  // --- Métricas ---
  const totalUsers = await prisma.user.count();

  const activeUsers = await prisma.user.count({
    where: {
      sessions: {
        some: {
          expiresAt: { gt: new Date() },
        },
      },
    },
  });

  const totalProjects = await prisma.brandProject.count();
  const totalAssets = await prisma.brandAsset.count();

  const totalRevenue = await prisma.purchase.aggregate({
    _sum: { amount: true },
    where: { status: "COMPLETED" },
  });

  const activeSubscriptions = await prisma.purchase.count({
    where: {
      type: "SUBSCRIPTION",
      status: "COMPLETED",
    },
  });

  const creditsUsed = await prisma.creditTransaction.aggregate({
    _sum: { amount: true },
    where: { type: "DEDUCTION" },
  });

  // --- Datos para el gráfico ---
  const usersByMonth = await prisma.user.groupBy({
    by: ["createdAt"],
    _count: { id: true },
  });

  // Simplificamos por mes
  const chartData = usersByMonth.reduce<Record<string, number>>((acc, u) => {
    const month = u.createdAt.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + u._count.id;
    return acc;
  }, {});

  const chartArray = Object.entries(chartData).map(([month, users]) => ({
    month,
    users,
  }));

  return (
    <div className="space-y-8 p-6">
      <Card>
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground">
          General view of your application.
        </p>
      </div>

      <OverviewMetrics
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        totalProjects={totalProjects}
        totalAssets={totalAssets}
        totalRevenue={totalRevenue._sum.amount ?? 0}
        activeSubscriptions={activeSubscriptions}
        creditsUsed={creditsUsed._sum.amount ?? 0}
      />

      <OverviewChart data={chartArray} />
    </Card>
    </div>
  );
}
