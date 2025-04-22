"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";

const chartData = [
  { week: "Week 1", wishlists: 400 },
  { week: "Week 2", wishlists: 1200 },
  { week: "Week 3", wishlists: 2000 },
  { week: "Week 4", wishlists: 2800 },
  { week: "Week 5", wishlists: 3600 },
  { week: "Week 6", wishlists: 4400 },
  { week: "Week 7", wishlists: 5200 },
  { week: "Week 8", wishlists: 6000 },
];

const chartConfig: ChartConfig = {
  wishlists: {
    label: "Wishlists",
    color: "#00C4FF", // Blue color
  },
};

export function WishlistChart() {
  return (
    <Card className="flex-1 md:flex-1/2 w-full">
      <CardHeader>
        <CardTitle>Wishlist Growth</CardTitle>
        <CardDescription>From 400 to 6,000 in 8 Weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, left: 12, right: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} stroke="hsl(210, 20%, 90%)" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent labelFormatter={(label) => label} />
              }
            />
            <Line
              dataKey="wishlists"
              type="monotone"
              stroke="var(--color-wishlists)"
              strokeWidth={2}
              dot={{ fill: "var(--color-wishlists)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default WishlistChart;
