import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function ReactRouterGuidePage() {
  return (
    <FrameworkGuide
      title="React Router"
      description="Framework mode and Remix. The code lives in app/ behind the ~/ alias, so lumen.json points there."
      stack="react"
      headings={[
        { id: "config", text: "lumen.json", level: 2 },
        { id: "root", text: "Root layout", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="config">lumen.json</h2>
        <p>
          Run <code>init</code>, then point <code>lumen.json</code> at <code>app/</code> before
          adding components.
        </p>
        <CodeBlock
          filename="lumen.json"
          language="json"
          code={`{
  "aliases": { "ui": "~/components/ui", "lib": "~/lib" },
  "paths": { "ui": "app/components/ui", "lib": "app/lib" }
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="root">Root layout</h2>
        <CodeBlock
          filename="app/root.tsx"
          code={`import { Links, Meta, Scripts, ScrollRestoration } from "react-router"

import "./globals.css"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="root">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}`}
        />
        <p>
          The template already imports <code>app.css</code> with Tailwind: replace that import with{" "}
          <code>globals.css</code>, or move the Lumen sheet into <code>app.css</code>.
        </p>
      </section>
    </FrameworkGuide>
  )
}
