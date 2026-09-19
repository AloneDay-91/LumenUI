import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro } from "@/components/docs/Preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

const principles = [
  {
    title: "Tokens",
    description: "Semantic CSS variables, light and dark, no interactive blue.",
  },
  {
    title: "CVA",
    description: "Declarative variants, classes merged with cn().",
  },
  {
    title: "Base UI",
    description: "Accessible, unstyled behavior. The chrome is yours.",
  },
  {
    title: "Copy-paste",
    description: "You do not consume a library. The code lives in your repo.",
  },
]

const start = [
  {
    href: "/docs/installation",
    title: "Installation",
    description: "Dependencies, tokens, and the cn() helper.",
  },
  {
    href: "/docs/styles",
    title: "Styles",
    description: "Palette, type, and theming.",
  },
  {
    href: "/docs/components/button",
    title: "Button",
    description: "First component to copy to prove the pipeline.",
  },
  {
    href: "/examples",
    title: "Examples",
    description: "A bento of usages, outside the docs.",
  },
  {
    href: "/docs/changelog",
    title: "Changelog",
    description: "Release notes and what’s new.",
  },
]

export default function DocsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "documentation", text: "Documentation", level: 1 },
          { id: "approach", text: "Approach", level: 2 },
          { id: "start", text: "Get started", level: 2 },
        ]}
      />

      <PageIntro
        eyebrow="Getting started"
        title="Documentation"
        description="Lumen UI is a copy-paste component system. Behavior comes from Base UI. Style lives in your repo."
      />

      <Alert>
        <AlertTitle>Copy-paste, not a library</AlertTitle>
        <AlertDescription>
          If you are starting, begin with installation. For the visual language,
          see styles. The rest of the reference is in the sidebar.
        </AlertDescription>
      </Alert>

      <h2 id="approach">Approach</h2>
      <p>
        You do not consume a component library. You copy the file. The
        architecture (CVA, CSS tokens, composition) follows the shadcn/ui
        model, without its chrome.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {principles.map((item) => (
          <Card key={item.title} size="sm" variant="secondary">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <h2 id="start">Get started</h2>
      <p>Foundations, the first component, and release notes.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {start.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <Card
              size="sm"
              variant="secondary"
              className="h-full transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
