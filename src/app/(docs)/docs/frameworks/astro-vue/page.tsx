import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function AstroVueGuidePage() {
  return (
    <FrameworkGuide
      title="Astro + Vue"
      description="Vue islands in an Astro site. A compound component (a dialog and its trigger) has to live in one island, so wrap it in a .vue file."
      stack="vue"
      headings={[
        { id: "setup", text: "Setup", level: 2 },
        { id: "islands", text: "Islands", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="setup">Setup</h2>
        <p>
          Add Vue and Tailwind to Astro, map <code>@/</code> in <code>tsconfig.json</code>, then
          point <code>lumen.json</code> at Astro&apos;s stylesheet.
        </p>
        <CodeBlock language="bash" code={`npx astro add vue tailwind`} />
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
        <CodeBlock
          filename="lumen.json"
          language="json"
          code={`{
  "framework": "vue",
  "aliases": { "ui": "@/components/ui", "lib": "@/lib" },
  "paths": {
    "ui": "src/components/ui",
    "lib": "src/lib",
    "css": "src/styles/global.css"
  },
  "installed": []
}`}
        />
        <CodeBlock
          language="bash"
          code={`npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button dialog`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="islands">Islands</h2>
        <p>
          Astro renders each island on its own, and parts like <code>DialogTrigger</code> need their
          parent <code>Dialog</code> in the same Vue tree. Compose them in a <code>.vue</code> file
          and hydrate that file.
        </p>
        <CodeBlock
          filename="src/components/Welcome.vue"
          language="html"
          code={`<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button>Open</Button></DialogTrigger>
    <DialogContent><DialogTitle>Hello</DialogTitle></DialogContent>
  </Dialog>
</template>`}
        />
        <CodeBlock
          filename="src/pages/index.astro"
          code={`---
import "../styles/global.css"
import Welcome from "../components/Welcome.vue"
---

<div class="root">
  <Welcome client:load />
</div>`}
        />
      </section>
    </FrameworkGuide>
  )
}
