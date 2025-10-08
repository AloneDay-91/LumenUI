import React from "react";
import { Badge } from "@/components/ui/Badge";
import HeadingsSetter from "@/components/docs/HeadingsSetter";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function BadgePage() {
  const componentCode = `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:opacity-80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:opacity-80",
        destructive:
          "border-transparent bg-destructive text-primary-foreground hover:opacity-80",
        outline: "text-foreground border-border",
        success:
          "border-transparent bg-green-500 text-white hover:opacity-80",
        warning:
          "border-transparent bg-yellow-500 text-white hover:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`;

  const usageCode = `import { Badge } from "@/components/ui/Badge";

export default function Example() {
  return <Badge>Default Badge</Badge>;
}`;

  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "badge", text: "Badge", level: 1 },
          { id: "installation", text: "Installation", level: 2 },
          { id: "usage", text: "Utilisation", level: 2 },
          { id: "variants", text: "Variantes", level: 2 },
          { id: "examples", text: "Exemples", level: 2 },
        ]}
      />

      <div className="space-y-8">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Composants</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Badge</span>
        </div>

        <div className="space-y-4">
          <h1 id="badge" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Badge
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Un composant badge pour afficher des statuts, des étiquettes ou des informations compactes.
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-8 flex items-center justify-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
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

          <CodeBlock code={componentCode} filename="components/ui/Badge.tsx" language="tsx" />
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

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Default</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <Badge>Default</Badge>
              </div>
              <CodeBlock code={`<Badge>Default</Badge>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Secondary</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <Badge variant="secondary">Secondary</Badge>
              </div>
              <CodeBlock code={`<Badge variant="secondary">Secondary</Badge>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Destructive</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <CodeBlock code={`<Badge variant="destructive">Destructive</Badge>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Outline</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <Badge variant="outline">Outline</Badge>
              </div>
              <CodeBlock code={`<Badge variant="outline">Outline</Badge>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Success</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <Badge variant="success">Success</Badge>
              </div>
              <CodeBlock code={`<Badge variant="success">Success</Badge>`} />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Warning</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <Badge variant="warning">Warning</Badge>
              </div>
              <CodeBlock code={`<Badge variant="warning">Warning</Badge>`} />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 id="examples" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Exemples
          </h2>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Indicateurs de statut</h3>
            <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <Badge variant="warning">Pending</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <Badge variant="destructive">Inactive</Badge>
              </div>
            </div>
            <CodeBlock code={`<div className="flex items-center gap-2">
  <span>Status:</span>
  <Badge variant="success">Active</Badge>
</div>`} />
          </div>
        </section>
      </div>
    </>
  );
}
