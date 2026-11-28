import { CodeBlock } from "@/components/docs/CodeBlock"
import { FrameworkGuide } from "@/components/docs/FrameworkGuide"

export default function ViteGuidePage() {
  return (
    <FrameworkGuide
      title="Vite"
      description="A React app with Tailwind CSS 4. Vite reads the PostCSS config that init writes, so Tailwind needs no plugin."
      stack="react"
      headings={[
        { id: "create", text: "Create the app", level: 2 },
        { id: "alias", text: "The @/ alias", level: 2 },
        { id: "entry", text: "Entry", level: 2 },
      ]}
    >
      <section className="space-y-4">
        <h2 id="create">Create the app</h2>
        <p>Start from the React TypeScript template.</p>
        <CodeBlock
          language="bash"
          code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D @types/node`}
        />
      </section>

      <section className="space-y-4">
        <h2 id="alias">The @/ alias</h2>
        <p>
          Add it to Vite and to TypeScript, then run <code>init</code>.
        </p>
        <CodeBlock
          filename="vite.config.ts"
          language="ts"
          code={`import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
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
        <CodeBlock language="bash" code={`npx @aloneday/lumenui@latest init`} />
      </section>

      <section className="space-y-4">
        <h2 id="entry">Entry</h2>
        <p>Import the stylesheet in the entry and wrap the app.</p>
        <CodeBlock
          filename="src/main.tsx"
          code={`import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./app/globals.css"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="root">
      <App />
    </div>
  </StrictMode>
)`}
        />
      </section>
    </FrameworkGuide>
  )
}
