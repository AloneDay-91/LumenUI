"use client"

import {
  Check,
  Columns3,
  Download,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  X,
} from "lucide-react"
import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

export type OrderStatus = "Paid" | "Pending" | "Refunded" | "Failed"

type Order = {
  id: string
  name: string
  email: string
  status: OrderStatus
  amount: string
  date: string
  plan: string
}

const orders: Order[] = [
  { id: "#LM-3201", name: "Camille Moreau", email: "camille@atelier.fr", status: "Paid", amount: "€1,240.00", date: "9 Oct 2026", plan: "Pro · annual" },
  { id: "#LM-3200", name: "Noah Fischer", email: "noah@fischer.de", status: "Pending", amount: "€89.00", date: "9 Oct 2026", plan: "Starter" },
  { id: "#LM-3199", name: "Inès Benali", email: "ines@studio-b.co", status: "Paid", amount: "€3,600.00", date: "8 Oct 2026", plan: "Enterprise" },
  { id: "#LM-3198", name: "Lucas Martin", email: "lucas@north.io", status: "Refunded", amount: "€240.00", date: "8 Oct 2026", plan: "Team" },
  { id: "#LM-3197", name: "Sofia Rossi", email: "sofia@rossi.it", status: "Paid", amount: "€540.00", date: "7 Oct 2026", plan: "Pro" },
  { id: "#LM-3196", name: "Hugo Laurent", email: "hugo@laurent.dev", status: "Failed", amount: "€89.00", date: "7 Oct 2026", plan: "Starter" },
  { id: "#LM-3195", name: "Maya Chen", email: "maya@chen.app", status: "Paid", amount: "€1,980.00", date: "6 Oct 2026", plan: "Team · annual" },
  { id: "#LM-3194", name: "Arthur Dubois", email: "arthur@dubois.fr", status: "Pending", amount: "€320.00", date: "6 Oct 2026", plan: "Pro" },
  { id: "#LM-3193", name: "Léa Garnier", email: "lea@garnier.studio", status: "Paid", amount: "€89.00", date: "5 Oct 2026", plan: "Starter" },
  { id: "#LM-3192", name: "Oscar Nilsson", email: "oscar@nord.se", status: "Paid", amount: "€720.00", date: "5 Oct 2026", plan: "Pro" },
]

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")

export function StatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case "Paid":
      return (
        <Badge variant="success">
          <Check />
          Paid
        </Badge>
      )
    case "Pending":
      return (
        <Badge variant="outline">
          <span className="size-1.5 rounded-full bg-new" />
          Pending
        </Badge>
      )
    case "Refunded":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          <RotateCcw />
          Refunded
        </Badge>
      )
    case "Failed":
      return (
        <Badge variant="destructive">
          <X />
          Failed
        </Badge>
      )
    default: {
      const unreachable: never = status
      return unreachable
    }
  }
}

function Toolbar({ selected }: { selected: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <InputGroup className="w-full sm:w-64">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Filter orders…" aria-label="Filter orders" />
      </InputGroup>
      <Button variant="outline" size="sm" className="border-dashed">
        <Plus data-icon="inline-start" />
        Status
        <Separator orientation="vertical" className="mx-1 h-3.5 self-center" />
        <Badge variant="secondary">Paid</Badge>
        <Badge variant="secondary">Pending</Badge>
      </Button>
      <Button variant="outline" size="sm" className="border-dashed">
        <Plus data-icon="inline-start" />
        Plan
      </Button>
      <Button variant="ghost" size="sm">
        Reset
        <X data-icon="inline-end" />
      </Button>
      <div className="flex-1" />
      {selected > 0 ? (
        <>
          <span className="me-1 text-xs text-muted-foreground">
            {selected} selected
          </span>
          <Button variant="outline" size="sm">
            <Download data-icon="inline-start" />
            Export
          </Button>
        </>
      ) : null}
      <Button variant="outline" size="sm">
        <Columns3 data-icon="inline-start" />
        View
      </Button>
      <Button size="sm">
        <Plus data-icon="inline-start" />
        Add order
      </Button>
    </div>
  )
}

function Footer({ rows }: { rows: number }) {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span>
        Showing <span className="font-medium text-foreground">1–{rows}</span>{" "}
        of 248
      </span>
      <div className="flex-1" />
      <span className="hidden sm:inline">Rows per page</span>
      <Select
        defaultValue="10"
        items={[
          { value: "10", label: "10" },
          { value: "25", label: "25" },
          { value: "50", label: "50" },
        ]}
      >
        <SelectTrigger size="sm" className="w-16" aria-label="Rows per page">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>25</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

/** Orders with a filter toolbar, row selection, status badges and pagination. */
export function OrdersTable({
  rows = 10,
  title = true,
  toolbar = true,
  pagination = true,
  defaultSelected = ["#LM-3199", "#LM-3195"],
}: {
  rows?: number
  title?: boolean
  toolbar?: boolean
  pagination?: boolean
  defaultSelected?: string[]
}) {
  const visible = orders.slice(0, rows)
  const [selected, setSelected] = useState<string[]>(defaultSelected)
  const all = visible.length > 0 && visible.every((order) => selected.includes(order.id))

  function toggle(id: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, id] : current.filter((item) => item !== id),
    )
  }

  return (
    <Card className="min-w-0">
      {title ? (
        <CardHeader className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle>Recent orders</CardTitle>
            <CardDescription className="mt-1">248 orders this month</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </CardHeader>
      ) : null}
      {toolbar ? (
        <CardContent>
          <Toolbar selected={selected.length} />
        </CardContent>
      ) : null}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pe-0">
                <Checkbox
                  checked={all}
                  indeterminate={!all && selected.length > 0}
                  onCheckedChange={(checked) =>
                    setSelected(checked ? visible.map((order) => order.id) : [])
                  }
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((order) => {
              const checked = selected.includes(order.id)
              return (
                <TableRow
                  key={order.id}
                  data-state={checked ? "selected" : undefined}
                >
                  <TableCell className="pe-0">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) => toggle(order.id, value)}
                      aria-label={`Select ${order.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-7">
                        <AvatarFallback>{initials(order.name)}</AvatarFallback>
                      </Avatar>
                      <div className="leading-tight">
                        <p className="font-medium">{order.name}</p>
                        <p className="text-muted-foreground">{order.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.plan}</TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {order.amount}
                  </TableCell>
                  <TableCell className="py-0 text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${order.id}`}
                    >
                      <MoreHorizontal />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
      {pagination ? (
        <CardFooter>
          <Footer rows={rows} />
        </CardFooter>
      ) : null}
    </Card>
  )
}
