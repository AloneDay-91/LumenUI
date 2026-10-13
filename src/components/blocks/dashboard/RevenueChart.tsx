"use client"

import { ArrowUpRight } from "lucide-react"
import { Area, AreaChart } from "recharts"

import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  Chart,
  ChartGrid,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/Chart"
import { Tabs, TabsIndicator, TabsList, TabsTab } from "@/components/ui/Tabs"

const current = [18, 22, 20, 26, 24, 30, 28, 34, 31, 36, 40, 38, 44, 42, 47, 52, 49, 55, 58, 54, 61, 64, 60, 68, 72, 69, 76, 81]
const previous = [14, 15, 17, 16, 19, 18, 21, 22, 21, 24, 25, 24, 27, 28, 27, 30, 31, 30, 33, 34, 33, 36, 37, 36, 39, 40, 41, 42]

const data = current.map((value, index) => {
  const date = new Date(2026, 8, 12 + index)
  return {
    day: `${date.getDate()} ${date.getMonth() === 8 ? "Sep" : "Oct"}`,
    revenue: value * 1000,
    previous: previous[index] * 1000,
  }
})

const faded = "color-mix(in oklch, var(--foreground) 38%, var(--background))"

const config = {
  revenue: { label: "Revenue" },
  previous: { label: "Previous", color: faded },
}

const euros = (value: number) => (value ? `€${value / 1000}k` : "0")

function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      {items.map(([label, color]) => (
        <span key={label} className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full" style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  )
}

/** Area chart against the previous period, with a range switch. */
export function RevenueChart() {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <CardTitle>Revenue</CardTitle>
          <CardDescription className="mt-1">
            Gross volume, last 28 days
          </CardDescription>
        </div>
        <Tabs defaultValue="28d">
          <TabsList aria-label="Range">
            {["7d", "28d", "90d", "12m"].map((range) => (
              <TabsTab key={range} value={range}>
                {range}
              </TabsTab>
            ))}
            <TabsIndicator />
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex flex-wrap items-end gap-x-8 gap-y-3">
        <div>
          <p className="text-xs text-muted-foreground">This period</p>
          <p className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              €1.24M
            </span>
            <Badge variant="success">
              <ArrowUpRight />
              18.2%
            </Badge>
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Previous</p>
          <p className="text-3xl font-medium tracking-tight text-muted-foreground tabular-nums">
            €1.05M
          </p>
        </div>
        <div className="ms-auto">
          <Legend
            items={[
              ["Revenue", "var(--foreground)"],
              ["Previous period", faded],
            ]}
          />
        </div>
      </CardContent>
      <CardContent>
        <Chart config={config} className="aspect-auto h-[260px]">
          <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-revenue)" stopOpacity={0.14} />
                <stop offset="100%" stopColor="var(--color-revenue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <ChartGrid strokeDasharray="3 4" />
            <ChartXAxis dataKey="day" interval={3} />
            <ChartYAxis tickFormatter={euros} width={44} />
            <ChartTooltip defaultIndex={22} />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="var(--color-previous)"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              fill="transparent"
              dot={false}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={1.5}
              fill="url(#revenue-fill)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--background)",
                stroke: "var(--foreground)",
                strokeWidth: 1.5,
              }}
              isAnimationActive={false}
            />
          </AreaChart>
        </Chart>
      </CardContent>
    </Card>
  )
}
