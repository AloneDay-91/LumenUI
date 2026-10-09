"use client"

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import { Area, AreaChart } from "recharts"

import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/Card"
import { Chart } from "@/components/ui/Chart"
import { Meter } from "@/components/ui/Meter"

const spark = [30, 34, 31, 38, 36, 42, 40, 45, 43, 49, 52, 55].map(
  (value, index) => ({ index, value }),
)

export function Delta({ value, up = true }: { value: string; up?: boolean }) {
  return (
    <Badge variant={up ? "success" : "destructive"}>
      {up ? <ArrowUpRight /> : <ArrowDownRight />}
      {value}
    </Badge>
  )
}

export function StatCard({
  label,
  value,
  delta = "12.4%",
  up = true,
  note = "vs. last month",
  icon: Icon = Wallet,
}: {
  label: string
  value: string
  delta?: string
  up?: boolean
  note?: string
  icon?: LucideIcon
}) {
  return (
    <Card size="sm">
      <CardHeader className="flex items-center gap-2">
        <CardDescription className="flex-1 text-xs font-medium">
          {label}
        </CardDescription>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        <div className="flex items-center gap-1.5">
          <Delta value={delta} up={up} />
          <span className="text-xs text-muted-foreground">{note}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatCardSparkline({
  label,
  value,
  delta = "8.1%",
  note = "Daily average, last 28 days",
}: {
  label: string
  value: string
  delta?: string
  note?: string
}) {
  return (
    <Card size="sm">
      <CardHeader className="flex items-center gap-2">
        <CardDescription className="flex-1 text-xs font-medium">
          {label}
        </CardDescription>
        <Delta value={delta} />
      </CardHeader>
      <CardContent className="flex items-end gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{note}</p>
        </div>
        <Chart
          config={{ value: { label: "Users" } }}
          className="aspect-auto h-10 w-28 shrink-0"
        >
          <AreaChart data={spark} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="stat-spark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={1.5}
              fill="url(#stat-spark)"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </Chart>
      </CardContent>
    </Card>
  )
}

export function StatCardGoal({
  label,
  value,
  goal = 72,
  note = "34 open deals",
  target = "Target €120k",
}: {
  label: string
  value: string
  goal?: number
  note?: string
  target?: string
}) {
  return (
    <Card size="sm">
      <CardHeader className="flex items-center gap-2">
        <CardDescription className="flex-1 text-xs font-medium">
          {label}
        </CardDescription>
        <Badge variant="outline">{goal}% of goal</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        <Meter value={goal} aria-label={`${label} goal`} />
        <div className="flex justify-between gap-3 text-xs text-muted-foreground">
          <span>{note}</span>
          <span className="tabular-nums">{target}</span>
        </div>
      </CardContent>
    </Card>
  )
}

/** Four KPIs in a row: delta, sparkline, a drop, and progress to a goal. */
export function StatCards() {
  return (
    <div className="@container">
      <div className="grid gap-4 @xl:grid-cols-2 @5xl:grid-cols-4">
        <StatCard label="Revenue" value="€48,290" />
        <StatCardSparkline label="Active users" value="12,834" />
        <StatCard
          label="Conversion"
          value="3.42%"
          delta="0.6 pts"
          up={false}
          icon={Activity}
        />
        <StatCardGoal label="Q4 pipeline" value="€86,400" />
      </div>
    </div>
  )
}
