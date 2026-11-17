import { Progress } from "lumen-ui"

export const Default = () => <Progress className="w-56" value={42} aria-label="Upload" />

export const Values = () => (
  <div className="flex w-64 flex-col gap-4">
    {[
      { label: "Uploading assets", value: 12 },
      { label: "Building pages", value: 58 },
      { label: "Deploying", value: 100 },
    ].map((row) => (
      <div key={row.label} className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{row.label}</span>
          <span className="tabular-nums">{row.value}%</span>
        </div>
        <Progress value={row.value} aria-label={row.label} />
      </div>
    ))}
  </div>
)
