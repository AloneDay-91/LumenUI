import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Badge } from "@/components/ui/Badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Separator } from "@/components/ui/Separator"
import { LUMEN_GLOBAL_CSS } from "@/lib/lumen-css"

const swatches = [
  { name: "background", swatch: "bg-background" },
  { name: "foreground", swatch: "bg-foreground" },
  { name: "card", swatch: "bg-card" },
  { name: "primary", swatch: "bg-primary" },
  { name: "muted", swatch: "bg-muted" },
  { name: "secondary", swatch: "bg-secondary" },
  { name: "border", swatch: "bg-border" },
  { name: "destructive", swatch: "bg-destructive" },
  { name: "ring", swatch: "bg-ring" },
]

const tokens = [
  ["--background", "Paper surface / #111"],
  ["--foreground", "Primary text"],
  ["--card", "Card and Alert surfaces"],
  ["--primary", "Actions, inversion"],
  ["--muted", "Secondary surfaces"],
  ["--muted-foreground", "Metadata, dates"],
  ["--border", "Dividers, outlines"],
  ["--ring", "Keyboard focus"],
  ["--accent", "Hover and selected surfaces. Not a brand hue."],
  ["--destructive", "Error, delete"],
  ["--input", "Field borders"],
  ["--new", "Novelty indicator"],
  ["--radius", "0.625rem — pills scale from this"],
  ["--sidebar", "Docs sidebar surface"],
]

const hues = ["gray", "indigo", "cyan", "orange", "crimson", "jade"] as const

const hueLabel: Record<(typeof hues)[number], string> = {
  gray: "Gray",
  indigo: "Indigo",
  cyan: "Cyan",
  orange: "Orange",
  crimson: "Crimson",
  jade: "Jade",
}

const typefaces = [
  {
    sample: "Inter",
    className: "font-sans",
    role: "font-sans — UI and body",
  },
  {
    sample: "Fraunces",
    className: "font-serif",
    role: "font-serif — optional heading font",
  },
  {
    sample: "JetBrains Mono",
    className: "font-mono",
    role: "font-mono — code, labels, index",
  },
]

export default function StylesPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "styles", text: "Styles", level: 1 },
          { id: "copy", text: "Copy", level: 2 },
          { id: "palette", text: "Palette", level: 2 },
          { id: "color", text: "Color", level: 2 },
          { id: "type", text: "Typography", level: 2 },
          { id: "theming", text: "Theme", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Foundations"
          title="Styles"
          description="Warm paper, black, and grey. Hue is optional: gray, indigo, cyan, orange, crimson, and jade."
        />

        <section className="space-y-4">
          <h2 id="copy">Copy</h2>
          <p>
            Everything below comes from one stylesheet: <code>:root</code> for
            light, <code>.dark</code> for dark, and the Tailwind{" "}
            <code>@theme</code> map that turns each token into a class such as{" "}
            <code>bg-primary</code>. <code>init</code> writes it into{" "}
            <code>globals.css</code> for you; copy it by hand only for a{" "}
            <Link href="/docs/installation#manual">manual installation</Link>. To
            change the look, edit the variables, or build a preset in{" "}
            <Link href="/customize">Customize</Link> and apply it with{" "}
            <code>lumenui preset</code>.
          </p>
          <CodeBlock
            filename="app/globals.css"
            language="css"
            code={LUMEN_GLOBAL_CSS}
          />
        </section>

        <section className="space-y-4">
          <h2 id="palette">Palette</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {swatches.map((item) => (
              <Card key={item.name} size="sm" variant="secondary">
                <CardContent className="space-y-3">
                  <div
                    className={`h-14 rounded-xl ring-1 ring-foreground/10 ${item.swatch}`}
                  />
                  <CardDescription className="font-mono">
                    {item.name}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card size="sm" variant="secondary">
            <CardHeader>
              <CardTitle>Variables</CardTitle>
              <CardDescription>CSS names and where they land.</CardDescription>
            </CardHeader>
            <CardContent>
              {tokens.map(([token, meaning], index) => (
                <div key={token}>
                  {index > 0 ? <Separator className="my-3" /> : null}
                  <div className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:items-baseline">
                    <span className="font-mono text-xs">{token}</span>
                    <CardDescription>{meaning}</CardDescription>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 id="color">Color</h2>
          <p>
            The tokens above stay on paper.{" "}
            <Link href="/docs/components/badge">Badge</Link>,{" "}
            <Link href="/docs/components/callout">Callout</Link>, and{" "}
            <Link href="/docs/components/tabs">Tabs</Link> share gray, indigo,
            cyan, orange, crimson, and jade.{" "}
            <Link href="/docs/components/data-list">Data List</Link> labels use
            that set, except jade. Each hue lives in the sheet:{" "}
            <code>--indigo-ink</code> for type, <code>--indigo-wash</code> for
            a soft badge, <code>--indigo-panel</code> for a callout,{" "}
            <code>--indigo-solid</code> for a filled badge. Cyan, orange,
            crimson, and jade use the same suffixes.
          </p>
          <Preview className="flex-col gap-3">
            <div className="flex flex-wrap justify-center gap-2">
              {hues.map((hue) => (
                <Badge key={hue} color={hue}>
                  {hueLabel[hue]}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {hues.map((hue) => (
                <Badge key={hue} color={hue} highContrast>
                  {hueLabel[hue]}
                </Badge>
              ))}
            </div>
          </Preview>
          <p>
            The first row is soft: a tint and saturated type.{" "}
            <code>highContrast</code> fills the badge and deepens a callout or
            a tab line. Gray stays on the paper tokens.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="type">Typography</h2>
          <div className="grid gap-4">
            {typefaces.map((face) => (
              <Card key={face.sample} size="sm" variant="secondary">
                <CardHeader>
                  <CardTitle>{face.sample}</CardTitle>
                  <CardDescription>{face.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl ${face.className}`}>
                    The quick brown fox
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="theming">Theme</h2>
          <Card size="sm" variant="secondary">
            <CardHeader>
              <CardTitle>.dark class</CardTitle>
              <CardDescription>
                Dark mode is the{" "}
                <Badge variant="outline">.dark</Badge> class on{" "}
                <Badge variant="outline">html</Badge>.{" "}
                <Link href="/docs/installation#layout">Installation</Link> sets it
                up with <code>next-themes</code>;{" "}
                <Link href="/docs/components/theme-toggle">Theme Toggle</Link>{" "}
                follows the system preference, then a manual choice.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </>
  )
}
