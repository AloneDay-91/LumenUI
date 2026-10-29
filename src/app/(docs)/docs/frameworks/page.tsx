import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import { FrameworkMark } from "@/components/marketing/FrameworkMarks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { FRAMEWORKS } from "@/lib/site"

/** Section id for each framework in FRAMEWORKS. */
const anchor: Record<(typeof FRAMEWORKS)[number]["id"], string> = {
  next: "nextjs",
  vite: "vite",
  "react-router": "react-router",
  astro: "astro",
  tanstack: "tanstack-start",
}

export default function FrameworksPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "frameworks", text: "Frameworks", level: 1 },
          { id: "supported", text: "Supported", level: 2 },
          { id: "checklist", text: "What every app needs", level: 2 },
          { id: "nextjs", text: "Next.js", level: 2 },
          { id: "vite", text: "Vite", level: 2 },
          { id: "react-router", text: "React Router", level: 2 },
          { id: "astro", text: "Astro", level: 2 },
          { id: "tanstack-start", text: "TanStack Start", level: 2 },
          { id: "fonts", text: "Fonts without Next.js", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Getting started"
          title="Frameworks"
          description="The copied components are React 19 client components. They do not import Next.js, so the same file runs in any React app styled with Tailwind CSS 4."
        />

        <section className="space-y-4">
          <h2 id="supported">Supported</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {FRAMEWORKS.map((item) => (
              <li key={item.id} className="flex items-start gap-3 py-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-border">
                  <FrameworkMark id={item.id} />
                </span>
                <span>
                  <a href={`#${anchor[item.id]}`} className="block text-sm font-medium">
                    {item.name}
                  </a>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {item.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 id="checklist">What every app needs</h2>
          <p>
            <Link href="/docs/installation">Installation</Link> walks through
            Next.js. In any other framework, run the same <code>init</code> and{" "}
            <code>add</code> commands, then check four things:
          </p>
          <ol className="docs-list">
            <li>
              The import alias in <code>lumen.json</code> matches the one in{" "}
              <code>tsconfig.json</code>: <code>@/</code> by default.
            </li>
            <li>
              <code>globals.css</code> is imported once, at the entry of the app.{" "}
              <code>init</code> writes it to <code>src/app/globals.css</code>, or{" "}
              <code>app/globals.css</code> without a <code>src/</code> folder.
            </li>
            <li>
              The fonts set <code>--font-inter</code>, <code>--font-fraunces</code>{" "}
              and <code>--font-jetbrains</code>. See{" "}
              <a href="#fonts">Fonts without Next.js</a>.
            </li>
            <li>
              The app is wrapped in an element with the <code>root</code> class, so
              popups open above the page.
            </li>
          </ol>
          <Alert>
            <AlertTitle>Run init before the first add</AlertTitle>
            <AlertDescription>
              <code>init</code> creates <code>lumen.json</code> with the{" "}
              <code>@/</code> alias. Change the alias and the paths there before{" "}
              <code>add</code>, and every copied file will import through them.
            </AlertDescription>
          </Alert>
        </section>

        <section className="space-y-4">
          <h2 id="nextjs">Next.js</h2>
          <p>
            Works as is with the App Router and the Pages Router: the copied files
            are client components. Follow{" "}
            <Link href="/docs/installation">Installation</Link>. With the Pages
            Router, import <code>globals.css</code> in <code>pages/_app.tsx</code>{" "}
            instead of the root layout.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="vite">Vite</h2>
          <p>
            Start from the React TypeScript template. Vite reads the{" "}
            <code>postcss.config.mjs</code> that <code>init</code> writes, so
            Tailwind needs no plugin. Add the <code>@/</code> alias to Vite and to
            TypeScript, then run <code>init</code>.
          </p>
          <CodeBlock
            language="bash"
            code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D @types/node`}
          />
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
          <p>
            Then import the stylesheet in the entry and wrap the app:
          </p>
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

        <section className="space-y-4">
          <h2 id="react-router">React Router</h2>
          <p>
            Framework mode keeps its code in <code>app/</code> and maps{" "}
            <code>~/</code> to it. Run <code>init</code>, point{" "}
            <code>lumen.json</code> at that folder, then add components.
          </p>
          <CodeBlock
            filename="lumen.json"
            language="json"
            code={`{
  "aliases": { "ui": "~/components/ui", "lib": "~/lib" },
  "paths": { "ui": "app/components/ui", "lib": "app/lib" }
}`}
          />
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
            The template already imports <code>app.css</code> with Tailwind:
            replace that import with <code>globals.css</code>, or move the Lumen
            sheet into <code>app.css</code>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="astro">Astro</h2>
          <p>
            Add the React integration first. Astro reads the{" "}
            <code>paths</code> of <code>tsconfig.json</code>, so the{" "}
            <code>@/</code> alias needs only one line.
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
          <p>
            Import the stylesheet in the layout. A component that reacts to clicks
            or keys needs a <code>client:</code> directive; a static one, like
            Badge or Card, does not.
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

        <section className="space-y-4">
          <h2 id="tanstack-start">TanStack Start</h2>
          <p>
            The template keeps its code in <code>src/</code> and maps{" "}
            <code>~/</code> to it. Set the aliases in <code>lumen.json</code>, then
            load the stylesheet from the root route.
          </p>
          <CodeBlock
            filename="lumen.json"
            language="json"
            code={`{
  "aliases": { "ui": "~/components/ui", "lib": "~/lib" },
  "paths": { "ui": "src/components/ui", "lib": "src/lib" }
}`}
          />
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

        <section className="space-y-4">
          <h2 id="fonts">Fonts without Next.js</h2>
          <p>
            Install the three families from Fontsource, import them in the entry,
            and name them in the variables the sheet reads. Without this step the
            components use the system fonts, which also works.
          </p>
          <CodeBlock
            language="bash"
            code={`npm install @fontsource-variable/inter @fontsource-variable/fraunces @fontsource-variable/jetbrains-mono`}
          />
          <CodeBlock
            filename="src/main.tsx"
            code={`import "@fontsource-variable/inter"
import "@fontsource-variable/fraunces"
import "@fontsource-variable/jetbrains-mono"`}
          />
          <CodeBlock
            filename="globals.css"
            language="css"
            code={`:root {
  --font-inter: "Inter Variable";
  --font-fraunces: "Fraunces Variable";
  --font-jetbrains: "JetBrains Mono Variable";
}`}
          />
          <p>
            TypeScript is optional everywhere: the source is typed, and it compiles
            once the types are stripped.
          </p>
        </section>
      </div>
    </>
  )
}
