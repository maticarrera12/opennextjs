import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/auth";

export default async function UsersAnalyticsPage() {
  // Users Analytics
  const usersByPlan = await prisma.user.groupBy({
    by: ["plan"],
    _count: {
      id: true,
    },
  });
  const newUsersThisMonth = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(1)),
      },
    },
  });
  const newUsersThisWeek = await prisma.user.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });
  const verifiedUsers = await prisma.user.count({
    where: {
      emailVerified: true,
    },
  });
  const adminUsers = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Users Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Analytics and insights about your users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            New Users (This Month)
          </p>
          <p className="text-2xl font-semibold text-foreground">
            {newUsersThisMonth}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">New Users (This Week)</p>
          <p className="text-2xl font-semibold text-foreground">
            {newUsersThisWeek}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Verified Users</p>
          <p className="text-2xl font-semibold text-foreground">
            {verifiedUsers}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Admin Users</p>
          <p className="text-2xl font-semibold text-foreground">{adminUsers}</p>
        </Card>
        <Card className="p-6 md:col-span-2 lg:col-span-3">
          <p className="text-sm text-muted-foreground mb-3">Users by Plan</p>
          <div className="grid grid-cols-3 gap-4">
            {usersByPlan.map((plan) => (
              <div
                key={plan.plan}
                className="flex flex-col items-center rounded-md border border-border p-4"
              >
                <span className="text-xs text-muted-foreground">
                  {plan.plan}
                </span>
                <span className="mt-2 text-2xl font-semibold text-foreground">
                  {plan._count.id}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
