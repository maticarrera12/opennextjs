import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/auth";

export default async function AdminDashboardPage() {
  // Overview Data
  const totalUsers = await prisma.user.count();
  const activeUsers = await prisma.user.count({
    where: {
      sessions: {
        some: {
          expiresAt: {
            gt: new Date(),
          },
        },
      },
    },
  });
  const totalProjects = await prisma.brandProject.count();
  const totalAssets = await prisma.brandAsset.count();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-sm text-muted-foreground">
          General view of your application.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-semibold text-foreground">{totalUsers}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Users</p>
          <p className="text-2xl font-semibold text-foreground">
            {activeUsers}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Projects</p>
          <p className="text-2xl font-semibold text-foreground">
            {totalProjects}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Assets</p>
          <p className="text-2xl font-semibold text-foreground">
            {totalAssets}
          </p>
        </Card>
      </div>
    </div>
  );
}
