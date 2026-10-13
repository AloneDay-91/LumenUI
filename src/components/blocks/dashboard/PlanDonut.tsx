"use client"

import { MoreHorizontal } from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Chart } from "@/components/ui/Chart"

const tone = (amount: number) =>
  `color-mix(in oklch, var(--foreground) ${amount}%, var(--background))`

const plans = [
  { name: "enterprise", label: "Enterprise", value: 46, color: "var(--foreground)" },
  { name: "pro", label: "Pro", value: 28, color: tone(62) },
  { name: "team", label: "Team", value: 16, color: tone(38) },
  { name: "starter", label: "Starter", value: 10, color: tone(22) },
]

const config = Object.fromEntries(
  plans.map((plan) => [plan.name, { label: plan.label, color: plan.color }]),
)

/** Donut with the total in the middle and a two-column legend. Ink scale only. */
export function PlanDonut() {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <CardTitle>Revenue by plan</CardTitle>
          <CardDescription className="mt-1">Share of MRR, October</CardDescription>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="More">
          <MoreHorizontal />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        <div className="relative size-44">
          <Chart config={config} className="aspect-square size-44">
            <PieChart>
              <Pie
                data={plans}
                dataKey="value"
                nameKey="name"
                innerRadius="64%"
                outerRadius="96%"
                stroke="var(--card)"
                strokeWidth={3}
                isAnimationActive={false}
              >
                {plans.map((plan) => (
                  <Cell key={plan.name} fill={`var(--color-${plan.name})`} />
                ))}
              </Pie>
            </PieChart>
          </Chart>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-semibold tabular-nums">€84.6k</span>
            <span className="text-xs text-muted-foreground">MRR</span>
          </div>
        </div>
        <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-2.5">
          {plans.map((plan) => (
            <li key={plan.name} className="flex items-center gap-2 text-xs">
              <span
                className="size-2 rounded-full"
                style={{ background: plan.color }}
              />
              <span className="flex-1">{plan.label}</span>
              <span className="text-muted-foreground tabular-nums">
                {plan.value}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
