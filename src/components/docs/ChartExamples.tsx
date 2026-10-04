"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart } from "recharts"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Preview } from "@/components/docs/Preview"
import {
  Chart,
  ChartGrid,
  ChartLegend,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
  chartColor,
} from "@/components/ui/Chart"

const readers = [
  { month: "Jan", readers: 420 },
  { month: "Feb", readers: 380 },
  { month: "Mar", readers: 510 },
  { month: "Apr", readers: 460 },
  { month: "May", readers: 590 },
  { month: "Jun", readers: 640 },
]

const exportsByDay = [
  { day: "Mon", files: 18 },
  { day: "Tue", files: 24 },
  { day: "Wed", files: 21 },
  { day: "Thu", files: 32 },
  { day: "Fri", files: 28 },
  { day: "Sat", files: 12 },
  { day: "Sun", files: 9 },
]

const themes = [
  { month: "Jan", light: 240, dark: 90 },
  { month: "Feb", light: 220, dark: 110 },
  { month: "Mar", light: 260, dark: 140 },
  { month: "Apr", light: 230, dark: 160 },
  { month: "May", light: 280, dark: 190 },
  { month: "Jun", light: 300, dark: 210 },
]

const typefaces = [
  { name: "inter", value: 58 },
  { name: "fraunces", value: 27 },
  { name: "mono", value: 15 },
]

export function ChartBarPreview() {
  return (
    <Chart config={{ readers: { label: "Readers" } }}>
      <BarChart data={readers} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <ChartGrid />
        <ChartXAxis dataKey="month" />
        <ChartYAxis hide />
        <ChartTooltip />
        <Bar dataKey="readers" fill={chartColor("readers")} radius={[6, 6, 0, 0]} maxBarSize={28} />
      </BarChart>
    </Chart>
  )
}

export function ChartExamples() {
  const gradientId = React.useId().replace(/:/g, "")

  return (
    <div className="flex flex-col gap-12">
      <section className="space-y-4">
        <h2 id="area">Area</h2>
        <p>A single ink stroke. The fill fades into the paper.</p>
        <Preview className="px-5 py-6">
          <Chart config={{ files: { label: "Files" } }}>
            <AreaChart data={exportsByDay} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor("files")} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={chartColor("files")} stopOpacity={0} />
                </linearGradient>
              </defs>
              <ChartGrid />
              <ChartXAxis dataKey="day" />
              <ChartYAxis hide />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="files"
                stroke={chartColor("files")}
                strokeWidth={1.5}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 3, fill: chartColor("files"), stroke: "var(--background)", strokeWidth: 2 }}
              />
            </AreaChart>
          </Chart>
        </Preview>
        <CodeBlock
          code={`<Area
  type="monotone"
  dataKey="files"
  stroke="var(--color-files)"
  strokeWidth={1.5}
  fill="url(#files)"
  dot={false}
/>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="line">Line</h2>
        <p>Further series step down the ink scale. Pass a color on the config to override a tone.</p>
        <Preview className="px-5 py-6">
          <Chart
            config={{
              light: { label: "Light" },
              dark: { label: "Dark" },
            }}
          >
            <LineChart data={themes} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <ChartGrid />
              <ChartXAxis dataKey="month" />
              <ChartYAxis hide />
              <ChartTooltip />
              <ChartLegend />
              <Line
                type="monotone"
                dataKey="light"
                stroke={chartColor("light")}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: chartColor("light"), stroke: "var(--background)", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="dark"
                stroke={chartColor("dark")}
                strokeWidth={1.5}
                dot={false}
                activeDot={{ r: 3, fill: chartColor("dark"), stroke: "var(--background)", strokeWidth: 2 }}
              />
            </LineChart>
          </Chart>
        </Preview>
        <CodeBlock
          code={`<Chart config={{ light: { label: "Light" }, dark: { label: "Dark" } }}>
  <LineChart data={themes}>
    <ChartGrid />
    <ChartXAxis dataKey="month" />
    <ChartTooltip />
    <ChartLegend />
    <Line dataKey="light" stroke="var(--color-light)" strokeWidth={1.5} dot={false} />
    <Line dataKey="dark" stroke="var(--color-dark)" strokeWidth={1.5} dot={false} />
  </LineChart>
</Chart>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="donut">Donut</h2>
        <p>Slices use the same tones. The gap is the page background, not a colored stroke.</p>
        <Preview className="px-5 py-6">
          <Chart
            className="mx-auto aspect-square max-w-72"
            config={{
              inter: { label: "Inter" },
              fraunces: { label: "Fraunces" },
              mono: { label: "JetBrains Mono" },
            }}
          >
            <PieChart>
              <ChartTooltip />
              <Pie
                data={typefaces}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="86%"
                stroke="var(--background)"
                strokeWidth={2}
                paddingAngle={2}
              >
                {typefaces.map((item) => (
                  <Cell key={item.name} fill={chartColor(item.name)} />
                ))}
              </Pie>
              <ChartLegend />
            </PieChart>
          </Chart>
        </Preview>
        <CodeBlock
          code={`<Pie data={typefaces} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="86%" stroke="var(--background)" strokeWidth={2}>
  {typefaces.map((item) => (
    <Cell key={item.name} fill={\`var(--color-\${item.name})\`} />
  ))}
</Pie>`}
        />
      </section>
    </div>
  )
}
