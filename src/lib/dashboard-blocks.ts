import type { BlockCategorySlug } from "@/lib/block-categories"

const CLI = "npx @aloneday/lumenui@latest add"

/** Where the block sources live. The gallery shows these files as they are. */
export const DASHBOARD_BLOCKS_DIR = "src/components/blocks/dashboard"

export type DashboardBlockMeta = {
  id: string
  kit: BlockCategorySlug
  title: string
  description: string
  command: string
  /** Files shown in the Code tab, the block first. Siblings it imports follow. */
  files: string[]
}

function block(
  meta: Omit<DashboardBlockMeta, "command"> & { components: string[] },
): DashboardBlockMeta {
  const { components, ...rest } = meta
  return { ...rest, command: `${CLI} ${components.join(" ")}` }
}

export const dashboardBlockMeta: DashboardBlockMeta[] = [
  block({
    id: "app-sidebar",
    kit: "sidebars",
    title: "App sidebar",
    description:
      "Inset Sidebar: workspace switcher, search, grouped links with counts, a seats card and the account.",
    components: ["sidebar", "input-group", "kbd", "card", "progress", "avatar"],
    files: ["AppSidebar.tsx"],
  }),
  block({
    id: "app-sidebar-collapsed",
    kit: "sidebars",
    title: "App sidebar, icons",
    description:
      "The same sidebar folded to icons with collapsible=\"icon\". Labels move into tooltips. Toggle it with ⌘B.",
    components: ["sidebar", "input-group", "kbd", "card", "progress", "avatar"],
    files: ["AppSidebar.tsx"],
  }),
  block({
    id: "app-header",
    kit: "app-headers",
    title: "App header",
    description:
      "SidebarTrigger, Breadcrumb, search with a shortcut, theme and notifications, and the account menu.",
    components: ["sidebar", "breadcrumb", "input-group", "kbd", "dropdown-menu", "avatar", "separator"],
    files: ["AppHeader.tsx"],
  }),
  block({
    id: "page-heading",
    kit: "app-headers",
    title: "Page heading",
    description:
      "The page title, one line of context, and its actions. Stacks when its container is narrow.",
    components: ["button"],
    files: ["PageHeading.tsx"],
  }),
  block({
    id: "stat-cards",
    kit: "stats",
    title: "Stat cards",
    description:
      "Four KPI cards: a delta Badge, a Chart sparkline, a drop in red, and a Meter toward a goal.",
    components: ["card", "badge", "chart", "meter"],
    files: ["StatCards.tsx"],
  }),
  block({
    id: "stat-items",
    kit: "stats",
    title: "Stat items",
    description: "Compact KPIs as outline Items: an icon, the figure and its trend.",
    components: ["item", "badge"],
    files: ["StatItems.tsx"],
  }),
  block({
    id: "stat-strip",
    kit: "stats",
    title: "Stat strip",
    description: "One Card split into columns. It sits above a table.",
    components: ["card"],
    files: ["StatStrip.tsx"],
  }),
  block({
    id: "revenue-chart",
    kit: "charts",
    title: "Revenue chart",
    description:
      "Area chart against the previous period, with a tooltip and a Tabs range switch.",
    components: ["card", "chart", "badge", "tabs"],
    files: ["RevenueChart.tsx"],
  }),
  block({
    id: "plan-donut",
    kit: "charts",
    title: "Plan donut",
    description: "Donut with the total in the middle and a legend in two columns.",
    components: ["card", "chart", "button"],
    files: ["PlanDonut.tsx"],
  }),
  block({
    id: "sessions-chart",
    kit: "charts",
    title: "Sessions chart",
    description: "Stacked bars for new and returning visitors.",
    components: ["card", "chart", "button"],
    files: ["SessionsChart.tsx"],
  }),
  block({
    id: "churn-chart",
    kit: "charts",
    title: "Churn chart",
    description: "Two lines, this year against last year.",
    components: ["card", "chart", "badge"],
    files: ["ChurnChart.tsx"],
  }),
  block({
    id: "orders-table",
    kit: "tables",
    title: "Orders table",
    description:
      "Filter toolbar, faceted filters, Checkbox selection, status Badges, rows per page and Pagination.",
    components: ["card", "table", "checkbox", "avatar", "badge", "input-group", "select", "pagination", "separator"],
    files: ["OrdersTable.tsx"],
  }),
  block({
    id: "activity-feed",
    kit: "activity",
    title: "Activity feed",
    description: "Workspace events on a Timeline, filtered with Tabs.",
    components: ["card", "timeline", "tabs", "button"],
    files: ["ActivityFeed.tsx"],
  }),
  block({
    id: "empty-state",
    kit: "empty-states",
    title: "Empty state",
    description: "Empty inside a Card: what goes here, and two ways to start.",
    components: ["card", "empty", "button"],
    files: ["EmptyState.tsx"],
  }),
  block({
    id: "settings-profile",
    kit: "settings",
    title: "Profile",
    description:
      "Photo, name, verified email, username prefix and bio. Uses the SettingsSection layout below it.",
    components: ["card", "avatar", "badge", "field", "input-group", "textarea", "separator"],
    files: ["ProfileSettings.tsx", "SettingsSection.tsx"],
  }),
  block({
    id: "settings-notifications",
    kit: "settings",
    title: "Notifications",
    description: "Item rows with a Switch each.",
    components: ["card", "item", "switch"],
    files: ["NotificationSettings.tsx", "SettingsSection.tsx"],
  }),
  block({
    id: "settings-billing",
    kit: "settings",
    title: "Plan & billing",
    description: "Current plan, usage Meters, the card on file and past invoices.",
    components: ["card", "badge", "meter", "item", "table", "separator"],
    files: ["BillingSettings.tsx", "SettingsSection.tsx"],
  }),
  block({
    id: "settings-danger-zone",
    kit: "settings",
    title: "Danger zone",
    description: "Transfer and delete, on a destructive tint.",
    components: ["card", "item", "button", "separator"],
    files: ["DangerZone.tsx", "SettingsSection.tsx"],
  }),
  block({
    id: "dashboard-overview",
    kit: "pages",
    title: "Overview",
    description:
      "The home of the dashboard. Imports the sidebar, header, stats, charts, orders table and activity blocks.",
    components: ["sidebar", "button"],
    files: ["OverviewPage.tsx", "DashboardShell.tsx"],
  }),
  block({
    id: "dashboard-orders",
    kit: "pages",
    title: "Orders",
    description:
      "A table page: stat strip, status ToggleGroup and the orders table with its toolbar.",
    components: ["sidebar", "button", "badge", "toggle-group"],
    files: ["OrdersPage.tsx", "DashboardShell.tsx"],
  }),
  block({
    id: "dashboard-settings",
    kit: "pages",
    title: "Settings",
    description:
      "Tabs over the four settings sections: profile, notifications, billing and the danger zone.",
    components: ["sidebar", "tabs"],
    files: ["SettingsPage.tsx", "DashboardShell.tsx"],
  }),
]
