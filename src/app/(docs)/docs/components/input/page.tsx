import React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function InputPage() {
  const componentCode = `import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`;

  const usageCode = `import { Input } from "@/components/ui/Input";

export default function Example() {
  return <Input type="email" placeholder="Email" />;
}`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "input", text: "Input", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "examples", text: "Exemples", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Composants</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Input</span>
        </div>

        <div className="space-y-4">
          <h1 id="input" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Input
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un composant input pour la saisie de texte dans les formulaires.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-8">
            <Input type="email" placeholder="Email" className="max-w-sm" />
          </div>
        </div>

        <section className="space-y-4">
          <h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Copiez et collez le code suivant dans votre projet :
          </p>

          <CodeBlock code={componentCode} filename="components/ui/Input.tsx" language="tsx" />
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
              <h3 className="text-lg font-semibold">Avec Label</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="space-y-2 max-w-sm">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
              </div>
              <CodeBlock code={`<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Désactivé</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Input disabled type="email" placeholder="Email" className="max-w-sm" />
              </div>
              <CodeBlock code={`<Input disabled type="email" placeholder="Email" />`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Différents types</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="space-y-4 max-w-sm">
                  <Input type="text" placeholder="Texte" />
                  <Input type="email" placeholder="Email" />
                  <Input type="password" placeholder="Mot de passe" />
                  <Input type="number" placeholder="Nombre" />
                  <Input type="date" />
                </div>
              </div>
              <CodeBlock code={`<Input type="text" placeholder="Texte" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Mot de passe" />
<Input type="number" placeholder="Nombre" />
<Input type="date" />`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Formulaire complet</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <form className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-form">Email</Label>
                    <Input id="email-form" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+33 6 12 34 56 78" />
                  </div>
                </form>
              </div>
              <CodeBlock code={`<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Nom</Label>
    <Input id="name" placeholder="Votre nom" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="email@example.com" />
  </div>
</form>`} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
