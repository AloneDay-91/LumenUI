import HeadingsSetter from "@/components/docs/HeadingsSetter"
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
  ["--background", "Fond papier / #111"],
  ["--foreground", "Texte principal"],
  ["--card", "Surfaces Card, Alert"],
  ["--primary", "Actions, inversion"],
  ["--muted", "Surfaces secondaires"],
  ["--muted-foreground", "Métadonnées, dates"],
  ["--border", "Dividers, contours"],
  ["--ring", "Focus clavier"],
  ["--destructive", "Erreur, suppression"],
  ["--radius", "0.625rem"],
]

const typefaces = [
  {
    sample: "Inter",
    className: "font-sans",
    role: "font-sans — interface et corps",
  },
  {
    sample: "Fraunces",
    className: "font-serif",
    role: "font-serif — wordmark seulement",
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
          { id: "palette", text: "Palette", level: 2 },
          { id: "typo", text: "Typographie", level: 2 },
          { id: "theming", text: "Thème", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Fondations"
          title="Styles"
          description="Palette monochrome teintée chaud. Un fond papier, un noir, des gris. Aucun accent bleu ou violet."
        />

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
              <CardDescription>
                Noms CSS et rôle dans l&apos;interface.
              </CardDescription>
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
          <h2 id="typo">Typographie</h2>
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
          <h2 id="theming">Thème</h2>
          <Card size="sm" variant="secondary">
            <CardHeader>
              <CardTitle>Classe .dark</CardTitle>
              <CardDescription>
                Le mode sombre s&apos;active avec la classe{" "}
                <Badge variant="outline">.dark</Badge> sur{" "}
                <Badge variant="outline">html</Badge>. next-themes gère la
                préférence système.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </>
  )
}
