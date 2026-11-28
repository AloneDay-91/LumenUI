import { componentItems } from "@/lib/docs-nav"
import { GITHUB_URL } from "@/lib/site"

export type NavMenuLink = {
  href: string
  label: string
  description?: string
  target?: "_blank"
}

export type NavMenuSection = {
  title: string
  items: NavMenuLink[]
}

/** Which stroke canvas sits at the top of the mega menu card. */
export type NavMenuFigure = "palette" | "scan" | "compare"

/** The card in the last column of a mega menu panel. */
export type NavMenuCard = {
  href: string
  eyebrow: string
  title: string
  description: string
  /** Label of the button at the bottom of the card. */
  tag: string
  figure: NavMenuFigure
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

export const navMenus: NavMenu[] = [
  {
    id: "system",
    title: "System",
    featured: {
      title: "Get started",
      items: [
        { href: "/docs", label: "Introduction", description: "What Lumen is, and who it is for." },
        { href: "/docs/installation", label: "Installation", description: "Add the components to a React app." },
        { href: "/docs/choose", label: "Choose a component", description: "Find the right piece for the job." },
        { href: "/docs/shadcn", label: "From shadcn", description: "Move an existing project across." },
        { href: "/docs/frameworks", label: "Frameworks", description: "Next.js, Vite, Vue, and the rest." },
      ],
    },
    sections: [
      {
        title: "Foundations",
        items: [
          { href: "/docs/styles", label: "Tokens and type", description: "Colour, radius, and the type scale." },
          { href: "/docs/accessibility", label: "Accessibility", description: "Keyboard, names, and contrast." },
          { href: "/shaders", label: "Shaders", description: "Real-time WebGL presets." },
          { href: "/customize", label: "Customize", description: "Ink, radius, and type. Copy the CSS." },
        ],
      },
      {
        title: "Recipes",
        items: [
          { href: "/docs/recipes/form", label: "Form", description: "Fields, validation, and submit." },
          { href: "/docs/recipes/settings", label: "Settings", description: "A settings page built from Lumen." },
        ],
      },
      {
        title: "Resources",
        items: [
          { href: "/docs/changelog", label: "Changelog", description: "What shipped in each release." },
          { href: "/docs/llms", label: "LLMs", description: "Docs written for agents." },
          { href: GITHUB_URL, label: "GitHub", description: "Source, issues, and releases.", target: "_blank" },
        ],
      },
    ],
    card: {
      href: "/customize",
      eyebrow: "Theme",
      title: "Customize",
      description: "Pick the ink, the radius, and the type. Copy the CSS.",
      tag: "Open Customize",
      figure: "palette",
    },
  },
  {
    id: "components",
    title: "Components",
    featured: {
      title: "Most used",
      items: [
        { href: "/docs/components/button", label: "Button", description: "Actions, with variants and a loading state." },
        { href: "/docs/components/input", label: "Input", description: "A text field with the theme radius." },
        { href: "/docs/components/dialog", label: "Dialog", description: "A modal for a short task." },
        { href: "/docs/components/table", label: "Table", description: "Rows, headers, and alignment." },
      ],
    },
    sections: [
      {
        title: "Forms",
        items: [
          { href: "/docs/components/select", label: "Select", description: "Pick one option from a list." },
          { href: "/docs/components/combobox", label: "Combobox", description: "Search, then select." },
          { href: "/docs/components/checkbox", label: "Checkbox", description: "A single choice, or a group." },
          { href: "/docs/components/date-picker", label: "Date Picker", description: "A calendar in a field." },
          { href: "/docs/components/color-picker", label: "Color Picker", description: "Hex, rgb, hsl, and oklch." },
        ],
      },
      {
        title: "Overlays",
        items: [
          { href: "/docs/components/drawer", label: "Drawer", description: "A panel from the edge." },
          { href: "/docs/components/popover", label: "Popover", description: "A small surface on a trigger." },
          { href: "/docs/components/tooltip", label: "Tooltip", description: "A hint on hover." },
          { href: "/docs/components/toast", label: "Toast", description: "A short message that dismisses." },
          { href: "/docs/components/menu", label: "Menu", description: "A list of actions from a trigger." },
        ],
      },
      {
        title: "Display",
        items: [
          { href: "/docs/components/sidebar", label: "Sidebar", description: "App navigation that collapses." },
          { href: "/docs/components/tabs", label: "Tabs", description: "Switch between linked panels." },
          { href: "/docs/components/chart", label: "Chart", description: "Series in the theme hue." },
          { href: "/docs/components/timeline", label: "Timeline", description: "Events in order." },
          { href: "/docs/components/data-list", label: "Data List", description: "Label and value pairs." },
        ],
      },
    ],
    more: {
      href: "/docs/components",
      label: `All ${componentItems.length} components`,
      description: "Browse the full list.",
    },
    card: {
      href: "/docs/components/command",
      eyebrow: "Search",
      title: "Command",
      description: "A palette with groups, shortcuts, and a footer.",
      tag: "See Command",
      figure: "scan",
    },
  },
]
