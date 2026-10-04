"use client"

import * as React from "react"
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"
import type { TooltipContentProps } from "recharts"
import type { LegendPayload } from "recharts/types/component/DefaultLegendContent"

import { cn } from "@/lib/utils"

const chartTones = [
  "var(--foreground)",
  "color-mix(in oklch, var(--foreground) 62%, var(--background))",
  "color-mix(in oklch, var(--foreground) 38%, var(--background))",
  "color-mix(in oklch, var(--foreground) 22%, var(--background))",
  "color-mix(in oklch, var(--foreground) 12%, var(--background))",
]

export type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
  }
>

const ChartContext = React.createContext<ChartConfig>({})

function useChartConfig() {
  return React.useContext(ChartContext)
}

export function chartColor(key: string) {
  return `var(--color-${key})`
}

function Chart({
  config,
  className,
  children,
}: {
  config: ChartConfig
  className?: string
  children: React.ReactElement<{
    width?: number
    height?: number
    responsive?: boolean
  }>
}) {
  const frame = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const node = frame.current
    if (!node) {
      return
    }

    const measure = () => {
      const rect = node.getBoundingClientRect()
      const width = Math.round(rect.width)
      const height = Math.round(rect.height)
      setSize((current) =>
        current.width === width && current.height === height ? current : { width, height }
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const chart = React.Children.only(children)

  return (
    <ChartContext.Provider value={config}>
      <div
        ref={frame}
        data-slot="chart"
        className={cn(
          "aspect-video w-full min-w-0 text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:stroke-transparent [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          className
        )}
        style={chartVars(config)}
      >
        {size.width > 0 && size.height > 0
          ? React.cloneElement(chart, {
              width: size.width,
              height: size.height,
              responsive: false,
            })
          : null}
      </div>
    </ChartContext.Provider>
  )
}

function ChartTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return (
    <Tooltip
      wrapperStyle={{ outline: "none", zIndex: 30 }}
      content={<ChartTooltipContent />}
      {...props}
    />
  )
}

function ChartTooltipContent({
  active,
  payload,
  label,
}: Partial<Pick<TooltipContentProps, "active" | "payload" | "label">>) {
  const config = useChartConfig()
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="grid min-w-32 gap-1.5 rounded-2xl bg-popover px-2.5 py-2 text-xs text-popover-foreground ring-1 ring-foreground/5">
      {label != null && label !== "" ? (
        <div className="text-muted-foreground">{label}</div>
      ) : null}
      <div className="grid gap-1">
        {payload.map((item) => {
          const key = String(item.dataKey ?? item.name ?? "")
          const name = String(item.name ?? "")
          const itemConfig = config[key] ?? config[name]
          const color = item.color ?? item.fill ?? itemConfig?.color

          return (
            <div key={`${key}-${name}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: color }}
                />
                {itemConfig?.label ?? name}
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {formatChartValue(item.value)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChartLegend(props: React.ComponentProps<typeof Legend>) {
  return (
    <Legend
      verticalAlign="bottom"
      align="left"
      content={<ChartLegendContent />}
      {...props}
    />
  )
}

function ChartLegendContent({ payload }: { payload?: ReadonlyArray<LegendPayload> }) {
  const config = useChartConfig()
  if (!payload?.length) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-3">
      {payload.map((entry) => {
        const key = String(entry.dataKey ?? entry.value ?? "")
        const name = String(entry.value ?? "")
        const itemConfig = config[key] ?? config[name]

        return (
          <span
            key={`${key}-${name}`}
            className="inline-flex items-center gap-1.5 text-muted-foreground"
          >
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ background: entry.color }}
            />
            {itemConfig?.label ?? name}
          </span>
        )
      })}
    </div>
  )
}

function ChartGrid(props: React.ComponentProps<typeof CartesianGrid>) {
  return <CartesianGrid vertical={false} stroke="var(--border)" {...props} />
}

function ChartXAxis(props: React.ComponentProps<typeof XAxis>) {
  return (
    <XAxis
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
      {...props}
    />
  )
}

function ChartYAxis(props: React.ComponentProps<typeof YAxis>) {
  return (
    <YAxis
      tickLine={false}
      axisLine={false}
      width={36}
      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
      {...props}
    />
  )
}

function chartVars(config: ChartConfig): React.CSSProperties {
  const style: Record<string, string> = {}
  Object.entries(config).forEach(([key, item], index) => {
    style[`--color-${key}`] = item.color ?? chartTones[index % chartTones.length]
  })
  return style
}

function formatChartValue(value: unknown) {
  if (typeof value === "number") {
    return value.toLocaleString("en-US")
  }
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(" – ")
  }
  return value == null ? "" : String(value)
}

export {
  Chart,
  ChartGrid,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
}
