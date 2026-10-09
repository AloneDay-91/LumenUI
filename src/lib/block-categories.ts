/** Kits ship in the source. Adding one is a code change, not a control in the select. */
export const blockKits = [
  {
    id: "lumen",
    name: "Lumen",
    description: "Marketing pages and account screens.",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description:
      "Application screens: navigation, metrics, charts, tables and settings.",
  },
] as const

export type BlockKitId = (typeof blockKits)[number]["id"]

export const blockCategories = [
  {
    slug: "headers",
    title: "Headers",
    group: "Marketing",
    kit: "lumen",
    description: "The bar at the top of a page.",
  },
  {
    slug: "heroes",
    title: "Heroes",
    group: "Marketing",
    kit: "lumen",
    description: "The first screen, with a title and the actions under it.",
  },
  {
    slug: "features",
    title: "Features",
    group: "Marketing",
    kit: "lumen",
    description: "A short list of what the product does.",
  },
  {
    slug: "pricing",
    title: "Pricing",
    group: "Marketing",
    kit: "lumen",
    description: "Plans side by side.",
  },
  {
    slug: "cta",
    title: "Call to action",
    group: "Marketing",
    kit: "lumen",
    description: "A closing line and one action.",
  },
  {
    slug: "footers",
    title: "Footers",
    group: "Marketing",
    kit: "lumen",
    description: "Links and a copyright line.",
  },
  {
    slug: "login",
    title: "Login",
    group: "Account",
    kit: "lumen",
    description: "A sign-in screen.",
  },
  {
    slug: "sign-up",
    title: "Sign up",
    group: "Account",
    kit: "lumen",
    description: "Create an account.",
  },
  {
    slug: "contact",
    title: "Contact",
    group: "Account",
    kit: "lumen",
    description: "A short message to the studio.",
  },
  {
    slug: "sidebars",
    title: "Sidebars",
    group: "Navigation",
    kit: "dashboard",
    description: "The app menu, open or folded to icons.",
  },
  {
    slug: "app-headers",
    title: "App headers",
    group: "Navigation",
    kit: "dashboard",
    description: "The bar above the page, and the title under it.",
  },
  {
    slug: "stats",
    title: "Stats",
    group: "Data",
    kit: "dashboard",
    description: "Key figures with their trend.",
  },
  {
    slug: "charts",
    title: "Charts",
    group: "Data",
    kit: "dashboard",
    description: "Area, donut, bar and line charts in ink tones.",
  },
  {
    slug: "tables",
    title: "Tables",
    group: "Data",
    kit: "dashboard",
    description: "Rows with filters, selection and pages.",
  },
  {
    slug: "activity",
    title: "Activity",
    group: "Data",
    kit: "dashboard",
    description: "What happened in the workspace, newest first.",
  },
  {
    slug: "empty-states",
    title: "Empty states",
    group: "Data",
    kit: "dashboard",
    description: "A section with nothing in it yet.",
  },
  {
    slug: "settings",
    title: "Settings",
    group: "Settings",
    kit: "dashboard",
    description: "Profile, notifications, billing and the danger zone.",
  },
  {
    slug: "pages",
    title: "Pages",
    group: "Pages",
    kit: "dashboard",
    description: "Whole screens built from the blocks of the kit.",
  },
] as const

export type BlockCategorySlug = (typeof blockCategories)[number]["slug"]

export type BlockCategory = (typeof blockCategories)[number]
export type BlockGroup = BlockCategory["group"]

export function getBlockCategory(slug: string) {
  return blockCategories.find((category) => category.slug === slug)
}

export function getBlockKit(id: string) {
  return blockKits.find((kit) => kit.id === id)
}

/** Groups of a kit, in the order their first category appears. */
export function kitGroups(kit: BlockKitId) {
  const groups: BlockGroup[] = []
  for (const category of blockCategories) {
    if (category.kit === kit && !groups.includes(category.group)) {
      groups.push(category.group)
    }
  }
  return groups
}
