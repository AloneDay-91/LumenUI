import React from "react";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function SelectPage() {
  const componentCode = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
)

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(selectVariants(), className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

export { Select }`;

  const usageCode = `import { Select } from "@/components/ui/Select";

export default function Example() {
  return (
    <Select>
      <option value="">Sélectionner une option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  );
}`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "select", text: "Select", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "examples", text: "Exemples", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Composants</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Select</span>
        </div>

        <div className="space-y-4">
          <h1 id="select" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Select
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un composant select natif stylisé pour les formulaires.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-8">
            <Select className="max-w-sm">
              <option value="">Sélectionner une option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
          </div>
        </div>

        <section className="space-y-4">
          <h2 id="installation" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <p className="text-muted-foreground leading-7">
            Copiez et collez le code suivant dans votre projet :
          </p>

          <CodeBlock code={componentCode} filename="components/ui/Select.tsx" language="tsx" />
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
                  <Label htmlFor="country">Pays</Label>
                  <Select id="country">
                    <option value="">Sélectionner un pays</option>
                    <option value="fr">France</option>
                    <option value="be">Belgique</option>
                    <option value="ch">Suisse</option>
                    <option value="ca">Canada</option>
                  </Select>
                </div>
              </div>
              <CodeBlock code={`<div className="space-y-2">
  <Label htmlFor="country">Pays</Label>
  <Select id="country">
    <option value="">Sélectionner un pays</option>
    <option value="fr">France</option>
    <option value="be">Belgique</option>
    <option value="ch">Suisse</option>
  </Select>
</div>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Désactivé</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Select disabled className="max-w-sm">
                  <option>Option désactivée</option>
                </Select>
              </div>
              <CodeBlock code={`<Select disabled>
  <option>Option désactivée</option>
</Select>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Formulaire complet</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <form className="space-y-4 max-w-sm">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select id="category">
                      <option value="">Choisir une catégorie</option>
                      <option value="tech">Technologie</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select id="priority">
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </Select>
                  </div>
                </form>
              </div>
              <CodeBlock code={`<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="category">Catégorie</Label>
    <Select id="category">
      <option value="">Choisir une catégorie</option>
      <option value="tech">Technologie</option>
      <option value="design">Design</option>
    </Select>
  </div>
</form>`} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
