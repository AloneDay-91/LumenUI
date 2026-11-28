import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function TanStackStartGuidePage() {
  return (
    <FrameworkGuide
      title="TanStack Start"
      description="A React Start app. The code lives in src/ behind the ~/ alias, and the root route loads the stylesheet."
      stack="react"
      headings={[
        { id: "config", text: "lumen.json", level: 2 },
        { id: "root", text: "Root route", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="config">lumen.json</h2>
        <CodeBlock
          filename="lumen.json"
          language="json"
          code={`{
  "aliases": { "ui": "~/components/ui", "lib": "~/lib" },
  "paths": { "ui": "src/components/ui", "lib": "src/lib" }
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="root">Root route</h2>
        <CodeBlock
          filename="src/routes/__root.tsx"
          code={`import { createRootRoute } from "@tanstack/react-router"

import appCss from "~/app/globals.css?url"

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
})`}
        />
        <p>
          Wrap the <code>Outlet</code> of the root component in{" "}
          <code>{`<div className="root">`}</code>.
        </p>
      </section>
    </FrameworkGuide>
  )
}
