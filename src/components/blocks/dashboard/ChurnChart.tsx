"use client"

import { ArrowDownRight } from "lucide-react"
import { Line, LineChart } from "recharts"

import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Chart, ChartGrid, ChartXAxis, ChartYAxis } from "@/components/ui/Chart"

const thisYear = [3.1, 2.8, 3.4, 3.0, 2.6, 2.9, 2.4, 2.2, 2.5, 2.1, 1.9, 2.0]
const lastYear = [4.0, 4.2, 3.9, 4.4, 4.1, 4.3, 4.0, 4.2, 3.8, 4.1, 3.9, 3.7]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const data = months.map((month, index) => ({
  month,
  y2026: thisYear[index],
  y2025: lastYear[index],
}))

const faded = "color-mix(in oklch, var(--foreground) 38%, var(--background))"

const config = {
  y2026: { label: "2026" },
  y2025: { label: "2025", color: faded },
}

/** Two lines, this year against last year. */
export function ChurnChart() {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <CardTitle>Churn rate</CardTitle>
          <CardDescription className="mt-1">Monthly, 2026 vs 2025</CardDescription>
        </div>
        <Badge variant="secondary">
          <ArrowDownRight />
          1.7 pts
        </Badge>
      </CardHeader>
      <CardContent>
        <Chart config={config} className="aspect-auto h-[200px]">
          <LineChart data={data} margin={{ top: 4, right: 6, left: 0, bottom: 0 }}>
            <ChartGrid />
            <ChartXAxis dataKey="month" interval={1} />
            <ChartYAxis
              width={40}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 5]}
              ticks={[0, 2.5, 5]}
            />
            <Line
              dataKey="y2025"
              stroke="var(--color-y2025)"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              dataKey="y2026"
              stroke="var(--color-y2026)"
              strokeWidth={1.5}
              dot={{ r: 2.5, fill: "var(--card)", strokeWidth: 1.5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </Chart>
      </CardContent>
      <CardFooter className="flex-wrap justify-between gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-foreground" />
            2026
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full" style={{ background: faded }} />
            2025
          </span>
        </span>
        <span>Lowest since launch</span>
      </CardFooter>
    </Card>
  )
}
