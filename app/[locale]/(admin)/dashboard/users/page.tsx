import { prisma } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import UsersCharts from "../_components/user-charts";
import { chartColors, constructCategoryColors } from "@/lib/chartUtils";

export default async function UsersAnalyticsPage() {
  // --- Totales ---
  const totalUsers = await prisma.user.count();

  // --- Nuevos usuarios por mes ---
  const usersByMonth = await prisma.user.groupBy({
    by: ["createdAt"],
    _count: { id: true },
  });

  const chartData = usersByMonth.reduce<Record<string, number>>((acc, u) => {
    const month = u.createdAt.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + u._count.id;
    return acc;
  }, {});

  const lineData = Object.entries(chartData).map(([month, users]) => ({
    month,
    users,
  }));

  // --- Usuarios por plan ---
  const usersByPlan = await prisma.user.groupBy({
    by: ["plan"],
    _count: { plan: true },
  });

  const pieData = usersByPlan.map((p) => ({
    name: p.plan,
    value: p._count.plan,
  }));

  // Asignar colores a cada plan
  const planColors = constructCategoryColors(
    usersByPlan.map((p) => p.plan),
    ["blue", "emerald", "violet", "amber", "cyan", "pink"]
  );

  // --- Usuarios activos por país (mock hasta que tengas country) ---
  const barData = [
    { country: "Argentina", users: 45 },
    { country: "Spain", users: 30 },
    { country: "USA", users: 25 },
  ];

  // --- Retención simulada: usuarios con sesiones activas ---
  const returningUsers = await prisma.user.count({
    where: {
      sessions: { some: {} },
    },
  });
  const retentionRate = ((returningUsers / totalUsers) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Users Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Insights and analytics about user behavior and growth.
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-semibold text-foreground">{totalUsers}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Retention Rate</p>
          <p className="text-2xl font-semibold text-foreground">
            {retentionRate}%
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Plans</p>
          <p className="text-2xl font-semibold text-foreground">
            {usersByPlan.length}
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Top Country</p>
          <p className="text-2xl font-semibold text-foreground">Argentina 🇦🇷</p>
        </Card>
      </div>


      {/* Gráficos Tremor */}
      <UsersCharts lineData={lineData} pieData={pieData} barData={barData} />
    </div>
  );
}
