"use client"

import { useState, type ReactNode } from "react"
import {
  ArrowRight,
  AudioLines,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  Camera,
  Car,
  ChartPie,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  CirclePlus,
  Cloud,
  Coffee,
  CreditCard,
  FileText,
  Gauge,
  Globe,
  Image,
  LayoutDashboard,
  Lock,
  LockKeyhole,
  MessageSquare,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Repeat,
  Search,
  Shield,
  ShoppingCart,
  Sun,
  Target,
  Thermometer,
  Timer,
  TrendingUp,
  Tv,
  User,
  Volume2,
  Wallet,
  X,
} from "lucide-react"

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { Badge } from "@/components/ui/Badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
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
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/Empty"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/Field"
import { Input } from "@/components/ui/Input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/InputGroup"
import { Label } from "@/components/ui/Label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import { Skeleton } from "@/components/ui/Skeleton"
import { Slider } from "@/components/ui/Slider"
import { Spinner } from "@/components/ui/Spinner"
import { Switch } from "@/components/ui/Switch"
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsPanels, TabsTab } from "@/components/ui/Tabs"
import { Textarea } from "@/components/ui/Textarea"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { cn } from "@/lib/utils"

function Tile({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4 break-inside-avoid", className)}>{children}</div>
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-2xl bg-muted p-3", className)}>
      {children}
    </div>
  )
}

function Bars({
  values,
  labels,
  className,
}: {
  values: number[]
  labels?: string[]
  className?: string
}) {
  const max = Math.max(...values)
  return (
    <div className={cn("flex h-40 items-end gap-2", className)}>
      {values.map((value, index) => (
        <div key={index} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-1.5">
          <div
            className="w-full rounded-t-md bg-foreground/80"
            style={{ height: `${Math.max(8, (value / max) * 100)}%` }}
          />
          {labels ? (
            <span className="text-center text-[10px] text-muted-foreground">{labels[index]}</span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values)
  return (
    <div className="hidden h-8 w-24 items-end gap-1 md:flex">
      {values.map((value, index) => (
        <div
          key={index}
          className="flex-1 rounded-t-sm bg-foreground/70"
          style={{ height: `${Math.max(12, (value / max) * 100)}%` }}
        />
      ))}
    </div>
  )
}

function Meter({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 overflow-hidden rounded-full bg-foreground/10"
    >
      <div className="h-full rounded-full bg-foreground" style={{ width: `${value}%` }} />
    </div>
  )
}

function CloseButton() {
  return (
    <Button variant="ghost" size="icon-sm" className="bg-muted" aria-label="Close">
      <X />
    </Button>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={cn("text-sm text-muted-foreground", strong && "font-medium text-foreground")}>
        {label}
      </span>
      <span className={cn("text-sm tabular-nums", strong ? "font-semibold" : "font-medium")}>{value}</span>
    </div>
  )
}

const QR_ROWS = [
  "1110111",
  "1001101",
  "1010101",
  "1111111",
  "0001000",
  "1101011",
  "1011101",
]

function ContributionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution History</CardTitle>
        <CardDescription>Last 6 months of activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Bars
          values={[120, 165, 135, 195, 112, 210]}
          labels={["Dec", "Jan", "Feb", "Mar", "Apr", "May"]}
        />
      </CardContent>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Panel>
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Upcoming</p>
            <span className="font-heading text-lg font-semibold">May 25, 2026</span>
            <span className="text-sm text-muted-foreground">$1,000 scheduled</span>
          </Panel>
          <Panel>
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Auto-Save Plan</p>
            <span className="font-heading text-lg font-semibold">Accelerated</span>
            <span className="text-sm text-muted-foreground">Recurring weekly</span>
          </Panel>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Full Report</Button>
      </CardFooter>
    </Card>
  )
}

function DistributeCard() {
  return (
    <Card>
      <CardContent>
        <Empty className="border-0 bg-transparent px-2 py-8">
          <EmptyMedia>
            <Plus />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Distribute Track</EmptyTitle>
            <EmptyDescription>
              Upload your first master to start reaching listeners on Spotify, Apple Music, and more.
            </EmptyDescription>
          </EmptyHeader>
          <Button>Create Release</Button>
        </Empty>
      </CardContent>
    </Card>
  )
}

function QrCard() {
  return (
    <Card>
      <CardContent className="flex justify-center pt-1">
        <div className="rounded-2xl border border-border bg-foreground p-3">
          <div className="grid grid-cols-7 gap-0.5">
            {QR_ROWS.join("").split("").map((cell, index) => (
              <span
                key={index}
                className={cn("size-3 rounded-xs", cell === "1" ? "bg-background" : "bg-transparent")}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardHeader className="text-center">
        <CardTitle>Scan to connect your mobile device</CardTitle>
        <CardDescription>Open the Ledger mobile app and scan this code to link your device.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          Got it
        </Button>
      </CardFooter>
    </Card>
  )
}

const HOLDINGS = [
  { name: "Vanguard VIG", shares: "450 Shares", amount: "$1,842.10", bars: [42, 48, 40, 80] },
  { name: "S&P 500 VOO", shares: "112 Shares", amount: "$928.40", bars: [50, 62, 90, 58] },
  { name: "Apple AAPL", shares: "85 Shares", amount: "$340.00", bars: [48, 56, 90, 70] },
  { name: "Realty Income", shares: "320 Shares", amount: "$1,139.50", bars: [60, 68, 74, 90] },
] as const

function DividendCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Q2 Dividend Income</CardTitle>
          <CardDescription>Quarterly dividend payouts across your portfolio holdings.</CardDescription>
        </div>
        <CloseButton />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {HOLDINGS.map((holding) => (
          <Panel key={holding.name} className="flex-row items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{holding.name}</p>
              <p className="text-xs text-muted-foreground">{holding.shares}</p>
            </div>
            <MiniBars values={[...holding.bars]} />
            <span className="hidden text-sm font-semibold tabular-nums md:block">{holding.amount}</span>
          </Panel>
        ))}
      </CardContent>
    </Card>
  )
}

function AveragingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dollar-Cost Averaging</CardTitle>
        <CardDescription>A strategy for building wealth over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <a href="#averaging" className="text-foreground underline underline-offset-4">
            Over time
          </a>
          , this smooths out the average cost of your investments. When prices drop, your fixed amount buys more
          shares. When prices rise, you buy fewer. The result is a lower average cost per share compared to lump-sum
          investing during volatile periods.
        </p>
      </CardContent>
    </Card>
  )
}

function SyncingCard() {
  return (
    <Card>
      <CardContent>
        <Empty className="border-0 bg-transparent px-2 py-8">
          <EmptyMedia>
            <Spinner className="size-4" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Syncing your accounts</EmptyTitle>
            <EmptyDescription>
              We&apos;re pulling in your latest transactions. This usually takes a few seconds.
            </EmptyDescription>
          </EmptyHeader>
          <Button variant="outline">Cancel</Button>
        </Empty>
      </CardContent>
    </Card>
  )
}

function PayoutCard() {
  const [amount, setAmount] = useState(2500)
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Payout Threshold</CardTitle>
          <CardDescription>Set the minimum balance required before a payout is triggered.</CardDescription>
        </div>
        <CloseButton />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Preferred Currency</FieldLabel>
          <Select defaultValue="usd">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD — United States Dollar</SelectItem>
              <SelectItem value="eur">EUR — Euro</SelectItem>
              <SelectItem value="gbp">GBP — British Pound</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <div className="flex items-baseline justify-between">
            <FieldLabel>Minimum Payout Amount</FieldLabel>
            <span className="text-2xl font-semibold tabular-nums">
              ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <Slider
            aria-label="Payout threshold"
            min={50}
            max={10000}
            step={50}
            value={amount}
            onValueChange={(next) => {
              const value = Array.isArray(next) ? next[0] : next
              if (typeof value === "number") setAmount(value)
            }}
          />
          <div className="flex justify-between">
            <FieldDescription>$50 (MIN)</FieldDescription>
            <FieldDescription>$10,000 (MAX)</FieldDescription>
          </div>
        </Field>
        <Field>
          <FieldLabel>Notes</FieldLabel>
          <Textarea aria-label="Payout notes" placeholder="Add any notes for this payout configuration..." className="min-h-24" />
        </Field>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Threshold</Button>
      </CardFooter>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Claimable Balance</CardDescription>
        <CardTitle className="text-5xl tabular-nums">$0.00</CardTitle>
        <Badge variant="outline" className="mt-1">
          <span className="size-2 rounded-full bg-foreground/40" />
          Pending Setup
        </Badge>
      </CardHeader>
      <CardContent>
        <Panel className="gap-3">
          <Row label="Net Royalties" value="$0.00" />
          <Row label="Processing Fee" value="-$0.00" />
          <Separator />
          <Row label="Total Ready to Claim" value="$0.00 USD" strong />
        </Panel>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Once your bank is connected, balances over $10.00 are automatically eligible for monthly distribution on the
          15th of each month.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

function PreferencesCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage your account settings and notifications.</CardDescription>
        </div>
        <CloseButton />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Default Currency</FieldLabel>
          <Select defaultValue="usd">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD — United States Dollar</SelectItem>
              <SelectItem value="eur">EUR — Euro</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Separator />
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Public Statistics</p>
            <p className="text-xs text-muted-foreground">
              Allow others to see your total stream count and listening activity
            </p>
          </div>
          <Switch defaultChecked aria-label="Public statistics" />
        </div>
        <Separator />
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Email Notifications</p>
            <p className="text-xs text-muted-foreground">Monthly royalty reports and distribution updates</p>
          </div>
          <Switch defaultChecked aria-label="Email notifications" />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Reset</Button>
        <Button className="ml-auto">Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

function SavingsRingCard() {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const saved = 0.8
  return (
    <Card>
      <CardContent className="flex justify-center">
        <div className="relative size-52">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" className="stroke-muted" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              className="stroke-foreground"
              strokeWidth="12"
              strokeDasharray={`${circumference * saved} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold tabular-nums">$24,000</span>
            <span className="text-xs text-muted-foreground">80% of $30,000</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-0">
        <Row label="Projected Finish" value="October 2026" strong />
        <Separator className="my-3" />
        <Row label="Monthly Average" value="$1,250" strong />
        <Separator className="my-3" />
        <Row label="Top Contributor" value="Auto-Transfer" strong />
      </CardFooter>
    </Card>
  )
}

function KitchenCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Kitchen Island</CardTitle>
          <CardDescription>Hue Color Ambient</CardDescription>
        </div>
        <Switch defaultChecked aria-label="Kitchen island power" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ToggleGroup defaultValue={["cooking"]} aria-label="Scenes" className="flex-wrap">
          <Toggle value="cooking">Cooking</Toggle>
          <Toggle value="dining">Dining</Toggle>
          <Toggle value="night">Nightlight</Toggle>
          <Toggle value="focus">Focus</Toggle>
        </ToggleGroup>
        {(
          [
            ["Brightness", Sun, 90],
            ["Color Temp", Thermometer, 70],
            ["Volume", Volume2, 30],
            ["Fade", Timer, 0],
          ] as const
        ).map(([label, Icon, value]) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-border px-3 py-2">
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="w-20 shrink-0 text-sm">{label}</span>
            <Slider defaultValue={value} className="flex-1" aria-label={label} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function TargetsCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Savings Targets</CardTitle>
          <CardDescription>Active milestones for 2026</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          New Goal
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Panel className="gap-3">
          <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Retirement</p>
          <span className="text-3xl font-semibold tabular-nums">$420,000</span>
          <Meter value={65} label="Retirement" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">65% achieved</span>
            <span className="font-medium tabular-nums">$273,000</span>
          </div>
        </Panel>
        <Panel className="gap-3">
          <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Real Estate</p>
          <span className="text-3xl font-semibold tabular-nums">$85,000</span>
          <Meter value={32} label="Real Estate" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">32% achieved</span>
            <span className="font-medium tabular-nums">$27,200</span>
          </div>
        </Panel>
      </CardContent>
      <CardFooter>
        <CardDescription className="w-full text-center">You have not met your targets for this year.</CardDescription>
      </CardFooter>
    </Card>
  )
}

function InvestCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy Investment</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Amount to Invest</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput defaultValue="1,000.00" aria-label="Amount to invest" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel>Order Type</FieldLabel>
          <Select defaultValue="market">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">Market Order</SelectItem>
              <SelectItem value="limit">Limit Order</SelectItem>
              <SelectItem value="stop">Stop Order</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Market orders execute at the current price.</FieldDescription>
        </Field>
        <Row label="Estimated Shares" value="1.95" strong />
        <Row label="Buying Power" value="$12,450.00" strong />
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button className="w-full">Review Order</Button>
        <CardDescription className="text-center">
          Trades are typically executed within minutes during market hours.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

const TRANSACTIONS = [
  { icon: Coffee, name: "Blue Bottle Coffee", category: "Food & Drink", when: "Today, 10:24 AM", amount: "-$6.50", positive: false },
  { icon: ShoppingCart, name: "Whole Foods Market", category: "Groceries", when: "Yesterday", amount: "-$142.30", positive: false },
  { icon: Wallet, name: "Stripe Payout", category: "Income", when: "Oct 12", amount: "+$4,200.00", positive: true },
  { icon: Car, name: "Uber Technologies", category: "Transport", when: "Oct 11", amount: "-$24.10", positive: false },
  { icon: Tv, name: "Netflix Subscription", category: "Entertainment", when: "Oct 10", amount: "-$19.99", positive: false },
] as const

function TransactionsCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest account activity.</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {TRANSACTIONS.map((row) => (
          <div key={row.name} className="flex items-center gap-3 py-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted">
              <row.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{row.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {row.category}
                <span className="hidden sm:inline"> · {row.when}</span>
              </p>
            </div>
            <span className={cn("text-sm font-semibold tabular-nums", row.positive && "text-foreground")}>
              {row.amount}
            </span>
            <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${row.name}`}>
              <MoreHorizontal />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function NavGroup({
  label,
  items,
}: {
  label: string
  items: { name: string; icon: typeof LayoutDashboard; active?: boolean }[]
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      {items.map((item) => (
        <button
          key={item.name}
          type="button"
          data-active={item.active ? "" : undefined}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-left text-sm hover:bg-muted data-active:bg-secondary data-active:font-medium"
        >
          <item.icon className="size-4 shrink-0" />
          <span className="truncate">{item.name}</span>
        </button>
      ))}
    </div>
  )
}

function OverviewNavCard() {
  return (
    <Card size="sm" className="py-3">
      <CardContent className="flex flex-col gap-2">
        <NavGroup
          label="Overview"
          items={[
            { name: "Dashboard", icon: LayoutDashboard, active: true },
            { name: "Transactions", icon: ArrowRight },
            { name: "Investments", icon: TrendingUp },
            { name: "Accounts", icon: Building2 },
            { name: "Spending", icon: ChartPie },
          ]}
        />
        <Separator />
        <NavGroup
          label="Planning"
          items={[
            { name: "Goals", icon: Target },
            { name: "Budget", icon: Wallet },
            { name: "Reports", icon: FileText },
            { name: "Documents", icon: FileText },
          ]}
        />
      </CardContent>
    </Card>
  )
}

function AccountNavCard() {
  return (
    <Card size="sm" className="py-3">
      <CardContent className="flex flex-col gap-2">
        <NavGroup
          label="Account"
          items={[
            { name: "Profile", icon: User },
            { name: "Billing", icon: CreditCard, active: true },
            { name: "Notifications", icon: Bell },
            { name: "Security", icon: Shield },
            { name: "Appearance", icon: Sun },
          ]}
        />
        <Separator />
        <NavGroup
          label="Support"
          items={[
            { name: "Help Center", icon: CircleHelp },
            { name: "Contact Us", icon: MessageSquare },
            { name: "Documentation", icon: BookOpen },
            { name: "Status", icon: TrendingUp },
          ]}
        />
      </CardContent>
    </Card>
  )
}

function FaqCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <Tabs defaultValue="general">
          <TabsList className="w-full">
            <TabsTab value="general" className="flex-1">
              General
            </TabsTab>
            <TabsTab value="billing" className="flex-1">
              Billing
            </TabsTab>
            <TabsTab value="goals" className="flex-1">
              Goals
            </TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanels>
            <TabsPanel value="general">
              <Accordion defaultValue={["security"]}>
                <AccordionItem value="security">
                  <AccordionTrigger>How secure is my financial data with Ledger?</AccordionTrigger>
                  <AccordionPanel>
                    We use bank-level AES-256 encryption, SOC 2 Type II certified infrastructure, and never store your
                    credentials. All connections use read-only access tokens.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="connect">
                  <AccordionTrigger>How do I connect my bank or investment accounts?</AccordionTrigger>
                  <AccordionPanel>
                    Open Settings, choose Connected accounts, and follow the read-only link flow for your institution.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="export">
                  <AccordionTrigger>Can I export my data for tax purposes?</AccordionTrigger>
                  <AccordionPanel>Yes. Reports can be exported as CSV from the Documents section.</AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabsPanel>
            <TabsPanel value="billing">
              <p className="py-3 text-sm text-muted-foreground">Invoices, payout methods, and tax forms live here.</p>
            </TabsPanel>
            <TabsPanel value="goals">
              <p className="py-3 text-sm text-muted-foreground">Milestones update as contributions land.</p>
            </TabsPanel>
          </TabsPanels>
        </Tabs>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          Contact Support
        </Button>
        <Button variant="ghost" className="flex-1">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  )
}

const PAYMENTS = [
  { icon: Gauge, title: "Change transfer limit", detail: "Adjust how much you can send from your balance." },
  { icon: Calendar, title: "Scheduled transfers", detail: "Set up a transfer to send at a later date." },
  { icon: Repeat, title: "Direct Debits", detail: "Set up and manage regular payments." },
  { icon: RefreshCw, title: "Recurring card payments", detail: "Manage your repeated card transactions." },
] as const

function PaymentsCard() {
  return (
    <Card>
      <CardHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {PAYMENTS.map((item) => (
          <a key={item.title} href={`#${item.title}`} className="flex items-center gap-3 rounded-2xl bg-muted p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-background">
              <item.icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </a>
        ))}
      </CardContent>
    </Card>
  )
}

function DoorCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Front Door</CardTitle>
          <CardDescription>Smart Lock Pro</CardDescription>
        </div>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          Locked
          <Lock className="size-4" />
        </span>
      </CardHeader>
      <CardContent>
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-muted bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)]">
          <Badge variant="destructive" className="absolute top-2 right-2">
            Live
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

const TICKERS = [
  { symbol: "VOO", name: "Vanguard S&P 500 ETF", meta: "112 Shares · Jan 2021", kind: "ETF", value: "$48,230.40" },
  { symbol: "VIG", name: "Vanguard Dividend Appreciation", meta: "450 Shares · Mar 2022", kind: "ETF", value: "$26,033.79" },
  { symbol: "AAPL", name: "Apple Inc.", meta: "85 Shares · Nov 2020", kind: "Stock", value: "$18,488.90" },
  { symbol: "O", name: "Realty Income Corp", meta: "320 Shares · Jun 2023", kind: "REIT", value: "$15,136.59" },
] as const

function HoldingsCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <InputGroup className="max-w-sm">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search holdings or tickers..." aria-label="Search holdings" />
          </InputGroup>
          <ToggleGroup defaultValue={["etfs"]} aria-label="Asset class">
            <Toggle value="stocks">Stocks</Toggle>
            <Toggle value="etfs">ETFs</Toggle>
            <Toggle value="reits">REITs</Toggle>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {TICKERS.map((ticker) => (
          <Panel key={ticker.symbol} className="flex-row items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-xs font-semibold">
              {ticker.symbol}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{ticker.name}</p>
              <p className="text-[10px] tracking-wider text-muted-foreground uppercase">{ticker.meta}</p>
            </div>
            <Badge variant="outline">{ticker.kind}</Badge>
            <div className="hidden text-right sm:block">
              <p className="text-[10px] tracking-wider text-muted-foreground uppercase">Value</p>
              <p className="text-sm font-medium tabular-nums">{ticker.value}</p>
            </div>
          </Panel>
        ))}
      </CardContent>
    </Card>
  )
}

function AccessCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>Update your credentials or re-authenticate.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Email Address</FieldLabel>
          <Input type="email" defaultValue="artist@studio.inc" />
        </Field>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel>Current Password</FieldLabel>
            <a href="#forgot" className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Forgot?
            </a>
          </div>
          <Input type="password" defaultValue="password123" />
        </Field>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button className="w-full">
          <LockKeyhole />
          Update Security
        </Button>
        <a href="#danger" className="flex w-full items-center gap-3 rounded-2xl bg-muted p-3">
          <CircleAlert className="size-4 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Danger Zone</p>
            <p className="truncate text-xs text-muted-foreground">Archive account and remove catalog</p>
          </div>
          <ArrowRight className="size-4 shrink-0" />
        </a>
      </CardFooter>
    </Card>
  )
}

function ActivityCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-muted p-3">
            <p className="text-xs text-muted-foreground">Card Balance</p>
            <p className="font-heading text-2xl tabular-nums">US$12.94</p>
            <p className="text-xs text-muted-foreground tabular-nums">US$11,337.06 Available</p>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-muted p-3">
            <div>
              <p className="text-xs text-muted-foreground">Payment Due</p>
              <p className="font-heading text-2xl">1 Apr</p>
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              Pay Early
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Yearly Activity</p>
          <Badge variant="secondary">+US$0.25 Daily Cash</Badge>
        </div>
        <Bars
          className="h-20"
          values={[40, 55, 35, 60, 45, 50, 65, 40, 55, 70, 45, 80]}
          labels={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]}
        />
      </CardContent>
    </Card>
  )
}

function TransferCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>Transfer Funds</CardTitle>
          <CardDescription>Move money between your connected accounts.</CardDescription>
        </div>
        <CloseButton />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Amount to Transfer</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput defaultValue="1,200.00" aria-label="Amount to transfer" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel>From Account</FieldLabel>
          <Select defaultValue="checking">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checking">Main Checking (··8402) — $12,450.00</SelectItem>
              <SelectItem value="savings">High Yield Savings (··1192)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>To Account</FieldLabel>
          <Select defaultValue="savings">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">High Yield Savings (··1192) — $42,100.00</SelectItem>
              <SelectItem value="checking">Main Checking (··8402)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Panel className="gap-3">
          <Row label="Estimated arrival" value="Today, Apr 14" />
          <Separator />
          <Row label="Transaction fee" value="$0.00" />
          <Separator />
          <Row label="Total amount" value="$1,200.00" strong />
        </Panel>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Confirm Transfer</Button>
      </CardFooter>
    </Card>
  )
}

function ArtworkCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <Label className="justify-center text-[10px] font-normal tracking-wider text-muted-foreground uppercase">
          Cover Art
        </Label>
        <label
          htmlFor="cover-art"
          className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-border"
        >
          <Image className="size-10 text-muted-foreground/50" />
        </label>
        <input id="cover-art" type="file" accept="image/jpeg,image/png" className="sr-only" />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="secondary" className="w-full" render={<label htmlFor="cover-art" />}>
          Upload Artwork
        </Button>
        <CardDescription className="text-center text-xs">
          Minimum 3000 × 3000px
          <br />
          JPEG or PNG only
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1 rounded-full" />
          <Skeleton className="h-9 flex-1 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

function ReceivingCard() {
  return (
    <Card>
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardDescription>Payout Preferences</CardDescription>
          <CardTitle>Receiving Method</CardTitle>
        </div>
        <CloseButton />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Account Holder Name</FieldLabel>
          <Input defaultValue="Synthetic Horizons Music LLC" />
        </Field>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Receiving Method</legend>
          <RadioGroup defaultValue="bank" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Label className="items-start gap-2 rounded-2xl border border-border p-3">
              <RadioGroupItem value="bank" />
              <span>
                <span className="block text-sm font-medium">Bank Transfer</span>
                <span className="text-xs text-muted-foreground">SWIFT / IBAN</span>
              </span>
            </Label>
            <Label className="items-start gap-2 rounded-2xl border border-border p-3">
              <RadioGroupItem value="paypal" />
              <span>
                <span className="block text-sm font-medium">PayPal</span>
                <span className="text-xs text-muted-foreground">Instant Payout</span>
              </span>
            </Label>
          </RadioGroup>
        </fieldset>
        <Field>
          <FieldLabel>IBAN / Account Number</FieldLabel>
          <Input placeholder="DE89 3704 0044 ...." />
        </Field>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled>
          Save Payout Settings
        </Button>
      </CardFooter>
    </Card>
  )
}

function PowerCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Bars
          className="h-32"
          values={[32, 74, 82, 64, 90, 76, 100, 84]}
          labels={["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p"]}
        />
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Currently Using</p>
            <p className="text-lg font-semibold tabular-nums">3.4 kW</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Solar Gen</p>
            <p className="text-lg font-semibold tabular-nums">+1.2 kW</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <span className="text-sm text-muted-foreground">Battery Level</span>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Meter value={85} label="Battery level" />
          </div>
          <span className="text-sm font-medium tabular-nums">85%</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function ConnectBankCard() {
  return (
    <Card>
      <CardContent>
        <Empty className="border-0 bg-transparent px-2 py-8">
          <EmptyMedia>
            <CreditCard />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Connect Bank</EmptyTitle>
            <EmptyDescription>
              Link your payout method to receive monthly royalty distributions automatically.
            </EmptyDescription>
          </EmptyHeader>
          <Button>Set Up Payouts</Button>
        </Empty>
      </CardContent>
    </Card>
  )
}

const UPCOMING = [
  { name: "Netflix Subscription", date: "Apr 15, 2026", amount: "$19.99" },
  { name: "Rent Payment", date: "Apr 1, 2026", amount: "$2,400.00" },
  { name: "Auto Insurance", date: "Apr 22, 2026", amount: "$186.00" },
] as const

function CalendarCard() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const cells = [
    { day: 30, outside: true },
    { day: 31, outside: true },
    ...Array.from({ length: 30 }, (_, index) => ({ day: index + 1, outside: false })),
    { day: 1, outside: true },
    { day: 2, outside: true },
    { day: 3, outside: true },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
        <CardDescription>Select a date to view scheduled payments.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="rounded-2xl border border-border p-3">
          <div className="mb-2 flex items-center justify-between">
            <Button variant="ghost" size="icon-sm" aria-label="Previous month">
              <ChevronRight className="rotate-180" />
            </Button>
            <span className="text-sm font-medium">September 2026</span>
            <Button variant="ghost" size="icon-sm" aria-label="Next month">
              <ChevronRight />
            </Button>
          </div>
          <div className="grid grid-cols-7 text-center text-[10px] text-muted-foreground">
            {days.map((day) => (
              <span key={day} className="py-1">
                {day}
              </span>
            ))}
            {cells.map((cell, index) => (
              <span
                key={`${cell.day}-${index}`}
                className={cn(
                  "mx-auto flex size-7 items-center justify-center rounded-full text-xs",
                  cell.outside && "text-muted-foreground/50",
                  cell.day === 21 && !cell.outside && "bg-foreground text-background"
                )}
              >
                {cell.day}
              </span>
            ))}
          </div>
        </div>
        {UPCOMING.map((item) => (
          <Panel key={item.name} className="flex-row items-center">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
            <Badge variant="secondary">{item.amount}</Badge>
          </Panel>
        ))}
      </CardContent>
    </Card>
  )
}

function ShadesCard() {
  const [open, setOpen] = useState(50)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Living Room</CardTitle>
        <CardDescription>Roller Shades</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex h-32 flex-col overflow-hidden rounded-2xl border border-border bg-muted">
          <div className="bg-foreground/70 transition-all duration-300" style={{ height: `${open}%` }} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Open</span>
          <Slider
            value={open}
            aria-label="Shade position"
            onValueChange={(next) => {
              const value = Array.isArray(next) ? next[0] : next
              if (typeof value === "number") setOpen(value)
            }}
            className="flex-1"
          />
          <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">Close</span>
        </div>
      </CardContent>
      <CardFooter>
        <ToggleGroup
          value={open <= 5 ? ["open"] : open >= 95 ? ["closed"] : ["half"]}
          onValueChange={(next) => {
            const values = Array.isArray(next) ? next : [next]
            const choice = values[0]
            if (choice === "open") setOpen(0)
            else if (choice === "half") setOpen(50)
            else if (choice === "closed") setOpen(100)
          }}
          className="w-full"
          aria-label="Shade preset"
        >
          <Toggle value="open" className="flex-1">
            Open
          </Toggle>
          <Toggle value="half" className="flex-1">
            Half
          </Toggle>
          <Toggle value="closed" className="flex-1">
            Closed
          </Toggle>
        </ToggleGroup>
      </CardFooter>
    </Card>
  )
}

function StockCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Performance</CardTitle>
        <CardDescription>6-month price history.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Ticker</FieldLabel>
          <Select defaultValue="VOO">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VOO">VOO</SelectItem>
              <SelectItem value="VIG">VIG</SelectItem>
              <SelectItem value="AAPL">AAPL</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Separator />
        <svg viewBox="0 0 320 120" className="h-40 w-full" role="img" aria-label="VOO price, last six months">
          <defs>
            <linearGradient id="price-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[20, 50, 80, 110].map((y) => (
            <line key={y} x1="0" y1={y} x2="320" y2={y} className="stroke-border" strokeDasharray="3 3" />
          ))}
          <path
            d="M0,70 C40,62 70,48 110,48 C150,48 170,78 210,62 C250,46 280,40 320,28 L320,120 L0,120 Z"
            fill="url(#price-fill)"
          />
          <path
            d="M0,70 C40,62 70,48 110,48 C150,48 170,78 210,62 C250,46 280,40 320,28"
            fill="none"
            className="stroke-foreground"
            strokeWidth="2"
          />
        </svg>
      </CardContent>
    </Card>
  )
}

function CatalogCard() {
  return (
    <Card>
      <CardContent>
        <Empty className="border-0 bg-transparent px-2 py-8">
          <EmptyMedia>
            <AudioLines />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Explore Catalog</EmptyTitle>
            <EmptyDescription>
              Check your ISRC codes, metadata, and visual assets before going live.
            </EmptyDescription>
          </EmptyHeader>
          <Button>View Catalog</Button>
        </Empty>
      </CardContent>
    </Card>
  )
}

function MilestoneCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set a new milestone</CardTitle>
        <CardDescription>Define your financial target and we&apos;ll help you pace your savings.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Goal Name</FieldLabel>
          <Input placeholder="e.g. New Car, Home Downpayment" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Target Amount</FieldLabel>
            <Input defaultValue="$15,000" />
          </Field>
          <Field>
            <FieldLabel>Target Date</FieldLabel>
            <Input defaultValue="Dec 2025" />
          </Field>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Create Goal</Button>
        <Button variant="outline" className="w-full">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}

function SocialCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {(
          [
            ["Spotify Artist URL", CirclePlus, "spotify-url", "spotify.com/artist/3j...2k", undefined],
            ["Instagram Handle", Camera, "instagram-handle", "@julianduryea_music", undefined],
            ["SoundCloud URL", Cloud, "soundcloud-url", undefined, "soundcloud.com/username"],
            ["Website", Globe, "website-url", undefined, "https://yoursite.com"],
          ] as const
        ).map(([label, Icon, id, value, placeholder]) => (
          <Field key={id}>
            <FieldLabel>{label}</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <Icon />
              </InputGroupAddon>
              <InputGroupInput id={id} defaultValue={value} placeholder={placeholder} aria-label={label} />
            </InputGroup>
          </Field>
        ))}
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="secondary">Discard</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

function NotificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {(
          [
            ["Select all", "notify-all", undefined, true],
            ["Transaction alerts", "notify-transactions", "Deposits, withdrawals, and transfers.", true],
            ["Security alerts", "notify-security", "Login attempts and account changes.", true],
            ["Goal milestones", "notify-goals", "Updates at 25%, 50%, 75%, and 100%.", false],
            ["Market updates", "notify-market", "Daily portfolio summary and price alerts.", false],
          ] as const
        ).map(([label, id, detail, checked]) => (
          <Label key={id} className="items-start gap-3">
            <Checkbox defaultChecked={checked} id={id} className="mt-0.5" />
            <span>
              <span className="block text-sm font-medium">{label}</span>
              {detail ? <span className="text-xs font-normal text-muted-foreground">{detail}</span> : null}
            </span>
          </Label>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

export function ExamplesGallery() {
  return (
    <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
      <Tile>
        <ContributionCard />
      </Tile>
      <Tile>
        <DistributeCard />
      </Tile>
      <Tile>
        <QrCard />
      </Tile>
      <Tile>
        <DividendCard />
      </Tile>
      <Tile>
        <AveragingCard />
      </Tile>
      <Tile>
        <SyncingCard />
      </Tile>
      <Tile>
        <PayoutCard />
      </Tile>
      <Tile>
        <BalanceCard />
      </Tile>
      <Tile>
        <PreferencesCard />
      </Tile>
      <Tile>
        <SavingsRingCard />
      </Tile>
      <Tile>
        <KitchenCard />
      </Tile>
      <Tile>
        <TargetsCard />
      </Tile>
      <Tile>
        <InvestCard />
      </Tile>
      <Tile>
        <TransactionsCard />
      </Tile>
      <Tile>
        <OverviewNavCard />
      </Tile>
      <Tile>
        <AccountNavCard />
      </Tile>
      <Tile>
        <FaqCard />
      </Tile>
      <Tile>
        <PaymentsCard />
      </Tile>
      <Tile>
        <DoorCard />
      </Tile>
      <Tile>
        <HoldingsCard />
      </Tile>
      <Tile>
        <AccessCard />
      </Tile>
      <Tile>
        <ActivityCard />
      </Tile>
      <Tile>
        <TransferCard />
      </Tile>
      <Tile>
        <ArtworkCard />
      </Tile>
      <Tile>
        <SkeletonCard />
      </Tile>
      <Tile>
        <ReceivingCard />
      </Tile>
      <Tile>
        <PowerCard />
      </Tile>
      <Tile>
        <ConnectBankCard />
      </Tile>
      <Tile>
        <CalendarCard />
      </Tile>
      <Tile>
        <ShadesCard />
      </Tile>
      <Tile>
        <StockCard />
      </Tile>
      <Tile>
        <CatalogCard />
      </Tile>
      <Tile>
        <MilestoneCard />
      </Tile>
      <Tile>
        <SocialCard />
      </Tile>
      <Tile>
        <NotificationsCard />
      </Tile>
    </div>
  )
}
