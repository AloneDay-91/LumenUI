import { blockCategories } from "@/lib/block-categories"
import { componentItems } from "@/lib/docs-nav"
import { GITHUB_URL } from "@/lib/site"

export type NavMenuLink = {
  href: string
  label: string
  target?: "_blank"
}

export type NavMenuSection = {
  title: string
  items: NavMenuLink[]
}

/** Hues from the global sheet (--jade-*, --indigo-*, …). */
export type NavMenuHue = "jade" | "indigo" | "cyan" | "orange"

/** The card in the last column of a mega menu panel. */
export type NavMenuCard = {
  href: string
  eyebrow: string
  title: string
  description: string
  /** Label of the outline button at the bottom of the card. */
  tag: string
  hue: NavMenuHue
}

export type NavMenu = {
  id: string
  title: string
  featured: NavMenuSection
  /** Three at most, so the panel stays one row tall. */
  sections: NavMenuSection[]
  /** Link under the sections to the full list. */
  more?: NavMenuLink
  card: NavMenuCard
}

const dashboardBlocks = blockCategories.filter(
  (category) => category.kit === "dashboard"
)

function blockLinks(group: string) {
  return blockCategories
    .filter((category) => category.kit === "lumen" && category.group === group)
    .map((category) => ({
      href: `/blocks/${category.slug}`,
      label: category.title,
    }))
}

export const navMenus: NavMenu[] = [
  {
    id: "system",
    title: "System",
    featured: {
      title: "Get started",
      items: [
        { href: "/docs", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/docs/choose", label: "Choose a component" },
        { href: "/docs/shadcn", label: "From shadcn" },
        { href: "/docs/frameworks", label: "Frameworks" },
      ],
    },
    sections: [
      {
        title: "Foundations",
        items: [
          { href: "/docs/styles", label: "Tokens and type" },
          { href: "/docs/accessibility", label: "Accessibility" },
          { href: "/customize", label: "Customize" },
        ],
      },
      {
        title: "Recipes",
        items: [
          { href: "/docs/recipes/form", label: "Form" },
          { href: "/docs/recipes/settings", label: "Settings" },
        ],
      },
      {
        title: "Resources",
        items: [
          { href: "/docs/changelog", label: "Changelog" },
          { href: "/docs/llms", label: "LLMs" },
          { href: GITHUB_URL, label: "GitHub", target: "_blank" },
        ],
      },
    ],
    card: {
      href: "/customize",
      eyebrow: "Theme",
      title: "Customize",
      description: "Pick the ink, the radius, and the type. Copy the CSS.",
      tag: "Open Customize",
      hue: "cyan",
    },
  },
  {
    id: "components",
    title: "Components",
    featured: {
      title: "Most used",
      items: [
        { href: "/docs/components/button", label: "Button" },
        { href: "/docs/components/input", label: "Input" },
        { href: "/docs/components/dialog", label: "Dialog" },
        { href: "/docs/components/table", label: "Table" },
      ],
    },
    sections: [
      {
        title: "Forms",
        items: [
          { href: "/docs/components/select", label: "Select" },
          { href: "/docs/components/combobox", label: "Combobox" },
          { href: "/docs/components/checkbox", label: "Checkbox" },
          { href: "/docs/components/date-picker", label: "Date Picker" },
          { href: "/docs/components/color-picker", label: "Color Picker" },
        ],
      },
      {
        title: "Overlays",
        items: [
          { href: "/docs/components/drawer", label: "Drawer" },
          { href: "/docs/components/popover", label: "Popover" },
          { href: "/docs/components/tooltip", label: "Tooltip" },
          { href: "/docs/components/toast", label: "Toast" },
          { href: "/docs/components/menu", label: "Menu" },
        ],
      },
      {
        title: "Display",
        items: [
          { href: "/docs/components/sidebar", label: "Sidebar" },
          { href: "/docs/components/tabs", label: "Tabs" },
          { href: "/docs/components/chart", label: "Chart" },
          { href: "/docs/components/timeline", label: "Timeline" },
          { href: "/docs/components/data-list", label: "Data List" },
        ],
      },
    ],
    more: {
      href: "/docs/components",
      label: `All ${componentItems.length} components`,
    },
    card: {
      href: "/docs/components/command",
      eyebrow: "Search",
      title: "Command",
      description: "A palette with groups, shortcuts, and a footer.",
      tag: "See Command",
      hue: "indigo",
    },
  },
  {
    id: "blocks",
    title: "Blocks",
    featured: {
      title: "Kits",
      items: [
        { href: "/blocks", label: "All blocks" },
        { href: "/blocks/heroes", label: "Marketing" },
        { href: "/blocks/pages", label: "Dashboard" },
      ],
    },
    sections: [
      { title: "Marketing", items: blockLinks("Marketing") },
      { title: "Account", items: blockLinks("Account") },
      {
        title: "Dashboard",
        items: dashboardBlocks.slice(0, 6).map((category) => ({
          href: `/blocks/${category.slug}`,
          label: category.title,
        })),
      },
    ],
    more: { href: "/blocks", label: "Browse every block" },
    card: {
      href: "/blocks/pages",
      eyebrow: `Kit · ${dashboardBlocks.length} blocks`,
      title: "Dashboard",
      description: "Sidebar, stats, charts, and tables on one layout.",
      tag: "Browse the kit",
      hue: "jade",
    },
  },
]
