import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
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
  ["--destructive", "Error, delete"],
  ["--new", "Novelty indicator"],
  ["--radius", "0.625rem — pills scale from this"],
  ["--sidebar", "Docs sidebar surface"],
]

const typefaces = [
  {
    sample: "Inter",
    className: "font-sans",
    role: "font-sans — UI and body",
  },
  {
    sample: "Fraunces",
    className: "font-serif",
    role: "font-serif — wordmark only",
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
          { id: "type", text: "Typography", level: 2 },
          { id: "theming", text: "Theme", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Foundations"
          title="Styles"
          description="Warm-tinted monochrome. Paper, black, greys. No blue or violet accent."
        />

        <section className="space-y-4">
          <h2 id="copy">Copy</h2>
          <p>
            Full token sheet for your global CSS — <code>:root</code>,{" "}
            <code>.dark</code>, and the Tailwind <code>@theme</code> map.
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
                <Badge variant="outline">html</Badge>. next-themes reads the
                system preference.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </>
  )
}
