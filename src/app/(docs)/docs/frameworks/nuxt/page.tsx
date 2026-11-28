import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function NuxtGuidePage() {
  return (
    <FrameworkGuide
      title="Nuxt"
      description="Nuxt 4 with the Vue components. Tailwind runs through its Vite plugin, and the components are imported, not auto-registered."
      stack="vue"
      headings={[
        { id: "config", text: "lumen.json", level: 2 },
        { id: "tailwind", text: "Tailwind and the stylesheet", level: 2 },
        { id: "components", text: "Imports", level: 2 },
        { id: "root", text: "The root element", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="config">lumen.json</h2>
        <p>
          Nuxt 4 keeps the app in <code>app/</code>, and both <code>~/</code> and <code>@/</code>{" "}
          point there. Write <code>lumen.json</code> before <code>init</code> so the files land in
          the right folders.
        </p>
        <CodeBlock
          filename="lumen.json"
          language="json"
          code={`{
  "framework": "vue",
  "aliases": { "ui": "@/components/ui", "lib": "@/lib" },
  "paths": {
    "ui": "app/components/ui",
    "lib": "app/lib",
    "css": "app/assets/css/main.css"
  },
  "installed": []
}`}
        />
        <CodeBlock
          language="bash"
          code={`npm install -D @tailwindcss/vite
npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button dialog`}
        />
        <p>
          With <code>@tailwindcss/vite</code> installed, <code>init</code> skips{" "}
          <code>postcss.config.mjs</code>: the Vite plugin already runs Tailwind.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="tailwind">Tailwind and the stylesheet</h2>
        <CodeBlock
          filename="nuxt.config.ts"
          language="ts"
          code={`import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  // Lumen parts share names across folders (button/Button.vue…): import them instead.
  components: [{ path: "~/components", ignore: ["ui/**"] }],
})`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="components">Imports</h2>
        <p>
          Import each component from its folder, as in any Vue app. Reka UI renders on the server,
          so overlays and form controls work with SSR.
        </p>
        <CodeBlock
          filename="app/pages/index.vue"
          language="html"
          code={`<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
  <Button>Continue</Button>
</template>`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="root">The root element</h2>
        <CodeBlock
          filename="app/app.vue"
          language="html"
          code={`<template>
  <div class="root">
    <NuxtPage />
  </div>
</template>`}
        />
      </section>
    </FrameworkGuide>
  )
}
