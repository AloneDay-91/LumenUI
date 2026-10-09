import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

type Stat = { label: string; value: string; change: string; down?: boolean }

const stats: Stat[] = [
  { label: "Total orders", value: "248", change: "+14%" },
  { label: "Paid", value: "€96,420", change: "+9.8%" },
  { label: "Pending", value: "€4,180", change: "12 orders" },
  { label: "Refunded", value: "€1,240", change: "−2.1%", down: true },
  { label: "Failed", value: "6", change: "+2", down: true },
]

/** One card split into columns. Sits above a table. */
export function StatStrip({ items = stats }: { items?: Stat[] }) {
  return (
    <div className="@container">
      <Card
        size="sm"
        className="grid grid-cols-2 gap-0 py-0 @2xl:flex @2xl:flex-row"
      >
        {items.map((item, index) => (
          <div
            key={item.label}
            className={cn(
              "min-w-0 flex-1 border-border px-5 py-4",
              index > 0 && "@2xl:border-l",
              index > 1 && "border-t @2xl:border-t-0",
              index % 2 === 1 && "border-l",
            )}
          >
            <p className="text-xs font-medium text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-1.5 flex items-baseline gap-2">
              <span className="text-xl font-semibold tracking-tight tabular-nums">
                {item.value}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  item.down ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {item.change}
              </span>
            </p>
          </div>
        ))}
      </Card>
    </div>
  )
}
