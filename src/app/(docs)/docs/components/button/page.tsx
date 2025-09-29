import React from "react";
import { Button } from "@/components/ui/Button";
import HeadingsSetter from "@/components/docs/HeadingsSetter";

export default function ButtonPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "button", text: "Button", level: 1 },
          { id: "usage", text: "Usage", level: 2 },
          { id: "variants", text: "Variants", level: 2 },
          { id: "sizes", text: "Sizes", level: 2 },
          { id: "states", text: "States", level: 2 },
          { id: "api-reference", text: "API Reference", level: 2 },
        ]}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Components</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Button</span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 id="button" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Button
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A clickable button component that supports multiple variants, sizes, and states.
            Built with accessibility and user experience in mind.
          </p>
        </div>

        {/* Usage */}
        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Usage
          </h2>
          <p className="text-muted-foreground leading-7">
            Import the Button component and use it in your React application:
          </p>

          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono">{`import { Button } from '@lumen/ui';

export default function MyComponent() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}`}</code>
          </pre>
        </section>

        {/* Variants */}
        <section className="space-y-4">
          <h2 id="variants" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Variants
          </h2>
          <p className="text-muted-foreground leading-7">
            The Button component supports different visual styles to match your design needs:
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Primary</h3>
              <p className="text-sm text-muted-foreground">
                The default button variant for primary actions.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="default">Primary Button</Button>
              </div>
              <pre className="bg-muted border border-border rounded-lg p-3 text-sm">
                <code>&lt;Button variant=&quot;default&quot;&gt;Primary Button&lt;/Button&gt;</code>
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Secondary</h3>
              <p className="text-sm text-muted-foreground">
                A subtle button variant for secondary actions.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="secondary">Secondary Button</Button>
              </div>
              <pre className="bg-muted border border-border rounded-lg p-3 text-sm">
                <code>&lt;Button variant=&quot;secondary&quot;&gt;Secondary Button&lt;/Button&gt;</code>
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Outline</h3>
              <p className="text-sm text-muted-foreground">
                A button with transparent background and visible border.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="outline">Outline Button</Button>
              </div>
              <pre className="bg-muted border border-border rounded-lg p-3 text-sm">
                <code>&lt;Button variant=&quot;outline&quot;&gt;Outline Button&lt;/Button&gt;</code>
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Ghost</h3>
              <p className="text-sm text-muted-foreground">
                A minimal button with no background or border.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="ghost">Ghost Button</Button>
              </div>
              <pre className="bg-muted border border-border rounded-lg p-3 text-sm">
                <code>&lt;Button variant=&quot;ghost&quot;&gt;Ghost Button&lt;/Button&gt;</code>
              </pre>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Destructive</h3>
              <p className="text-sm text-muted-foreground">
                A button variant for destructive actions like delete or remove.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Button variant="destructive">Delete</Button>
              </div>
              <pre className="bg-muted border border-border rounded-lg p-3 text-sm">
                <code>&lt;Button variant=&quot;destructive&quot;&gt;Delete&lt;/Button&gt;</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-4">
          <h2 id="sizes" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Sizes
          </h2>
          <p className="text-muted-foreground leading-7">
            Choose from different button sizes to fit your layout:
          </p>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4 flex-wrap">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono">{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}</code>
          </pre>
        </section>

        {/* States */}
        <section className="space-y-4">
          <h2 id="states" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            States
          </h2>
          <p className="text-muted-foreground leading-7">
            Buttons support different states for better user interaction:
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Disabled</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center gap-4">
                <Button disabled>Disabled Button</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
              </div>
              <pre className="bg-muted border border-border rounded-lg p-3 text-sm">
                <code>&lt;Button disabled&gt;Disabled Button&lt;/Button&gt;</code>
              </pre>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="space-y-4">
          <h2 id="api-reference" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            API Reference
          </h2>
          <p className="text-muted-foreground leading-7">
            Complete list of props and their descriptions:
          </p>

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
                  <td className="p-4 font-mono text-sm">variant</td>
                  <td className="p-4 font-mono text-sm">
                    &quot;default&quot; | &quot;secondary&quot; | &quot;outline&quot; | &quot;ghost&quot; | &quot;destructive&quot;
                  </td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot;</td>
                  <td className="p-4 text-sm text-muted-foreground">The visual style variant</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">size</td>
                  <td className="p-4 font-mono text-sm">&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot;</td>
                  <td className="p-4 text-sm text-muted-foreground">The size of the button</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">disabled</td>
                  <td className="p-4 font-mono text-sm">boolean</td>
                  <td className="p-4 font-mono text-sm">false</td>
                  <td className="p-4 text-sm text-muted-foreground">Whether the button is disabled</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">onClick</td>
                  <td className="p-4 font-mono text-sm">() =&gt; void</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Click event handler</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Button content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Accessibility Callout */}
        <div className="docs-callout info">
          <div className="flex items-start space-x-3">
            <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Accessibility
              </p>
              <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                All buttons include proper ARIA attributes and keyboard navigation support.
                Focus indicators and screen reader compatibility are built-in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
