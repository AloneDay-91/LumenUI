export type DocsNavItem = {
  name: string
  href: string
}

export type DocsNavSection = {
  title: string
  items: DocsNavItem[]
}

export const docsSections: DocsNavSection[] = [
  {
    title: "Getting started",
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
      { name: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Foundations",
    items: [{ name: "Styles", href: "/docs/styles" }],
  },
  {
    title: "Components",
    items: [
      { name: "Accordion", href: "/docs/components/accordion" },
      { name: "Alert", href: "/docs/components/alert" },
      { name: "Alert Dialog", href: "/docs/components/alert-dialog" },
      { name: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { name: "Autocomplete", href: "/docs/components/autocomplete" },
      { name: "Avatar", href: "/docs/components/avatar" },
      { name: "Badge", href: "/docs/components/badge" },
      { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { name: "Button", href: "/docs/components/button" },
      { name: "Button Group", href: "/docs/components/button-group" },
      { name: "Card", href: "/docs/components/card" },
      { name: "Checkbox", href: "/docs/components/checkbox" },
      { name: "Checkbox Group", href: "/docs/components/checkbox-group" },
      { name: "Collapsible", href: "/docs/components/collapsible" },
      { name: "Combobox", href: "/docs/components/combobox" },
      { name: "Command", href: "/docs/components/command" },
      { name: "Context Menu", href: "/docs/components/context-menu" },
      { name: "Dialog", href: "/docs/components/dialog" },
      { name: "Drawer", href: "/docs/components/drawer" },
      { name: "Empty", href: "/docs/components/empty" },
      { name: "Field", href: "/docs/components/field" },
      { name: "Fieldset", href: "/docs/components/fieldset" },
      { name: "Form", href: "/docs/components/form" },
      { name: "Input", href: "/docs/components/input" },
      { name: "Input Group", href: "/docs/components/input-group" },
      { name: "Kbd", href: "/docs/components/kbd" },
      { name: "Label", href: "/docs/components/label" },
      { name: "Menu", href: "/docs/components/menu" },
      { name: "Menubar", href: "/docs/components/menubar" },
      { name: "Meter", href: "/docs/components/meter" },
      { name: "Navigation Menu", href: "/docs/components/navigation-menu" },
      { name: "Number Field", href: "/docs/components/number-field" },
      { name: "OTP Field", href: "/docs/components/otp-field" },
      { name: "Pagination", href: "/docs/components/pagination" },
      { name: "Popover", href: "/docs/components/popover" },
      { name: "Preview Card", href: "/docs/components/preview-card" },
      { name: "Progress", href: "/docs/components/progress" },
      { name: "Radio Group", href: "/docs/components/radio-group" },
      { name: "Rating", href: "/docs/components/rating" },
      { name: "Scroll Area", href: "/docs/components/scroll-area" },
      { name: "Select", href: "/docs/components/select" },
      { name: "Separator", href: "/docs/components/separator" },
      { name: "Skeleton", href: "/docs/components/skeleton" },
      { name: "Slider", href: "/docs/components/slider" },
      { name: "Spinner", href: "/docs/components/spinner" },
      { name: "Stepper", href: "/docs/components/stepper" },
      { name: "Switch", href: "/docs/components/switch" },
      { name: "Table", href: "/docs/components/table" },
      { name: "Tabs", href: "/docs/components/tabs" },
      { name: "Textarea", href: "/docs/components/textarea" },
      { name: "Timeline", href: "/docs/components/timeline" },
      { name: "Toast", href: "/docs/components/toast" },
      { name: "Toggle", href: "/docs/components/toggle" },
      { name: "Toggle Group", href: "/docs/components/toggle-group" },
      { name: "Toolbar", href: "/docs/components/toolbar" },
      { name: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
]

export const docsNav = docsSections.flatMap((section) => section.items)

export function isNavActive(pathname: string, href: string) {
  return pathname === href
}

export function getDocsLocation(pathname: string) {
  for (const section of docsSections) {
    const item = section.items.find((entry) => entry.href === pathname)
    if (item) {
      return { section, item }
    }
  }

  return undefined
}

export function getAdjacentDocs(pathname: string) {
  const index = docsNav.findIndex((item) => item.href === pathname)
  if (index === -1) {
    return { prev: undefined, next: undefined }
  }

  return {
    prev: index > 0 ? docsNav[index - 1] : undefined,
    next: index < docsNav.length - 1 ? docsNav[index + 1] : undefined,
  }
}

export { SITE_VERSION as docsVersion, formatDocsVersion } from "@/lib/site"
