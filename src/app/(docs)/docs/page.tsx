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
    description: "Variables CSS sémantiques, light et dark, sans bleu interactif.",
  },
  {
    title: "CVA",
    description: "Variants déclaratifs, classes fusionnées avec cn().",
  },
  {
    title: "Base UI",
    description: "Comportement accessible, non stylé. Le chrome est le vôtre.",
  },
  {
    title: "Copy-paste",
    description: "Vous ne consommez pas une librairie. Le code vit dans votre dépôt.",
  },
]

const start = [
  {
    href: "/docs/installation",
    title: "Installation",
    description: "Dépendances, tokens et utilitaire cn().",
  },
  {
    href: "/docs/styles",
    title: "Styles",
    description: "Palette, typographie et theming.",
  },
  {
    href: "/docs/components/button",
    title: "Button",
    description: "Premier composant à copier pour valider le pipeline.",
  },
  {
    href: "/exemples",
    title: "Exemples",
    description: "Bento d'usages, hors documentation.",
  },
  {
    href: "/docs/changelog",
    title: "Changelog",
    description: "Notes de version et nouveautés.",
  },
]

export default function DocsPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "documentation", text: "Documentation", level: 1 },
          { id: "approche", text: "Approche", level: 2 },
          { id: "commencer", text: "Commencer", level: 2 },
        ]}
      />

      <PageIntro
        eyebrow="Démarrage"
        title="Documentation"
        description="Lumen UI est un système de composants copy-paste. Les comportements viennent de Base UI. Le style vit dans votre dépôt."
      />

      <Alert>
        <AlertTitle>Copy-paste, pas une librairie</AlertTitle>
        <AlertDescription>
          Si vous démarrez, commencez par l&apos;installation. Pour le langage
          visuel, voir les styles. Le reste de la référence est dans le sommaire
          à gauche.
        </AlertDescription>
      </Alert>

      <h2 id="approche">Approche</h2>
      <p>
        Vous ne consommez pas une librairie de composants. Vous copiez le
        fichier. L&apos;architecture (CVA, tokens CSS, composition) suit le
        modèle de shadcn/ui, sans en reprendre le chrome.
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

      <h2 id="commencer">Commencer</h2>
      <p>Les fondations, le premier composant, et les notes de version.</p>
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
