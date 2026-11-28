import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function LaravelGuidePage() {
  return (
    <FrameworkGuide
      title="Laravel + Inertia"
      description="The Laravel Vue starter kit. Its own shadcn-vue components live in components/ui, so Lumen goes next to them in components/lumen."
      stack="vue"
      headings={[
        { id: "config", text: "lumen.json", level: 2 },
        { id: "install", text: "Install", level: 2 },
        { id: "root", text: "The root element", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="config">lumen.json</h2>
        <p>
          The starter kit maps <code>@/</code> to <code>resources/js</code> and already uses{" "}
          <code>resources/js/components/ui</code>. Give Lumen its own folder, and point the sheet at{" "}
          <code>resources/css/app.css</code>.
        </p>
        <CodeBlock
          filename="lumen.json"
          language="json"
          code={`{
  "framework": "vue",
  "aliases": { "ui": "@/components/lumen", "lib": "@/lib" },
  "paths": {
    "ui": "resources/js/components/lumen",
    "lib": "resources/js/lib",
    "css": "resources/css/app.css"
  },
  "installed": []
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="install">Install</h2>
        <CodeBlock
          language="bash"
          code={`laravel new my-app   # pick the Vue starter kit
cd my-app
npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button dialog`}
        />
        <p>
          The kit runs Tailwind through <code>@tailwindcss/vite</code>, so <code>init</code> writes
          no PostCSS config. It replaces <code>app.css</code> with the Lumen sheet and keeps the
          previous one as <code>app.css.bak</code>: the kit&apos;s shadcn-vue components read the
          same token names, so they take the Lumen look too. Copy back any rule of your own from the
          backup.
        </p>
        <p>
          <code>utils.ts</code> already exists in the kit with the same <code>cn()</code>, so{" "}
          <code>init</code> leaves it alone.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="root">The root element</h2>
        <p>Wrap the layout every page uses.</p>
        <CodeBlock
          filename="resources/js/layouts/AppLayout.vue"
          language="html"
          code={`<template>
  <div class="root">
    <slot />
  </div>
</template>`}
        />
        <CodeBlock
          filename="resources/js/pages/Dashboard.vue"
          language="html"
          code={`<script setup lang="ts">
import { Button } from "@/components/lumen/button"
</script>`}
        />
      </section>
    </FrameworkGuide>
  )
}
