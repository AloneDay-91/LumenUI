import type { ReactNode } from "react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentApi } from "@/components/docs/ComponentApi"
import { DocsPageTabs } from "@/components/docs/DocsPageTabs"
import type { Heading } from "@/components/docs/DocsTOCContext"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { getApiHeadings, getComponentApi } from "@/lib/component-api"

export function ComponentDocs({
  name,
  description,
  preview,
  previewClassName,
  usage,
  extra,
  extraHeadings = [],
}: {
  name: string
  description: string
  preview: ReactNode
  previewClassName?: string
  usage: string | ReactNode
  extra?: ReactNode
  extraHeadings?: Heading[]
}) {
  const api = getComponentApi(name)
  const usageHeadings: Heading[] = [
    { id: "usage", text: "Usage", level: 2 },
    ...extraHeadings,
  ]
  const apiHeadings: Heading[] = api
    ? getApiHeadings(api)
    : [{ id: "api", text: "API", level: 2 }]

  return (
    <div className="space-y-12">
      <PageIntro eyebrow="Components" title={name} description={description} />
      <Preview className={previewClassName}>{preview}</Preview>
      <DocsPageTabs
        usageHeadings={usageHeadings}
        apiHeadings={apiHeadings}
        usage={
          <>
            <section className="space-y-4">
              <h2 id="usage">Usage</h2>
              {typeof usage === "string" ? <CodeBlock code={usage} /> : usage}
            </section>
            {extra}
          </>
        }
        api={
          api ? (
            <ComponentApi api={api} />
          ) : (
            <section className="space-y-3">
              <h2 id="api">API</h2>
              <p>No API reference for this component yet.</p>
            </section>
          )
        }
      />
    </div>
  )
}
