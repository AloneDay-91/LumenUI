export type ChangelogKind = "added" | "changed" | "fixed"

export type ChangelogLink = {
  name: string
  href: string
  new?: boolean
}

export type ChangelogItem = {
  kind: ChangelogKind
  text: string
  href?: string
  new?: boolean
  links?: ChangelogLink[]
}

export type ChangelogRelease = {
  version: string
  date: string
  summary: string
  items: ChangelogItem[]
}

const addedComponents: ChangelogLink[] = [
  { name: "Accordion", href: "/docs/components/accordion", new: true },
  { name: "Alert Dialog", href: "/docs/components/alert-dialog", new: true },
  { name: "Autocomplete", href: "/docs/components/autocomplete", new: true },
  { name: "Avatar", href: "/docs/components/avatar", new: true },
  { name: "Checkbox", href: "/docs/components/checkbox", new: true },
  { name: "Checkbox Group", href: "/docs/components/checkbox-group", new: true },
  { name: "Collapsible", href: "/docs/components/collapsible", new: true },
  { name: "Combobox", href: "/docs/components/combobox", new: true },
  { name: "Context Menu", href: "/docs/components/context-menu", new: true },
  { name: "Dialog", href: "/docs/components/dialog", new: true },
  { name: "Drawer", href: "/docs/components/drawer", new: true },
  { name: "Field", href: "/docs/components/field", new: true },
  { name: "Fieldset", href: "/docs/components/fieldset", new: true },
  { name: "Form", href: "/docs/components/form", new: true },
  { name: "Menu", href: "/docs/components/menu", new: true },
  { name: "Menubar", href: "/docs/components/menubar", new: true },
  { name: "Meter", href: "/docs/components/meter", new: true },
  { name: "Navigation Menu", href: "/docs/components/navigation-menu", new: true },
  { name: "Number Field", href: "/docs/components/number-field", new: true },
  { name: "OTP Field", href: "/docs/components/otp-field", new: true },
  { name: "Popover", href: "/docs/components/popover", new: true },
  { name: "Preview Card", href: "/docs/components/preview-card", new: true },
  { name: "Progress", href: "/docs/components/progress", new: true },
  { name: "Radio Group", href: "/docs/components/radio-group", new: true },
  { name: "Scroll Area", href: "/docs/components/scroll-area", new: true },
  { name: "Separator", href: "/docs/components/separator", new: true },
  { name: "Slider", href: "/docs/components/slider", new: true },
  { name: "Switch", href: "/docs/components/switch", new: true },
  { name: "Tabs", href: "/docs/components/tabs", new: true },
  { name: "Toast", href: "/docs/components/toast", new: true },
  { name: "Toggle", href: "/docs/components/toggle", new: true },
  { name: "Toggle Group", href: "/docs/components/toggle-group", new: true },
  { name: "Toolbar", href: "/docs/components/toolbar", new: true },
  { name: "Tooltip", href: "/docs/components/tooltip", new: true },
]

export const changelog: ChangelogRelease[] = [
  {
    version: "0.4.0",
    date: "2026-09-19",
    summary:
      "English docs, copy-paste CSS tokens, API reference tabs, and expandable code blocks.",
    items: [
      {
        kind: "added",
        text: "API reference tab on every component page: parts, props, types, and defaults.",
      },
      {
        kind: "added",
        text: "Copy-paste CSS variable sheet for consumer globals.css.",
        href: "/docs/styles",
        new: true,
      },
      {
        kind: "changed",
        text: "Default language is English. Examples live at /examples.",
        href: "/examples",
      },
      {
        kind: "changed",
        text: "Long code blocks collapse, with Show more and a larger dialog.",
      },
      {
        kind: "fixed",
        text: "Light-mode highlighter contrast and code block line spacing.",
      },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-09-18",
    summary:
      "Docs changelog, novelty dots, and a composed examples bento.",
    items: [
      {
        kind: "added",
        text: "Changelog in the docs, novelty indicator, and displayed version.",
        href: "/docs/changelog",
      },
      {
        kind: "added",
        text: "Examples page as a bento of composed usages, outside the docs layout.",
        href: "/examples",
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-09-18",
    summary:
      "First design-system release: tokens, Base UI catalog, Polar / Medusa docs, landing.",
    items: [
      {
        kind: "added",
        text: "CSS tokens, light / dark theme, and Tailwind v4.",
        href: "/docs/styles",
      },
      {
        kind: "added",
        text: "Polar / Medusa docs: sidebar, breadcrumb, TOC, search.",
        href: "/docs",
      },
      {
        kind: "added",
        text: "Base UI component catalog.",
        links: addedComponents,
      },
      {
        kind: "changed",
        text: "Restyle of existing components: Alert, Badge, Button, Card, Input, Label, Select, Skeleton, Textarea.",
      },
    ],
  },
]

export function getLatestChangelog() {
  const [latest] = changelog
  if (!latest) {
    throw new Error("Changelog is empty.")
  }
  return latest
}

export function getNewDocsHrefs(version = getLatestChangelog().version) {
  const release = changelog.find((entry) => entry.version === version)
  const hrefs = new Set<string>()

  if (!release) {
    return hrefs
  }

  for (const item of release.items) {
    if (item.new && item.href) {
      hrefs.add(item.href)
    }
    for (const link of item.links ?? []) {
      if (link.new) {
        hrefs.add(link.href)
      }
    }
  }

  return hrefs
}

const latestNewHrefs = getNewDocsHrefs()

export function isNewDocsPage(href: string) {
  return latestNewHrefs.has(href)
}

export function changelogKindLabel(kind: ChangelogKind) {
  switch (kind) {
    case "added":
      return "Added"
    case "changed":
      return "Changed"
    case "fixed":
      return "Fixed"
    default: {
      const exhaustive: never = kind
      return exhaustive
    }
  }
}

export function formatChangelogDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`))
}