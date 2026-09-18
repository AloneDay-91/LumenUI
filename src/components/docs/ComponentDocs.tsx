import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro, Preview } from "@/components/docs/Preview"

export function ComponentDocs({
  name,
  description,
  preview,
  usage,
}: {
  name: string
  description: string
  preview: ReactNode
  usage: string
}) {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: name.toLowerCase().replace(/\s+/g, "-"), text: name, level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro eyebrow="Composants" title={name} description={description} />
        <Preview>{preview}</Preview>
        <section className="space-y-4">
          <h2 id="usage">Utilisation</h2>
          <CodeBlock code={usage} />
        </section>
      </div>
    </>
  )
}
