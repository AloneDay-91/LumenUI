import Link from "next/link"

import { LandingShowcase } from "@/components/marketing/LandingShowcase"
import { buttonVariants } from "@/components/ui/button-variants"
import { Separator } from "@/components/ui/Separator"
import { docsSections } from "@/lib/docs-nav"
import { LANDING_MAX_WIDTH } from "@/lib/site"
import { cn } from "@/lib/utils"

const principles = [
  {
    period: "01",
    title: "Copy-paste",
    body: "Vous copiez le fichier. Il vit dans votre dépôt. Pas de paquet à versionner.",
  },
  {
    period: "02",
    title: "Base UI",
    body: "Focus, clavier, portails : le comportement vient des primitives. Le chrome est Lumen.",
  },
  {
    period: "03",
    title: "Même papier",
    body: "Tokens chauds, pills, Inter. Fraunces uniquement sur le wordmark.",
  },
  {
    period: "04",
    title: "Clavier d'abord",
    body: "Focus visible, états disabled, composition native. Rien n'est décoratif au détriment du clavier.",
  },
]

const componentItems =
  docsSections.find((section) => section.title === "Composants")?.items ?? []

export default function Home() {
  return (
    <main
      id="contenu"
      className={cn(
        "mx-auto w-full flex-1 px-6 pt-2 pb-10 md:px-12 md:py-16",
        LANDING_MAX_WIDTH
      )}
    >
      <section className="mb-10 max-w-3xl md:mb-14">
        <h1 className="mb-4 text-3xl leading-[1.15] font-medium tracking-tight text-pretty md:text-5xl">
          Le code vit dans votre dépôt.
        </h1>
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Lumen UI est un système copy-paste. Base UI gère le focus, le clavier
          et les portails. Le chrome — papier chaud, pills, pas de bleu —
          reste le vôtre.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/docs" className={cn(buttonVariants({ size: "lg" }))}>
            Documentation
          </Link>
          <Link
            href="/exemples"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            Exemples
          </Link>
        </div>
      </section>

      <LandingShowcase />

      <section className="mt-24 mb-24">
        <h2 className="mb-6 text-base font-medium tracking-tight text-foreground">
          Principes
        </h2>
        {principles.map((item, index) => (
          <div key={item.period}>
            <div className="grid gap-1 py-6 sm:grid-cols-[4.5rem_1fr]">
              <p className="font-mono text-xs text-muted-foreground">
                {item.period}
              </p>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </div>
            {index < principles.length - 1 ? <Separator /> : null}
          </div>
        ))}
      </section>

      <section className="mb-24">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2
            id="composants"
            className="text-base font-medium tracking-tight text-foreground"
          >
            Composants
          </h2>
          <p className="font-mono text-xs text-muted-foreground">
            {String(componentItems.length).padStart(2, "0")}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
          {componentItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 max-w-xl">
        <h2 className="mb-3 text-base font-medium tracking-tight text-foreground">
          Copier le premier fichier
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          Dépendances, tokens, puis Button. Le reste se copie à la demande.
        </p>
        <Link
          href="/docs/installation"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Installation
        </Link>
      </section>
    </main>
  )
}
