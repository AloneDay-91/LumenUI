import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import HeadingsSetter from "@/components/docs/HeadingsSetter";

export default function AlertPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "alert", text: "Alert", level: 1 },
          { id: "usage", text: "Usage", level: 2 },
          { id: "variants", text: "Variants", level: 2 },
          { id: "examples", text: "Examples", level: 2 },
          { id: "api-reference", text: "API Reference", level: 2 },
        ]}
      />

      <div className="space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Components</span>
          <span className="inline-block h-4 w-px bg-muted-foreground/20" />
          <span className="font-medium text-foreground">Alert</span>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <h1 id="alert" className="scroll-m-20 text-4xl font-bold tracking-tight">
            Alert
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A versatile alert component to display important messages with different severity levels.
            Built with accessibility and user experience in mind.
          </p>
        </div>

        {/* Usage */}
        <section className="space-y-4">
          <h2 id="usage" className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Usage
          </h2>
          <p className="text-muted-foreground leading-7">
            Import the Alert component and its sub-components to display notifications:
          </p>

          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
            <code className="text-sm font-mono">{`import { Alert, AlertTitle, AlertDescription } from '@lumen/ui';

export default function MyComponent() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
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
              <h3 className="text-lg font-semibold">Default</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert>
                  <AlertTitle>Default Alert</AlertTitle>
                  <AlertDescription>
                    This is a default alert message with neutral styling.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Success</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert variant="success">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved successfully.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Warning</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert variant="warning">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone. Please proceed with caution.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Destructive</h3>
              <div className="rounded-lg border border-border bg-card p-6">
                <Alert variant="destructive">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again later.
                  </AlertDescription>
                </Alert>
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
                  <th className="text-left p-4 font-semibold">Component</th>
                  <th className="text-left p-4 font-semibold">Prop</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">Alert</td>
                  <td className="p-4 font-mono text-sm">variant</td>
                  <td className="p-4 font-mono text-sm">
                    &quot;default&quot; | &quot;destructive&quot; | &quot;warning&quot; | &quot;success&quot; | &quot;info&quot;
                  </td>
                  <td className="p-4 font-mono text-sm">&quot;default&quot;</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-4 font-mono text-sm">AlertTitle</td>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">AlertDescription</td>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 font-mono text-sm">ReactNode</td>
                  <td className="p-4 font-mono text-sm">-</td>
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
                The Alert component includes proper ARIA attributes (role=&quot;alert&quot;) for screen readers.
                Icons are decorative and don&apos;t interfere with the message content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
