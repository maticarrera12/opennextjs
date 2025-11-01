"use client";

import { Card } from "@/components/ui/card";
import { Title, AreaChart, DonutChart, BarChart } from "@tremor/react";
import { chartColors } from "@/lib/chartUtils";

interface UsersChartsProps {
  lineData: { month: string; users: number }[];
  pieData: { name: string; value: number }[];
  barData: { country: string; users: number }[];
}

export default function UsersCharts({
  lineData,
  pieData,
  barData,
}: UsersChartsProps) {
  // ✅ definir funciones dentro del client component (no se serializan)
  const valueFormatter = (v: number) => `${v} users`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico 1: Crecimiento de usuarios */}
      <Card className="p-6">
        <Title>New Users per Month</Title>
        <div className="h-80 mt-4">
          <AreaChart
            data={lineData}
            index="month"
            categories={["users"]}
            colors={["blue"]}
            yAxisWidth={40}
            curveType="natural"
          />
        </div>
      </Card>

      {/* Gráfico 2: Distribución de planes */}
      <Card className="p-6">
        <Title>Users by Plan</Title>
        <div className="h-80 mt-4 flex justify-center">
          <DonutChart
            data={pieData}
            category="value"
            index="name"
            colors={["blue", "emerald", "violet"]}
            valueFormatter={valueFormatter}
            showLabel
          />
        </div>
        {/* Leyenda de colores */}
        <div className="mt-6 space-y-2">
          {pieData.map((item, index) => {
            const colors = [
              "blue",
              "emerald",
              "violet",
              "amber",
              "cyan",
              "pink",
            ];
            const color = colors[index % colors.length];
            const colorClass =
              chartColors[color as keyof typeof chartColors]?.bg ||
              "bg-gray-500";
            return (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${colorClass} shrink-0`}
                    aria-label={`Color for ${item.name} plan`}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Gráfico 3: Usuarios activos por país */}
      <Card className="p-6 lg:col-span-2">
        <Title>Active Users by Country</Title>
        <div className="h-80 mt-4">
          <BarChart
            data={barData}
            index="country"
            categories={["users"]}
            colors={["cyan"]}
            yAxisWidth={40}
          />
        </div>
      </Card>
    </div>
  );
}
