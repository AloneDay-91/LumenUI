import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function VueViteGuidePage() {
  return (
    <FrameworkGuide
      title="Vite + Vue"
      description="A Vue 3 app from create-vue or the Vite template. init finds the stylesheet main.ts already imports and puts Lumen in it."
      stack="vue"
      headings={[
        { id: "create-vue", text: "create-vue", level: 2 },
        { id: "vite-template", text: "Vite template", level: 2 },
        { id: "root", text: "The root element", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="create-vue">create-vue</h2>
        <p>
          The official scaffold sets up TypeScript and the <code>@/</code> alias. The CLI sees{" "}
          <code>vue</code> in <code>package.json</code> and copies the Vue components.
        </p>
        <CodeBlock
          language="bash"
          code={`npm create vue@latest my-app -- --typescript
cd my-app
npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button dialog`}
        />
        <p>
          <code>init</code> replaces <code>src/assets/main.css</code> with the Lumen sheet (the old
          one stays as <code>main.css.bak</code>) and writes <code>postcss.config.mjs</code>, which
          Vite reads.
        </p>
      </section>

      <section className="space-y-4">
        <h2 id="vite-template">Vite template</h2>
        <p>
          <code>npm create vite@latest -- --template vue-ts</code> has no alias. Add it to Vite and
          to <code>tsconfig.app.json</code> first; <code>init</code> then uses{" "}
          <code>src/style.css</code>.
        </p>
        <CodeBlock
          filename="vite.config.ts"
          language="ts"
          code={`import { fileURLToPath, URL } from "node:url"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
})`}
        />
        <CodeBlock
          filename="tsconfig.app.json"
          language="json"
          code={`{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="root">The root element</h2>
        <p>
          Put the <code>root</code> class on the element the app mounts in.
        </p>
        <CodeBlock
          filename="index.html"
          language="html"
          code={`<div id="app" class="root"></div>`}
        />
      </section>
    </FrameworkGuide>
  )
}
