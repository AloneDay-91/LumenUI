import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function CardPage() {
  const componentCode = `import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`;

  const usageCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Titre de la carte</CardTitle>
        <CardDescription>Description de la carte</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Contenu de la carte.</p>
      </CardContent>
    </Card>
  );
}`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "card", text: "Card", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "examples", text: "Exemples", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Composants</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Card</span>
        </div>

        <div className="space-y-4">
          <h1 id="card" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Card
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un composant carte flexible pour afficher du contenu et des actions.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-8 flex items-center justify-center">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Titre de la carte</CardTitle>
                <CardDescription>Description de la carte</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenu de la carte.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <section className="space-y-4">
          <h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Copiez et collez le code suivant dans votre projet :
          </p>

          <CodeBlock code={componentCode} filename="components/ui/Card.tsx" language="tsx" />
        </section>

        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Utilisation
          </h2>

          <CodeBlock code={usageCode} filename="app/page.tsx" language="tsx" />
        </section>

        <section className="space-y-4">
          <h2 id="examples" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Exemples
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Carte simple</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex justify-center">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Vous avez 3 messages non lus.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Vos dernières notifications apparaîtront ici.</p>
                  </CardContent>
                </Card>
              </div>
              <CodeBlock code={`<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>Vous avez 3 messages non lus.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Vos dernières notifications apparaîtront ici.</p>
  </CardContent>
</Card>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Carte avec footer</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex justify-center">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>Créer un projet</CardTitle>
                    <CardDescription>Déployez votre nouveau projet en un clic.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Configurez les paramètres de votre projet ci-dessous.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Annuler</Button>
                    <Button>Déployer</Button>
                  </CardFooter>
                </Card>
              </div>
              <CodeBlock code={`<Card>
  <CardHeader>
    <CardTitle>Créer un projet</CardTitle>
    <CardDescription>Déployez votre nouveau projet en un clic.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Configurez les paramètres de votre projet ci-dessous.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Annuler</Button>
    <Button>Déployer</Button>
  </CardFooter>
</Card>`} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
