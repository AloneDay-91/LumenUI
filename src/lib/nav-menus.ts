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
    title: "Système",
    featured: {
      title: "Commencer",
      items: [
        { href: "/docs", label: "Introduction" },
        { href: "/docs/installation", label: "Installation" },
        { href: "/exemples", label: "Exemples" },
        { href: "/docs/changelog", label: "Changelog" },
      ],
    },
    sections: [
      {
        title: "Fondations",
        items: [{ href: "/docs/styles", label: "Styles" }],
      },
      {
        title: "Source",
        items: [{ href: GITHUB_URL, label: "GitHub", target: "_blank" }],
      },
    ],
  },
  {
    id: "components",
    title: "Composants",
    featured: {
      title: "Les plus utilisés",
      items: [
        { href: "/docs/components/button", label: "Button" },
        { href: "/docs/components/dialog", label: "Dialog" },
        { href: "/docs/components/menu", label: "Menu" },
      ],
    },
    sections: [
      {
        title: "Formulaires",
        items: [
          { href: "/docs/components/input", label: "Input" },
          { href: "/docs/components/field", label: "Field" },
          { href: "/docs/components/select", label: "Select" },
          { href: "/docs/components/combobox", label: "Combobox" },
        ],
      },
      {
        title: "Overlays",
        items: [
          { href: "/docs/components/dialog", label: "Dialog" },
          { href: "/docs/components/popover", label: "Popover" },
          { href: "/docs/components/tooltip", label: "Tooltip" },
          { href: "/docs/components/toast", label: "Toast" },
        ],
      },
    ],
  },
]
