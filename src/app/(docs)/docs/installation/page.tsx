import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { LUMEN_GLOBAL_CSS } from "@/lib/lumen-css"

export default function InstallationPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "installation", text: "Installation", level: 1 },
          { id: "requirements", text: "Before you start", level: 2 },
          { id: "create-project", text: "1. Create a project", level: 2 },
          { id: "init", text: "2. Run init", level: 2 },
          { id: "layout", text: "3. Load the styles", level: 2 },
          { id: "add", text: "4. Add a component", level: 2 },
          { id: "run", text: "5. Run the app", level: 2 },
          { id: "cli", text: "CLI reference", level: 2 },
          { id: "update", text: "Update and remove", level: 2 },
          { id: "config", text: "lumen.json", level: 2 },
          { id: "theme", text: "Your theme", level: 2 },
          { id: "manual", text: "Manual installation", level: 2 },
          { id: "troubleshooting", text: "Troubleshooting", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Getting started"
          title="Installation"
          description="From a React app to your first Lumen component in five steps. The CLI copies the source into your project: every file is yours to edit."
        />

        <Alert>
          <AlertTitle>Not a package</AlertTitle>
          <AlertDescription>
            You never import from <code>@aloneday/lumenui</code>. The CLI writes
            plain <code>.tsx</code> files into <code>components/ui</code>. Base UI
            stays an npm dependency for focus, keyboard and portals; the styles
            live in your repo.
          </AlertDescription>
        </Alert>

        <section className="space-y-4">
          <h2 id="requirements">Before you start</h2>
          <ul className="docs-list">
            <li>
              <strong>Node.js 22.23.4 or newer</strong> to run the CLI. Check with{" "}
              <code>node -v</code>.
            </li>
            <li>
              <strong>A React 19 app</strong>: Next.js, Vite, React Router, Astro or
              TanStack Start. <Link href="/docs/frameworks">Frameworks</Link> has
              the setup for each one.
            </li>
            <li>
              <strong>The <code>@/</code> import alias</strong> pointing to your
              source folder. Next.js sets it up. If your template uses another
              alias, such as <code>~/</code>, change it in{" "}
              <a href="#config">lumen.json</a>.
            </li>
            <li>
              <strong>Tailwind CSS 4</strong>. No need to install it first: the CLI
              adds it.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 id="create-project">1. Create a project</h2>
          <p>
            Skip this step in an existing app. Otherwise, create a Next.js app and
            keep the defaults: TypeScript, Tailwind CSS, the App Router, and the{" "}
            <code>@/*</code> import alias.
          </p>
          <CodeBlock
            language="bash"
            code={`npx create-next-app@latest my-app
cd my-app`}
          />
          <p>
            Every command on this page runs at the root of the project, next to{" "}
            <code>package.json</code>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="init">2. Run init</h2>
          <p>
            <code>init</code> prepares the project once. It is safe to run again.
          </p>
          <CodeBlock language="bash" code={`npx @aloneday/lumenui@latest init`} />
          <p>It writes these files and installs the packages they need:</p>
          <ul className="docs-list">
            <li>
              <code>lumen.json</code>: where components go and how they import each
              other.
            </li>
            <li>
              <code>lib/utils.ts</code>: the <code>cn()</code> helper every
              component uses to merge classes.
            </li>
            <li>
              <code>app/globals.css</code>: Tailwind, the Lumen tokens, light and
              dark. An existing file without the tokens is replaced and kept as{" "}
              <code>globals.css.bak</code>.
            </li>
            <li>
              <code>postcss.config.mjs</code>, only when the project has no PostCSS
              config yet.
            </li>
            <li>
              <code>clsx</code> and <code>tailwind-merge</code>, then{" "}
              <code>tailwindcss</code>, <code>@tailwindcss/postcss</code> and{" "}
              <code>tw-animate-css</code> as dev dependencies.
            </li>
          </ul>
          <p>
            With a <code>src/</code> folder, the paths start with <code>src/</code>.
            The CLI uses your package manager: pnpm, Yarn or Bun when their lockfile
            is there, npm otherwise. Add <code>--dry-run</code> to print the files
            and packages without writing anything.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="layout">3. Load the styles</h2>
          <p>
            Import <code>globals.css</code> once, in the root layout. Three more
            things belong there:
          </p>
          <ul className="docs-list">
            <li>
              <strong>Fonts.</strong> The sheet reads <code>--font-inter</code>,{" "}
              <code>--font-fraunces</code> and <code>--font-jetbrains</code>.
              Without them, it falls back to the system fonts.
            </li>
            <li>
              <strong>The <code>root</code> class</strong> on the element that wraps
              the app. It isolates the page, so Dialog, Menu, Select, Popover,
              Tooltip and Toast open above it.
            </li>
            <li>
              <strong>Dark mode.</strong> It is the <code>.dark</code> class on{" "}
              <code>html</code>. <code>next-themes</code> sets it and follows the
              system preference.
            </li>
          </ul>
          <CodeBlock language="bash" code={`npm install next-themes`} />
          <CodeBlock
            filename="app/layout.tsx"
            code={`import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"

import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[inter.variable, fraunces.variable, jetbrains.variable].join(" ")}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="root">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}`}
          />
          <p>
            Not on Next.js? <Link href="/docs/frameworks">Frameworks</Link> shows
            where the stylesheet and the fonts go in Vite, React Router, Astro and
            TanStack Start.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="add">4. Add a component</h2>
          <p>
            Start with Button. <code>add</code> copies the component and the local
            files it imports, then installs its npm packages: here{" "}
            <code>button-variants.ts</code> and <code>@base-ui/react</code>.
          </p>
          <CodeBlock language="bash" code={`npx @aloneday/lumenui@latest add button`} />
          <p>
            The file lands in <code>components/ui/Button.tsx</code>. Import it like
            any of your components:
          </p>
          <CodeBlock
            filename="app/page.tsx"
            code={`import { Button } from "@/components/ui/Button"

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <Button>Continue</Button>
    </main>
  )
}`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="run">5. Run the app</h2>
          <CodeBlock language="bash" code={`npm run dev`} />
          <p>
            A black pill on warm paper: the setup works. Every{" "}
            <Link href="/docs/components">component page</Link> starts with its
            own <code>add</code> command. Several names fit in one command, and{" "}
            <code>all</code> copies the whole set.
          </p>
          <CodeBlock
            language="bash"
            code={`npx @aloneday/lumenui@latest add dialog select card
npx @aloneday/lumenui@latest add all`}
          />
          <p>
            Not sure which one to pick? <Link href="/docs/choose">Choose a component</Link>{" "}
            compares the close ones. Coming from shadcn/ui?{" "}
            <Link href="/docs/shadcn">From shadcn</Link> lists the names that
            differ.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="cli">CLI reference</h2>
          <p>
            Run any command with <code>npx @aloneday/lumenui@latest</code>, or
            install the CLI once with <code>npm install -D @aloneday/lumenui</code>{" "}
            and call <code>npx lumenui</code>.
          </p>
          <table>
            <thead>
              <tr>
                <th>Command</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>init</code></td>
                <td>Writes lumen.json, cn(), globals.css and the PostCSS config, and installs Tailwind.</td>
              </tr>
              <tr>
                <td><code>add &lt;name&gt;…</code></td>
                <td>Copies components and the files they import, and installs their packages.</td>
              </tr>
              <tr>
                <td><code>add all</code></td>
                <td>Copies every component.</td>
              </tr>
              <tr>
                <td><code>rm &lt;name&gt;…</code></td>
                <td>Deletes components. Files another component still imports stay.</td>
              </tr>
              <tr>
                <td><code>list</code></td>
                <td>Lists every component, installed or available.</td>
              </tr>
              <tr>
                <td><code>preset &lt;file.css&gt;</code></td>
                <td>Writes a theme exported from Customize into globals.css.</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>--dry-run</code></td>
                <td>Prints the files and packages without writing.</td>
              </tr>
              <tr>
                <td><code>--overwrite</code></td>
                <td>Replaces component files you changed.</td>
              </tr>
              <tr>
                <td><code>--force</code></td>
                <td>Removes a component even when another one imports it.</td>
              </tr>
              <tr>
                <td><code>--cwd &lt;dir&gt;</code></td>
                <td>Runs in another folder, for example a package of a monorepo.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="space-y-4">
          <h2 id="update">Update and remove</h2>
          <p>
            The copied files are yours, so the CLI never replaces your edits on its
            own. Running <code>add</code> again leaves identical files alone and
            skips the ones you changed, with a message. To take the latest version
            of a file, pass <code>--overwrite</code>, then bring your changes back
            from <code>git diff</code>.
          </p>
          <CodeBlock
            language="bash"
            code={`npx @aloneday/lumenui@latest add button --overwrite
npx @aloneday/lumenui@latest rm button`}
          />
          <p>
            <code>rm</code> refuses to delete a file another installed component
            still imports, and names it. Remove that one first, or pass{" "}
            <code>--force</code>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="config">lumen.json</h2>
          <p>
            <code>init</code> writes this file at the root. <code>paths</code> says
            where files are written; <code>aliases</code> says how the components
            import each other. <code>installed</code> is kept up to date by{" "}
            <code>add</code> and <code>rm</code>.
          </p>
          <CodeBlock
            filename="lumen.json"
            language="json"
            code={`{
  "aliases": {
    "ui": "@/components/ui",
    "lib": "@/lib"
  },
  "paths": {
    "ui": "src/components/ui",
    "lib": "src/lib"
  },
  "installed": ["button", "button-variants", "utils"]
}`}
          />
          <p>
            A template that maps <code>~/</code> to <code>app/</code>, like React
            Router, needs both fields changed before the first <code>add</code>:
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
          <h2 id="theme">Your theme</h2>
          <p>
            <Link href="/customize">Customize</Link> previews the colors, fonts,
            radius and shadow on real components. Download the result as{" "}
            <code>lumen-preset.css</code> and write it into your stylesheet. Run it
            again with a new file to replace the previous preset.
          </p>
          <CodeBlock
            language="bash"
            code={`npx @aloneday/lumenui@latest preset lumen-preset.css`}
          />
          <p>
            The tokens and the dark palette are described in{" "}
            <Link href="/docs/styles">Styles</Link>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="manual">Manual installation</h2>
          <p>
            Prefer to copy by hand? The CLI does nothing you cannot do yourself in
            four steps.
          </p>
          <h3>Install the dependencies</h3>
          <CodeBlock
            language="bash"
            code={`npm install @base-ui/react class-variance-authority clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/postcss tw-animate-css`}
          />
          <h3>Add the PostCSS plugin</h3>
          <CodeBlock
            filename="postcss.config.mjs"
            language="js"
            code={`const config = {
  plugins: ["@tailwindcss/postcss"],
}

export default config`}
          />
          <h3>Replace globals.css</h3>
          <p>
            The full sheet: Tailwind, the tokens for light and dark, and a few base
            rules.
          </p>
          <CodeBlock filename="app/globals.css" language="css" code={LUMEN_GLOBAL_CSS} />
          <h3>Add cn() and copy a component</h3>
          <CodeBlock
            filename="lib/utils.ts"
            language="ts"
            code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          />
          <p>
            Then copy a file from the Code tab of a component page into{" "}
            <code>components/ui</code>, along with the local files it imports. The
            Markdown version of each page (add <code>.md</code> to its URL) lists
            them all. Finish with step 3 above.
          </p>
        </section>

        <section className="space-y-4">
          <h2 id="troubleshooting">Troubleshooting</h2>
          <h3>Cannot find module "@/components/ui/…"</h3>
          <p>
            The project has no <code>@/</code> alias, or it points somewhere else.
            Add <code>{`"paths": { "@/*": ["./src/*"] }`}</code> to{" "}
            <code>tsconfig.json</code> (without <code>src/</code> if you have none),
            or set your own alias in <a href="#config">lumen.json</a> and run{" "}
            <code>add --overwrite</code>.
          </p>
          <h3>The components have no style</h3>
          <p>
            <code>globals.css</code> is not imported, or the PostCSS config does not
            load <code>@tailwindcss/postcss</code>. When a config already exists,{" "}
            <code>init</code> leaves it alone and prints{" "}
            <code>skip postcss.config.mjs (add @tailwindcss/postcss)</code>.
          </p>
          <h3>A Dialog or a Menu opens behind the page</h3>
          <p>
            The <code>root</code> class is missing on the element that wraps the
            app. See step 3.
          </p>
          <h3>Dark mode does not switch</h3>
          <p>
            The theme provider must set a class, not a data attribute:{" "}
            <code>{`attribute="class"`}</code> with <code>next-themes</code>.
          </p>
          <h3>skip … (it differs; pass --overwrite to replace it)</h3>
          <p>
            Not an error: you edited that file, and the CLI kept your version. See{" "}
            <a href="#update">Update and remove</a>.
          </p>
          <h3>The CLI stops with an engine or syntax error</h3>
          <p>
            Node.js is older than 22.23.4. Update it, then run the command again.
          </p>
        </section>
      </div>
    </>
  )
}
