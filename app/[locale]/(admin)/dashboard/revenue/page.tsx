import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/auth";

export default async function RevenueBillingPage() {
  // Revenue & Billing
  const totalRevenue = await prisma.purchase.aggregate({
    where: {
      status: "COMPLETED",
    },
    _sum: {
      amount: true,
    },
  });
  const revenueThisMonth = await prisma.purchase.aggregate({
    where: {
      status: "COMPLETED",
      createdAt: {
        gte: new Date(new Date().setDate(1)),
      },
    },
    _sum: {
      amount: true,
    },
  });
  const subscriptions = await prisma.user.count({
    where: {
      plan: {
        not: "FREE",
      },
      planStatus: "ACTIVE",
    },
  });
  const purchasesThisMonth = await prisma.purchase.count({
    where: {
      status: "COMPLETED",
      createdAt: {
        gte: new Date(new Date().setDate(1)),
      },
    },
  });
  const purchasesByProvider = await prisma.purchase.groupBy({
    by: ["provider"],
    where: {
      status: "COMPLETED",
    },
    _sum: {
      amount: true,
    },
    _count: {
      id: true,
    },
  });
  const purchasesByType = await prisma.purchase.groupBy({
    by: ["type"],
    where: {
      status: "COMPLETED",
    },
    _count: {
      id: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Revenue & Billing
        </h1>
        <p className="text-sm text-muted-foreground">
          Revenue analytics and billing information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-semibold text-foreground">
            ${((totalRevenue._sum.amount || 0) / 100).toFixed(2)}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Revenue (This Month)</p>
          <p className="text-2xl font-semibold text-foreground">
            ${((revenueThisMonth._sum.amount || 0) / 100).toFixed(2)}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Active Subscriptions</p>
          <p className="text-2xl font-semibold text-foreground">
            {subscriptions}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            Purchases (This Month)
          </p>
          <p className="text-2xl font-semibold text-foreground">
            {purchasesThisMonth}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-3">
            Revenue by Provider
          </p>
          <div className="space-y-3">
            {purchasesByProvider.map((provider) => (
              <div
                key={provider.provider}
                className="flex justify-between text-sm text-foreground"
              >
                <span>{provider.provider}</span>
                <div className="text-right">
                  <p className="font-medium">
                    ${((provider._sum.amount || 0) / 100).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {provider._count.id} purchases
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-3">
            Purchases by Type
          </p>
          <div className="space-y-3">
            {purchasesByType.map((type) => (
              <div
                key={type.type}
                className="flex justify-between text-sm text-foreground"
              >
                <span>{type.type}</span>
                <span className="font-medium">{type._count.id}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
