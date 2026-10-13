import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item"

export function StatItem({
  label,
  value,
  delta,
  up = true,
  icon: Icon,
}: {
  label: string
  value: string
  delta: string
  up?: boolean
  icon: LucideIcon
}) {
  return (
    <Item
      variant="outline"
      className="rounded-[min(var(--radius-4xl),24px)] px-4 py-4"
    >
      <ItemMedia variant="icon" className="size-10">
        <Icon />
      </ItemMedia>
      <ItemContent>
        <ItemDescription>{label}</ItemDescription>
        <ItemTitle className="text-xl font-semibold tracking-tight tabular-nums">
          {value}
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <Badge variant={up ? "success" : "destructive"}>
          {up ? <ArrowUpRight /> : <ArrowDownRight />}
          {delta}
        </Badge>
      </ItemActions>
    </Item>
  )
}

/** Compact KPIs as Item rows: an icon, the figure and its trend. */
export function StatItems() {
  return (
    <div className="@container">
      <div className="grid gap-4 @2xl:grid-cols-3">
        <StatItem label="Customers" value="4,512" delta="6.2%" icon={Users} />
        <StatItem label="Orders" value="248" delta="14%" icon={ShoppingCart} />
        <StatItem
          label="API latency"
          value="84 ms"
          delta="11%"
          up={false}
          icon={Cpu}
        />
      </div>
    </div>
  )
}
