import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import HeadingsSetter from "@/components/docs/HeadingsSetter";

export default function CardPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "card", text: "Card", level: 1 },
          { id: "usage", text: "Usage", level: 2 },
          { id: "examples", text: "Examples", level: 2 },
          { id: "api-reference", text: "API Reference", level: 2 },
        ]}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Components</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Card</span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 id="card" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Card
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A flexible container component that groups related content and actions.
            Perfect for displaying structured information with consistent styling.
          </p>
        </div>

        {/* Usage */}
        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Usage
          </h2>
          <p className="text-muted-foreground leading-7">
            Import the Card component and use it to group related content:
          </p>

          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono">{`import { Card } from '@lumen/ui';

export default function MyComponent() {
  return (
    <Card>
      <div className="p-6">
        <h3 className="font-semibold">Title</h3>
        <p className="text-muted-foreground">Description</p>
      </div>
    </Card>
  );
}`}</code>
          </pre>
        </section>

        {/* Examples */}
        <section className="space-y-4">
          <h2 id="examples" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Examples
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Simple Card</h3>
              <p className="text-sm text-muted-foreground">
                A basic card with minimal content and clean styling.
              </p>
              <div className="rounded-lg border border-border bg-muted/30 p-6 flex items-center justify-center">
                <Card className="max-w-sm">
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Simple Card</h3>
                    <p className="text-muted-foreground text-sm">
                      A basic card with minimal content and clean styling.
                    </p>
                  </div>
                </Card>
              </div>
              <pre className="bg-muted border border-border rounded-lg p-3 text-sm">
                <code>&lt;Card className=&quot;max-w-sm&quot;&gt;...&lt;/Card&gt;</code>
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Card with Actions</h3>
              <p className="text-sm text-muted-foreground">
                A card with action buttons for interactive content.
              </p>
              <div className="rounded-lg border border-border bg-muted/30 p-6 flex items-center justify-center">
                <Card className="max-w-sm">
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">Product Card</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      A card with action buttons for interactive content.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">Buy Now</Button>
                      <Button variant="outline" size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="space-y-4">
          <h2 id="api-reference" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            API Reference
          </h2>

          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Prop</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Default</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Card content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
