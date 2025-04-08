"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { IKeyVisits } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const getChartConfig = (data: IKeyVisits[], label: string) => {
  const chartConfig = {
    visits: {
      label,
    },
  } satisfies ChartConfig;

  return Object.assign(
    chartConfig,
    ...data.map((item, i) => {
      return {
        [item.key]: {
          label: item.key,
          color: `hsl(var(--chart-${i + 1}))`,
        },
      };
    })
  );
};

export default function TopChart({
  data,
  label,
}: {
  data: IKeyVisits[];
  label: string;
}) {
  const chartConfig = getChartConfig(data, label);

  const chartData = data.map((item, i) => {
    return {
      key: item.key,
      visits: item.visits,
      percent: item.percent,
      fill: `hsl(var(--chart-${i + 1}))`,
    };
  });

  const totalVisits = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visits, 0);
  }, []);

  return (
    <Card className="h-full md:gap-1 pb-0">
      <CardHeader className="items-center">
        <CardTitle>
          Top {chartData.length} {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col items-center justify-center ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-full md:max-h-[150px] w-full"
        >
          <PieChart className="w-full" accessibilityLayer>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="key"
                  labelKey="visits"
                />
              }
            />
            <Pie
              className=""
              data={chartData}
              dataKey="visits"
              nameKey="key"
              innerRadius={40}
              outerRadius={60}
            >
              {/* <LabelList
                dataKey="visits"
                className="fill-background"
                stroke="none"
                fontSize={10}
                formatter={(value: number) => `${value}`}
              /> */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisits.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Views
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={
                <ChartLegendContent
                  nameKey="key"
                  className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
