import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro } from "@/components/docs/Preview"

const sections = [
  {
    id: "value",
    title: "Pick a value",
    rows: [
      {
        href: "/docs/components/select",
        name: "Select",
        when: "The value is one of a closed list. The field opens that list.",
      },
      {
        href: "/docs/components/autocomplete",
        name: "Autocomplete",
        when: "The person types, and the list filters known items.",
      },
      {
        href: "/docs/components/combobox",
        name: "Combobox",
        when: "The same filter, with a button that opens the list.",
      },
      {
        href: "/docs/components/command",
        name: "Command",
        when: "Search actions and jump around the app. This is not a form field.",
      },
    ],
  },
  {
    id: "menu",
    title: "Open a menu",
    rows: [
      {
        href: "/docs/components/menu",
        name: "Menu",
        when: "A button opens a list of actions. The CLI name is menu.",
      },
      {
        href: "/docs/components/context-menu",
        name: "Context Menu",
        when: "The same list, opened with a right click or a long press.",
      },
      {
        href: "/docs/components/menubar",
        name: "Menubar",
        when: "A bar of menus across the top of an app.",
      },
    ],
  },
  {
    id: "message",
    title: "Show a message",
    rows: [
      {
        href: "/docs/components/alert",
        name: "Alert",
        when: "A status that stays in the page.",
      },
      {
        href: "/docs/components/callout",
        name: "Callout",
        when: "A short tinted notice beside the content.",
      },
      {
        href: "/docs/components/toast",
        name: "Toast",
        when: "A message that appears, then leaves.",
      },
    ],
  },
  {
    id: "layer",
    title: "Cover the page",
    rows: [
      {
        href: "/docs/components/dialog",
        name: "Dialog",
        when: "A task or a form that blocks the page until it is done.",
      },
      {
        href: "/docs/components/alert-dialog",
        name: "Alert Dialog",
        when: "Confirm a destructive action.",
      },
      {
        href: "/docs/components/drawer",
        name: "Drawer",
        when: "A panel that enters from the edge.",
      },
      {
        href: "/docs/components/popover",
        name: "Popover",
        when: "A small surface anchored to a button.",
      },
      {
        href: "/docs/components/tooltip",
        name: "Tooltip",
        when: "A short hint on hover or focus.",
      },
      {
        href: "/docs/components/preview-card",
        name: "Preview Card",
        when: "A preview of the page a link points to.",
      },
    ],
  },
] as const

export default function ChoosePage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "choose-a-component", text: "Choose a component", level: 1 },
          ...sections.map((section) => ({
            id: section.id,
            text: section.title,
            level: 2 as const,
          })),
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="Choose a component"
          description="Several components do a similar job. Pick from the gesture, then copy that file."
        />
        {sections.map((section) => (
          <section key={section.id} className="space-y-4">
            <h2 id={section.id}>{section.title}</h2>
            <ul className="divide-y divide-border border-y border-border">
              {section.rows.map((row) => (
                <li key={row.href} className="py-4">
                  <Link href={row.href} className="text-sm font-medium">
                    {row.name}
                  </Link>
                  <p className="mt-1">{row.when}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
