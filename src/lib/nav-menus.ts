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

export type NavMenu = {
  id: string
  title: string
  featured: NavMenuSection
  sections: NavMenuSection[]
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
        { href: "/docs/styles", label: "Styles" },
        { href: "/examples", label: "Examples" },
        { href: "/docs/changelog", label: "Changelog" },
      ],
    },
    sections: [
      {
        title: "Docs",
        items: [
          { href: "/docs", label: "Documentation" },
          { href: "/docs/installation", label: "Installation" },
          { href: "/docs/styles", label: "Tokens and type" },
          { href: "/docs/changelog", label: "Changelog" },
        ],
      },
      {
        title: "Highlights",
        items: [
          { href: "/docs/components/table", label: "Table" },
          { href: "/docs/components/command", label: "Command" },
          { href: "/docs/components/stepper", label: "Stepper" },
          { href: "/docs/components/timeline", label: "Timeline" },
          { href: "/docs/components/rating", label: "Rating" },
        ],
      },
      {
        title: "Source",
        items: [{ href: GITHUB_URL, label: "GitHub", target: "_blank" }],
      },
    ],
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
        { href: "/docs/components/command", label: "Command" },
      ],
    },
    sections: [
      {
        title: "Forms",
        items: [
          { href: "/docs/components/input", label: "Input" },
          { href: "/docs/components/input-group", label: "Input Group" },
          { href: "/docs/components/textarea", label: "Textarea" },
          { href: "/docs/components/select", label: "Select" },
          { href: "/docs/components/combobox", label: "Combobox" },
          { href: "/docs/components/field", label: "Field" },
          { href: "/docs/components/checkbox", label: "Checkbox" },
          { href: "/docs/components/switch", label: "Switch" },
        ],
      },
      {
        title: "Overlays",
        items: [
          { href: "/docs/components/dialog", label: "Dialog" },
          { href: "/docs/components/alert-dialog", label: "Alert Dialog" },
          { href: "/docs/components/drawer", label: "Drawer" },
          { href: "/docs/components/popover", label: "Popover" },
          { href: "/docs/components/tooltip", label: "Tooltip" },
          { href: "/docs/components/toast", label: "Toast" },
          { href: "/docs/components/menu", label: "Menu" },
        ],
      },
      {
        title: "Navigation",
        items: [
          { href: "/docs/components/breadcrumb", label: "Breadcrumb" },
          { href: "/docs/components/tabs", label: "Tabs" },
          { href: "/docs/components/pagination", label: "Pagination" },
          { href: "/docs/components/navigation-menu", label: "Navigation Menu" },
          { href: "/docs/components/menubar", label: "Menubar" },
          { href: "/docs/components/stepper", label: "Stepper" },
        ],
      },
      {
        title: "Display",
        items: [
          { href: "/docs/components/card", label: "Card" },
          { href: "/docs/components/table", label: "Table" },
          { href: "/docs/components/avatar", label: "Avatar" },
          { href: "/docs/components/badge", label: "Badge" },
          { href: "/docs/components/empty", label: "Empty" },
          { href: "/docs/components/timeline", label: "Timeline" },
          { href: "/docs/components/accordion", label: "Accordion" },
        ],
      },
      {
        title: "Feedback",
        items: [
          { href: "/docs/components/alert", label: "Alert" },
          { href: "/docs/components/skeleton", label: "Skeleton" },
          { href: "/docs/components/spinner", label: "Spinner" },
          { href: "/docs/components/progress", label: "Progress" },
          { href: "/docs/components/rating", label: "Rating" },
        ],
      },
    ],
  },
]
