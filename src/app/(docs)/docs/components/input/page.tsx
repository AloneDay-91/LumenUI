import React from "react";
import { Input } from "@/components/ui/Input";
import HeadingsSetter from "@/components/docs/HeadingsSetter";

export default function InputPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "input", text: "Input", level: 1 },
          { id: "usage", text: "Usage", level: 2 },
          { id: "variants", text: "Variants", level: 2 },
          { id: "states", text: "States", level: 2 },
          { id: "api-reference", text: "API Reference", level: 2 },
        ]}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Components</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Input</span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 id="input" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Input
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A form input component that captures user input with consistent styling and validation support.
            Built with accessibility and user experience in mind.
          </p>
        </div>

        {/* Usage */}
        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Usage
          </h2>
          <p className="text-muted-foreground leading-7">
            Import the Input component and use it in your forms:
          </p>

          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono">{`import { Input } from '@lumen/ui';

export default function MyForm() {
  return (
    <form>
      <Input 
        type="email"
        placeholder="Enter your email"
        onChange={(e) => console.log(e.target.value)}
      />
    </form>
  );
}`}</code>
          </pre>
        </section>

        {/* Variants */}
        <section className="space-y-4">
          <h2 id="variants" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Variants
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Text Input</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Input placeholder="Enter text..." className="max-w-sm" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Email Input</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Input type="email" placeholder="Enter your email..." className="max-w-sm" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Password Input</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Input type="password" placeholder="Enter password..." className="max-w-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="space-y-4">
          <h2 id="states" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            States
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Disabled</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <Input placeholder="Disabled input..." disabled className="max-w-sm" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">With Error</h3>
              <div className="rounded-lg border border-border bg-card p-6 flex items-center justify-center">
                <div className="space-y-2">
                  <Input placeholder="Invalid input..." className="border-red-500 focus:border-red-500 max-w-sm" />
                  <p className="text-sm text-red-600">This field is required</p>
                </div>
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
                  <td className="p-4 font-mono text-sm">type</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">&quot;text&quot;</td>
                  <td className="p-4 text-sm text-muted-foreground">Input type (text, email, password, etc.)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">placeholder</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Placeholder text</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">disabled</td>
                  <td className="p-4 font-mono text-sm">boolean</td>
                  <td className="p-4 font-mono text-sm">false</td>
                  <td className="p-4 text-sm text-muted-foreground">Whether the input is disabled</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 font-mono text-sm">string</td>
                  <td className="p-4 font-mono text-sm">-</td>
                  <td className="p-4 text-sm text-muted-foreground">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
