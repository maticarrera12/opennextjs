import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/auth";

export default async function ProductUsagePage() {
  // Product Usage
  const creditsUsed = await prisma.creditTransaction.aggregate({
    where: {
      type: "DEDUCTION",
    },
    _sum: {
      amount: true,
    },
  });
  const creditsRefunded = await prisma.creditTransaction.aggregate({
    where: {
      type: "REFUND",
    },
    _sum: {
      amount: true,
    },
  });
  const assetsByType = await prisma.brandAsset.groupBy({
    by: ["type"],
    _count: {
      id: true,
    },
  });
  const assetsThisMonth = await prisma.brandAsset.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(1)),
      },
    },
  });
  const assetsByStatus = await prisma.brandAsset.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });
  const totalProjects = await prisma.brandProject.count();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Product Usage (IA & Assets)
        </h1>
        <p className="text-sm text-muted-foreground">
          AI and assets usage statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Credits Used</p>
          <p className="text-2xl font-semibold text-foreground">
            {creditsUsed._sum.amount || 0}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Credits Refunded</p>
          <p className="text-2xl font-semibold text-foreground">
            {creditsRefunded._sum.amount || 0}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            Assets Generated (This Month)
          </p>
          <p className="text-2xl font-semibold text-foreground">
            {assetsThisMonth}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Projects</p>
          <p className="text-2xl font-semibold text-foreground">
            {totalProjects}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-3">Assets by Type</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {assetsByType.map((asset) => (
              <div
                key={asset.type}
                className="flex flex-col items-center rounded-md border border-border p-3"
              >
                <span className="text-xs text-muted-foreground">
                  {asset.type}
                </span>
                <span className="mt-1 text-lg font-semibold text-foreground">
                  {asset._count.id}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-3">Assets by Status</p>
          <div className="space-y-3">
            {assetsByStatus.map((status) => (
              <div
                key={status.status}
                className="flex justify-between text-sm text-foreground"
              >
                <span>{status.status}</span>
                <span className="font-medium">{status._count.id}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
