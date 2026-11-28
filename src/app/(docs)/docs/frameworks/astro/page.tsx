import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function AstroGuidePage() {
  return (
    <FrameworkGuide
      title="Astro"
      description="React islands: the component runs on the client and the page around it stays static."
      stack="react"
      headings={[
        { id: "setup", text: "Setup", level: 2 },
        { id: "islands", text: "Islands", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="setup">Setup</h2>
        <p>
          Add the React integration first. Astro reads the <code>paths</code> of{" "}
          <code>tsconfig.json</code>, so the <code>@/</code> alias needs only one line.
        </p>
        <CodeBlock
          language="bash"
          code={`npx astro add react
npx @aloneday/lumenui@latest init`}
        />
        <CodeBlock
          filename="tsconfig.json"
          language="json"
          code={`{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="islands">Islands</h2>
        <p>
          Import the stylesheet in the layout. A component that reacts to clicks or keys needs a{" "}
          <code>client:</code> directive; a static one, like Badge or Card, does not.
        </p>
        <CodeBlock
          filename="src/pages/index.astro"
          code={`---
import "../app/globals.css"
import { Button } from "@/components/ui/Button"
---

<div class="root">
  <Button client:load>Continue</Button>
</div>`}
        />
      </section>
    </FrameworkGuide>
  )
}
