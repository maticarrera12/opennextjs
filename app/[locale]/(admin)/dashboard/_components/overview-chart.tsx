"use client";

import { Card, Title, AreaChart } from "@tremor/react";

interface Props {
  data: {
    month: string;
    users: number;
  }[];
}

export default function OverviewChart({ data }: Props) {
  return (
    <Card className="p-6">
      <Title>New Users per Month</Title>
      <div className="h-80 mt-4">
        <AreaChart
          data={data}
          index="month"
          categories={["users"]}
          colors={["blue"]}
          yAxisWidth={50}
          curveType="natural"
        />
      </div>
    </Card>
  );
}
