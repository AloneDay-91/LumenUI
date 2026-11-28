import Link from "next/link"
import type { ReactNode } from "react"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import type { Heading } from "@/components/docs/DocsTOCContext"
import { PageIntro } from "@/components/docs/Preview"

/** Shell of a page under /docs/frameworks: title, the sections, and where to go next. */
export function FrameworkGuide({
  title,
  description,
  stack,
  headings,
  children,
}: {
  title: string
  description: string
  stack: "react" | "vue"
  headings: Heading[]
  children: ReactNode
}) {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: title.toLowerCase().replace(/\s+/g, "-"), text: title, level: 1 },
          ...headings,
          { id: "next", text: "Next steps", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro eyebrow="Frameworks" title={title} description={description} />
        {children}
        <section className="space-y-4">
          <h2 id="next">Next steps</h2>
          <ul className="docs-list">
            {stack === "vue" ? (
              <li>
                <Link href="/docs/vue">Vue</Link>: what ships for Vue and how it differs from React.
              </li>
            ) : (
              <li>
                <Link href="/docs/installation">Installation</Link>: the full walkthrough and the
                CLI reference.
              </li>
            )}
            <li>
              <Link href="/docs/frameworks#fonts">Fonts without Next.js</Link>: load Inter, Fraunces
              and JetBrains Mono.
            </li>
            <li>
              <Link href="/docs/components">Components</Link>: pick what to add. Switch them
              between React and Vue at the bottom of the sidebar.
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
