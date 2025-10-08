import React from "react";
import { Button } from "@/components/ui/Button";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

export default function ButtonPage() {
  const componentCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        destructive: "bg-destructive text-primary-foreground hover:opacity-90",
        secondary: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-foreground/80 underline-offset-4 hover:text-foreground hover:underline",
        outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`;

  const usageCode = `import { Button } from "@/components/ui/Button";

export default function Example() {
  return (
    <Button onClick={() => console.log('Cliqué !')}>
      Cliquez-moi
    </Button>
  );
}`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "button", text: "Button", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "variants", text: "Variantes", level: 2 },
          { id: "sizes", text: "Tailles", level: 2 },
          { id: "states", text: "États", level: 2 },
          { id: "api-reference", text: "Référence API", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Composants</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Button</span>
        </div>

        <div className="space-y-4">
          <h1 id="button" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Button
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un composant bouton cliquable qui supporte plusieurs variantes, tailles et états.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-8 flex items-center justify-center">
            <Button>Cliquez-moi</Button>
          </div>
        </div>

        <section className="space-y-4">
          <h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Copiez et collez le code suivant dans votre projet :
          </p>

          <CodeBlock code={componentCode} filename="components/ui/Button.tsx" language="tsx" />
        </section>

        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Utilisation
          </h2>

          <CodeBlock code={usageCode} filename="app/page.tsx" language="tsx" />
        </section>

        <section className="space-y-4">
          <h2 id="variants" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Variantes
          </h2>
          <p className="text-muted-foreground leading-7">
            Le composant Button supporte différents styles visuels pour correspondre à vos besoins de design :
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Primary</h3>
              <p className="text-sm text-muted-foreground">
                La variante de bouton par défaut pour les actions principales.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="default">Bouton Principal</Button>
              </div>
              <CodeBlock code={`<Button variant="default">Bouton Principal</Button>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Secondary</h3>
              <p className="text-sm text-muted-foreground">
                Une variante de bouton subtile pour les actions secondaires.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="secondary">Bouton Secondaire</Button>
              </div>
              <CodeBlock code={`<Button variant="secondary">Bouton Secondaire</Button>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Outline</h3>
              <p className="text-sm text-muted-foreground">
                Un bouton avec fond transparent et bordure visible.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="outline">Bouton Outline</Button>
              </div>
              <CodeBlock code={`<Button variant="outline">Bouton Outline</Button>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Ghost</h3>
              <p className="text-sm text-muted-foreground">
                Un bouton minimal sans fond ni bordure.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="ghost">Bouton Ghost</Button>
              </div>
              <CodeBlock code={`<Button variant="ghost">Bouton Ghost</Button>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Destructive</h3>
              <p className="text-sm text-muted-foreground">
                Une variante de bouton pour les actions destructives comme supprimer.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="destructive">Supprimer</Button>
              </div>
              <CodeBlock code={`<Button variant="destructive">Supprimer</Button>`} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="sizes" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Tailles
          </h2>
          <p className="text-muted-foreground leading-7">
            Choisissez parmi différentes tailles de bouton pour s&apos;adapter à votre mise en page :
          </p>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Button size="sm">Petit</Button>
              <Button size="default">Défaut</Button>
              <Button size="lg">Grand</Button>
            </div>
          </div>

          <CodeBlock code={`<Button size="sm">Petit</Button>
<Button size="default">Défaut</Button>
<Button size="lg">Grand</Button>`} />
        </section>

        <section className="space-y-4">
          <h2 id="states" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            États
          </h2>
          <p className="text-muted-foreground leading-7">
            Les boutons supportent différents états pour une meilleure interaction utilisateur :
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Désactivé</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4 justify-center">
                <Button disabled>Bouton Désactivé</Button>
                <Button variant="outline" disabled>Outline Désactivé</Button>
              </div>
              <CodeBlock code={`<Button disabled>Bouton Désactivé</Button>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Chargement</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button disabled>
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Chargement...
                </Button>
              </div>
              <CodeBlock code={`<Button disabled>
  <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />
  Chargement...
</Button>`} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="api-reference" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Référence API
          </h2>
          <p className="text-muted-foreground leading-7">
            Liste complète des props et leurs descriptions :
          </p>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Prop</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Défaut</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">variant</td>
                  <td className="p-4 font-mono text-sm">
                    &quot;default&quot; | &quot;secondary&quot; | &quot;outline&quot; | &quot;ghost&quot; | &quot;destructive&quot;
                  </td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot;</td>
                  <td className="p-4 text-sm text-muted-foreground">La variante de style visuel</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">size</td>
                  <td className="p-4 font-mono text-sm">&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot;</td>
                  <td className="p-4 text-sm text-muted-foreground">La taille du bouton</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">disabled</td>
                  <td className="p-4 font-mono text-sm">boolean</td>
                  <td className="p-4 font-mono text-sm">false</td>
                  <td className="p-4 text-sm text-muted-foreground">Si le bouton est désactivé</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">onClick</td>
                  <td className="p-4 font-mono text-sm">() =&gt; void</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Gestionnaire d&apos;événement de clic</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Contenu du bouton</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Alert variant="default">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <AlertTitle>Accessibilité</AlertTitle>
          <AlertDescription>
            Tous les boutons incluent les attributs ARIA appropriés et le support de la navigation au clavier.
            Les indicateurs de focus et la compatibilité avec les lecteurs d&apos;écran sont intégrés.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
