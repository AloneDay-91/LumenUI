import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function LabelPage() {
  const componentCode = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }`;

  const usageCode = `import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";

export default function Example() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  );
}`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "label", text: "Label", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "examples", text: "Exemples", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Composants</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Label</span>
        </div>

        <div className="space-y-4">
          <h1 id="label" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Label
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un composant label accessible pour les formulaires.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-8">
            <div className="space-y-2 max-w-sm">
              <Label htmlFor="example">Email</Label>
              <Input id="example" type="email" placeholder="email@example.com" />
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Copiez et collez le code suivant dans votre projet :
          </p>

          <CodeBlock code={componentCode} filename="components/ui/Label.tsx" language="tsx" />
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
              <h3 className="text-lg font-semibold">Formulaire avec plusieurs champs</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <form className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Input id="message" placeholder="Votre message" />
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
