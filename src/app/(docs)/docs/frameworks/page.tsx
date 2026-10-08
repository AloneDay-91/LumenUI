import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro } from "@/components/docs/Preview"
import { FrameworkMark } from "@/components/marketing/FrameworkMarks"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import { FRAMEWORKS } from "@/lib/site"

export default function FrameworksPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "frameworks", text: "Frameworks", level: 1 },
          { id: "supported", text: "Supported", level: 2 },
          { id: "requirement", text: "Requirement", level: 2 },
        ]}
      />

      <div className="space-y-12">
        <PageIntro
          title="Frameworks"
          description="Lumen copies React components. They render in any React 19 app. The files do not import Next.js."
        />

        <section className="space-y-4">
          <h2 id="supported">Supported</h2>
          <p>
            Tailwind CSS 4 supplies the styles. The JavaScript framework only
            has to run React 19.
          </p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {FRAMEWORKS.map((item) => (
              <li key={item.id} className="flex items-start gap-3 py-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-border">
                  <FrameworkMark id={item.id} />
                </span>
                <span>
                  <span className="block text-sm font-medium">{item.name}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {item.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 id="requirement">Requirement</h2>
          <Alert>
            <AlertTitle>React 19</AlertTitle>
            <AlertDescription>
              Components are client components. A Vite app, a Next.js route, or
              a React Router route can render the same file. TypeScript is
              optional: the source is typed, and it still compiles if you strip
              the types.
            </AlertDescription>
          </Alert>
        </section>
      </div>
    </>
  )
}
