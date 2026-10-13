import { Check, CreditCard, Download } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item"
import { Meter } from "@/components/ui/Meter"
import { Separator } from "@/components/ui/Separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

import { SettingsSection } from "./SettingsSection"

const usage = [
  { label: "Seats", value: "3 / 5", percent: 60 },
  { label: "API requests", value: "812k / 1M", percent: 81 },
  { label: "Storage", value: "12.4 / 50 GB", percent: 25 },
]

const invoices = [
  { id: "INV-2026-010", date: "1 Oct 2026", amount: "€87.00" },
  { id: "INV-2026-009", date: "1 Sep 2026", amount: "€87.00" },
  { id: "INV-2026-008", date: "1 Aug 2026", amount: "€58.00" },
]

export function BillingSettings() {
  return (
    <SettingsSection
      title="Plan & billing"
      description="Manage your subscription, usage and payment method."
    >
      <Card>
        <CardHeader className="flex flex-wrap items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Pro</CardTitle>
              <Badge>Current plan</Badge>
            </div>
            <p className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">
                €29
              </span>
              <span className="text-xs text-muted-foreground">/ seat / month</span>
            </p>
            <CardDescription className="mt-1">
              Renews on 1 Nov 2026 · billed annually
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Compare plans
            </Button>
            <Button size="sm">Upgrade to Enterprise</Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-6 sm:grid-cols-3">
          {usage.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <p className="flex text-xs">
                <span className="flex-1 text-muted-foreground">{item.label}</span>
                <span className="font-medium tabular-nums">{item.value}</span>
              </p>
              <Meter value={item.percent} aria-label={item.label} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Item variant="muted" className="px-4">
            <ItemMedia variant="icon" className="bg-background">
              <CreditCard />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="text-xs">Visa ending in 4242</ItemTitle>
              <ItemDescription>Expires 08/28 · elouan@lumen.dev</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </ItemActions>
          </Item>
        </CardContent>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Download</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono">{invoice.id}</TableCell>
                  <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                  <TableCell>
                    <Badge variant="success">
                      <Check />
                      Paid
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {invoice.amount}
                  </TableCell>
                  <TableCell className="py-0 text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Download ${invoice.id}`}
                    >
                      <Download />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </SettingsSection>
  )
}
