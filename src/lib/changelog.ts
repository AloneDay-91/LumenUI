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

const nativeComponents: ChangelogLink[] = [
  { name: "Aspect Ratio", href: "/docs/components/aspect-ratio", new: true },
  { name: "Breadcrumb", href: "/docs/components/breadcrumb", new: true },
  { name: "Button Group", href: "/docs/components/button-group", new: true },
  { name: "Command", href: "/docs/components/command", new: true },
  { name: "Empty", href: "/docs/components/empty", new: true },
  { name: "Input Group", href: "/docs/components/input-group", new: true },
  { name: "Kbd", href: "/docs/components/kbd", new: true },
  { name: "Pagination", href: "/docs/components/pagination", new: true },
  { name: "Rating", href: "/docs/components/rating", new: true },
  { name: "Spinner", href: "/docs/components/spinner", new: true },
  { name: "Stepper", href: "/docs/components/stepper", new: true },
  { name: "Table", href: "/docs/components/table", new: true },
  { name: "Timeline", href: "/docs/components/timeline", new: true },
]

const releaseComponents: ChangelogLink[] = [
  { name: "Calendar", href: "/docs/components/calendar", new: true },
  { name: "Carousel", href: "/docs/components/carousel", new: true },
  { name: "Chart", href: "/docs/components/chart", new: true },
  { name: "Date Picker", href: "/docs/components/date-picker", new: true },
  { name: "Item", href: "/docs/components/item", new: true },
  { name: "Typography", href: "/docs/components/typography", new: true },
]

export const changelog: ChangelogRelease[] = [
  {
    version: "0.7.2",
    date: "2026-10-04",
    summary: "The CLI homepage is the documentation site.",
    items: [
      {
        kind: "changed",
        text: "The npm package homepage is https://ui.elouanb.fr/.",
        href: "/docs/installation",
      },
    ],
  },
  {
    version: "0.7.1",
    date: "2026-10-04",
    summary: "The CLI is on npm, at the same version as the site.",
    items: [
      {
        kind: "added",
        text: "npx @aloneday/lumenui@latest installs the CLI. A GitHub release publishes that same version.",
        href: "/docs/installation",
        new: true,
      },
    ],
  },
  {
    version: "0.7.0",
    date: "2026-10-04",
    summary:
      "Charts, a carousel, a calendar, a date picker, item rows, typography, and a copy CLI.",
    items: [
      {
        kind: "added",
        text: "Chart, carousel, calendar, date picker, item, and typography.",
        links: releaseComponents,
      },
      {
        kind: "added",
        text: "lumenui add, rm, and add all copy a component and install its npm dependencies.",
        href: "/docs/installation",
      },
      {
        kind: "added",
        text: "LLMs page for the plain-text index and the full corpus.",
        href: "/docs/llms",
        new: true,
      },
      {
        kind: "changed",
        text: "The Components section opens the component index.",
        href: "/docs/components",
        new: true,
      },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-09-30",
    summary:
      "A collapsible sidebar, an examples gallery, and an llms.txt corpus for agents.",
    items: [
      {
        kind: "added",
        text: "Collapsible sidebar: expanded, icon, off-canvas, and a drawer below the md breakpoint.",
        href: "/docs/components/sidebar",
        new: true,
      },
      {
        kind: "added",
        text: "Agents can read the whole system at /llms.txt, or the full docs, usage, API, and source at /llms-full.txt.",
      },
      {
        kind: "changed",
        text: "Examples are a card gallery of composed usages.",
        href: "/examples",
      },
      {
        kind: "fixed",
        text: "Separator follows data-orientation, so horizontal and vertical rules stay visible.",
        href: "/docs/components/separator",
      },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-09-20",
    summary:
      "Thirteen new native components, a logo favicon, and full-width docs previews.",
    items: [
      {
        kind: "added",
        text: "Native components outside Base UI — framed table, stepper, command, and more.",
        links: nativeComponents,
      },
      {
        kind: "added",
        text: "Favicon and Apple touch icon from the Lumen mark.",
      },
      {
        kind: "changed",
        text: "Docs previews always fill the card. Smaller examples stay centered.",
      },
      {
        kind: "changed",
        text: "Themes playground removed. /themes and /docs/themes redirect to Styles.",
        href: "/docs/styles",
      },
    ],
  },
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
  const latest = changelog.find((entry) => entry.version === version)
  const hrefs = new Set<string>()

  if (!latest) {
    return hrefs
  }

  for (const release of changelog) {
    if (release.date !== latest.date) {
      continue
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