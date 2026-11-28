import Link from "next/link"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro } from "@/components/docs/Preview"
import { FrameworkMark, type FrameworkMarkId } from "@/components/marketing/FrameworkMarks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { FRAMEWORKS, VUE_FRAMEWORKS } from "@/lib/site"

type Row = { key: string; mark: FrameworkMarkId; name: string; href: string; body: string }

const react: Row[] = FRAMEWORKS.map((item) => ({ ...item, key: item.id, mark: item.id }))
const vue: Row[] = VUE_FRAMEWORKS.map((item) => ({ ...item, key: item.id }))

function FrameworkList({ rows }: { rows: Row[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {rows.map((item) => (
        <li key={item.key} className="flex items-start gap-3 py-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-border">
            <FrameworkMark id={item.mark} />
          </span>
          <span>
            <Link href={item.href} className="block text-sm font-medium">
              {item.name}
            </Link>
            <span className="mt-0.5 block text-sm text-muted-foreground">{item.body}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function FrameworksPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "frameworks", text: "Frameworks", level: 1 },
          { id: "react", text: "React", level: 2 },
          { id: "vue", text: "Vue", level: 2 },
          { id: "checklist", text: "What every app needs", level: 2 },
          { id: "fonts", text: "Fonts without Next.js", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          eyebrow="Frameworks"
          title="Frameworks"
          description="Lumen ships React 19 components and Vue 3 components, both styled with Tailwind CSS 4. Neither imports a framework, so the same files run in every app below."
        />

        <section className="space-y-4">
          <h2 id="react">React</h2>
          <p>
            Base UI behavior. The copied files are client components and import nothing from
            Next.js.
          </p>
          <FrameworkList rows={react} />
        </section>

        <section className="space-y-4">
          <h2 id="vue">Vue</h2>
          <p>
            Reka UI behavior, same classes and tokens. See <Link href="/docs/vue">Vue</Link> for
            what ships and how the API differs.
          </p>
          <FrameworkList rows={vue} />
        </section>

        <section className="space-y-4">
          <h2 id="checklist">What every app needs</h2>
          <p>
            Each guide runs the same <code>init</code> and <code>add</code> commands, then checks
            four things:
          </p>
          <ol className="docs-list">
            <li>
              The import alias in <code>lumen.json</code> matches the one in the bundler and{" "}
              <code>tsconfig.json</code>: <code>@/</code> by default.
            </li>
            <li>
              The Lumen stylesheet is imported once, at the entry of the app. In React{" "}
              <code>init</code> writes <code>src/app/globals.css</code>; in Vue it uses the sheet{" "}
              <code>main.ts</code> already imports, or <code>paths.css</code> in{" "}
              <code>lumen.json</code>.
            </li>
            <li>
              The fonts set <code>--font-inter</code>, <code>--font-fraunces</code> and{" "}
              <code>--font-jetbrains</code>. See <a href="#fonts">Fonts without Next.js</a>.
            </li>
            <li>
              The app is wrapped in an element with the <code>root</code> class, so popups open
              above the page.
            </li>
          </ol>
          <Alert>
            <AlertTitle>Write lumen.json before the first add</AlertTitle>
            <AlertDescription>
              <code>init</code> creates <code>lumen.json</code> with the <code>@/</code> alias and
              the detected framework. Change the alias and the paths there before <code>add</code>,
              and every copied file will import through them.
            </AlertDescription>
          </Alert>
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
            filename="src/main.ts(x)"
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
