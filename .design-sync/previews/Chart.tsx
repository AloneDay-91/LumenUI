import { Chart, ChartGrid, ChartLegend, ChartTooltip, ChartXAxis, ChartYAxis, chartColor, Recharts } from "lumen-ui"

// Recharts primitives come from the bundle's own copy (window.LumenUI.Recharts) -
// a second copy can't see the Lumen wrappers' chart store.
const { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart } = Recharts

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

const margin = { top: 8, right: 8, left: 0, bottom: 0 }

export const BarReaders = () => (
  <div className="w-full max-w-2xl px-5 py-6">
    <Chart config={{ readers: { label: "Readers" } }}>
      <BarChart data={readers} margin={margin}>
        <ChartGrid />
        <ChartXAxis dataKey="month" />
        <ChartYAxis hide />
        <ChartTooltip />
        <Bar dataKey="readers" fill={chartColor("readers")} radius={[6, 6, 0, 0]} maxBarSize={28} />
      </BarChart>
    </Chart>
  </div>
)

export const AreaExports = () => (
  <div className="w-full max-w-2xl px-5 py-6">
    <Chart config={{ files: { label: "Files" } }}>
      <AreaChart data={exportsByDay} margin={margin}>
        <defs>
          <linearGradient id="ds-files-fill" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#ds-files-fill)"
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </Chart>
  </div>
)

export const LineThemes = () => (
  <div className="w-full max-w-2xl px-5 py-6">
    <Chart config={{ light: { label: "Light" }, dark: { label: "Dark" } }}>
      <LineChart data={themes} margin={margin}>
        <ChartGrid />
        <ChartXAxis dataKey="month" />
        <ChartYAxis hide />
        <ChartTooltip />
        <ChartLegend />
        <Line type="monotone" dataKey="light" stroke={chartColor("light")} strokeWidth={1.5} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="dark" stroke={chartColor("dark")} strokeWidth={1.5} dot={false} isAnimationActive={false} />
      </LineChart>
    </Chart>
  </div>
)

export const DonutTypefaces = () => (
  <div className="w-full px-5 py-6">
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
          isAnimationActive={false}
        >
          {typefaces.map((item) => (
            <Cell key={item.name} fill={chartColor(item.name)} />
          ))}
        </Pie>
        <ChartLegend />
      </PieChart>
    </Chart>
  </div>
)
