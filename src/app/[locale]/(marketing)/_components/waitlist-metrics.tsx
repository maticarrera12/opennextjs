"use client";

import { useEffect, useState } from "react";

import { BarChart } from "@/components/tremor/BarChart";

interface ChartDataPoint {
  date: string;
  count: number;
  total: number;
}

interface WaitlistMetricsData {
  totalUsers: number;
  chartData: ChartDataPoint[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

const formatNumber = (value: number) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

export const WaitlistMetrics = () => {
  const [data, setData] = useState<WaitlistMetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/waitlist/metrics");
        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }
        const metricsData = await response.json();
        setData(metricsData);
      } catch {
        setData({
          totalUsers: 0,
          chartData: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const totalUsers = data?.totalUsers || 0;
  const chartData = data?.chartData || [];

  // Transformar datos del API al formato que espera Tremor
  const tremorData = chartData.map(item => ({
    date: formatDate(item.date),
    "New users": item.count,
  }));

  const hasData = chartData.some(item => item.count > 0);

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 md:p-6 h-full w-full flex flex-col shadow-sm">
        <div className="mb-3">
          <span className="text-xs font-medium text-muted-foreground tracking-wide">
            <span className="inline-block w-24 h-4 bg-muted animate-pulse rounded" />
          </span>
        </div>
        <div className="relative w-full flex-1 min-h-0 bg-muted/30 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 h-full w-full flex flex-col shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <span className="text-xs font-medium text-muted-foreground tracking-wide">
          Join {formatNumber(totalUsers)} developers
        </span>
      </div>

      {/* Chart */}
      <div className="relative w-full flex-1 min-h-0">
        {hasData ? (
          <BarChart
            className="h-full"
            data={tremorData}
            index="date"
            categories={["New users"]}
            valueFormatter={(number: number) => formatNumber(Math.round(number))}
            yAxisWidth={40}
            startEndOnly={tremorData.length > 7}
            showLegend={false}
            showTooltip={true}
            colors={["violet"]}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <div className="text-xs mb-2">No data yet</div>
            <div className="w-full h-12 bg-muted/30 rounded relative overflow-hidden border border-border/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full bg-primary/20" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
