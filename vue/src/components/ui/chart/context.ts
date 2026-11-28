import { computed, inject, reactive, type ComputedRef, type InjectionKey } from "vue"

// Series step down from the primary toward the background, so charts follow the theme.
export const chartTones = [
  "var(--primary)",
  "color-mix(in oklch, var(--primary) 62%, var(--background))",
  "color-mix(in oklch, var(--primary) 38%, var(--background))",
  "color-mix(in oklch, var(--primary) 22%, var(--background))",
  "color-mix(in oklch, var(--primary) 12%, var(--background))",
]

export type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
  }
>

export type ChartTooltipPayload = {
  dataKey?: string
  name?: string
  value?: unknown
  color?: string
}

export type ChartLegendPayload = {
  dataKey?: string
  value?: string
  color?: string
}

export function chartColor(key: string) {
  return `var(--color-${key})`
}

export function chartVars(config: ChartConfig): Record<string, string> {
  const style: Record<string, string> = {}
  Object.entries(config).forEach(([key, item], index) => {
    style[`--color-${key}`] = item.color ?? chartTones[index % chartTones.length]
  })
  return style
}

export function formatChartValue(value: unknown) {
  if (typeof value === "number") {
    return value.toLocaleString("en-US")
  }
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(" – ")
  }
  return value == null ? "" : String(value)
}

export interface ChartContext {
  config: ComputedRef<ChartConfig>
  /** Set by ChartGrid, drawn by the axes: horizontal lines on the y axis, vertical on the x axis. */
  grid: { horizontal: boolean; vertical: boolean }
}

export const chartKey: InjectionKey<ChartContext> = Symbol("Chart")

export function useChart(): ChartContext {
  return inject(chartKey, {
    config: computed(() => ({})),
    grid: reactive({ horizontal: false, vertical: false }),
  })
}
