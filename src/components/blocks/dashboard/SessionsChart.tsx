"use client"

import { ChevronDown } from "lucide-react"
import { Bar, BarChart } from "recharts"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Chart, ChartGrid, ChartXAxis, ChartYAxis } from "@/components/ui/Chart"

const sessions = [
  { day: "Mon", fresh: 24, returning: 18 },
  { day: "Tue", fresh: 36, returning: 22 },
  { day: "Wed", fresh: 25, returning: 26 },
  { day: "Thu", fresh: 42, returning: 24 },
  { day: "Fri", fresh: 42, returning: 30 },
  { day: "Sat", fresh: 22, returning: 16 },
  { day: "Sun", fresh: 18, returning: 12 },
]

const light = "color-mix(in oklch, var(--foreground) 22%, var(--background))"

const config = {
  fresh: { label: "New" },
  returning: { label: "Returning", color: light },
}

/** Stacked bars: new and returning visitors per day. */
export function SessionsChart() {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <CardTitle>Sessions by day</CardTitle>
          <CardDescription className="mt-1">
            New vs. returning visitors
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          This week
          <ChevronDown data-icon="inline-end" />
        </Button>
      </CardHeader>
      <CardContent>
        <Chart config={config} className="aspect-auto h-[200px]">
          <BarChart data={sessions} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <ChartGrid />
            <ChartXAxis dataKey="day" />
            <ChartYAxis width={28} tickFormatter={(value) => (value ? `${value}k` : "0")} />
            <Bar
              dataKey="returning"
              stackId="sessions"
              fill="var(--color-returning)"
              radius={[0, 0, 6, 6]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="fresh"
              stackId="sessions"
              fill="var(--color-fresh)"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </Chart>
      </CardContent>
      <CardFooter className="flex-wrap justify-between gap-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-foreground" />
            New
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full" style={{ background: light }} />
            Returning
          </span>
        </span>
        <span>Peak: Friday, 72k</span>
      </CardFooter>
    </Card>
  )
}
