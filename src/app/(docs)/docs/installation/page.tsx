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
          { id: "cli", text: "CLI", level: 2 },
          { id: "dependencies", text: "Dependencies", level: 2 },
          { id: "tokens", text: "CSS variables", level: 2 },
          { id: "utility", text: "Utility", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Getting started"
          title="Installation"
          description="Lumen UI is not a component package. The CLI copies the source into your repo."
        />

        <Alert>
          <AlertTitle>Why copy-paste</AlertTitle>
          <AlertDescription>
            You own the code. Base UI primitives stay a dependency. Lumen styles do not.
          </AlertDescription>
        </Alert>

        <section className="space-y-4">
          <h2 id="cli">CLI</h2>
          <p>
            <code>init</code> writes <code>lumen.json</code> and <code>cn()</code>.{" "}
            <code>add</code> copies the component, the local files it needs, and
            installs the npm packages. <code>rm</code> deletes that component.
            Shared files stay while something else still imports them.
          </p>
          <CodeBlock
            language="bash"
            code={`npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button
npx @aloneday/lumenui@latest add button card dialog
npx @aloneday/lumenui@latest add all
npx @aloneday/lumenui@latest rm button`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="dependencies">Dependencies</h2>
          <CodeBlock
            language="bash"
            code={`npm install @base-ui/react class-variance-authority clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/postcss tw-animate-css`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="tokens">CSS variables</h2>
          <p>
            Paste this into your global stylesheet. Load Inter, Fraunces, and
            JetBrains Mono (for example with <code>next/font</code>) and expose
            them as <code>--font-inter</code>, <code>--font-fraunces</code>, and{" "}
            <code>--font-jetbrains</code>.
          </p>
          <CodeBlock
            filename="app/globals.css"
            language="css"
            code={LUMEN_GLOBAL_CSS}
          />
        </section>

        <section className="space-y-4">
          <h2 id="utility">Utility</h2>
          <CodeBlock
            filename="lib/utils.ts"
            language="ts"
            code={`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          />
        </section>
      </div>
    </>
  )
}
