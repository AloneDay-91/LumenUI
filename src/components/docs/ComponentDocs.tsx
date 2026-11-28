import type { ReactNode } from "react"
import Link from "next/link"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentApi } from "@/components/docs/ComponentApi"
import { FrameworkInstall, FrameworkUsage } from "@/components/docs/FrameworkDocs"
import { DocsPageTabs } from "@/components/docs/DocsPageTabs"
import type { Heading } from "@/components/docs/DocsTOCContext"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { getPageVersions } from "@/lib/doc-versions"
import {
  componentInstallCommand,
  componentSlug,
  getApiHeadings,
  getComponentApi,
} from "@/lib/component-api"
import { vueComponent } from "@/lib/vue-components"
import {
  installPlan,
  joinList,
  type InstallPiece,
} from "@/lib/install-closure"

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
  const slug = api?.slug ?? componentSlug(name)
  const install = componentInstallCommand(slug)
  const vue = vueComponent(slug)
  const usageHeadings: Heading[] = [
    { id: "usage", text: "Usage", level: 2 },
    { id: "installation", text: "Installation", level: 2 },
    ...extraHeadings,
  ]
  const apiHeadings: Heading[] = api
    ? getApiHeadings(api)
    : [{ id: "api", text: "API", level: 2 }]

  return (
    <div className="space-y-12">
      <PageIntro
        eyebrow="Components"
        title={name}
        description={description}
        versions={getPageVersions(`/docs/components/${slug}`)}
      />
      <Preview className={previewClassName}>{preview}</Preview>
      <DocsPageTabs
        usageHeadings={usageHeadings}
        apiHeadings={apiHeadings}
        usage={
          <>
            <section className="space-y-4">
              <h2 id="usage">Usage</h2>
              <FrameworkUsage
                slug={slug}
                vue={vue}
                react={typeof usage === "string" ? <CodeBlock code={usage} /> : usage}
              />
            </section>
            <section className="space-y-4">
              <h2 id="installation">Installation</h2>
              <FrameworkInstall react={install} vueItem={vue?.item} />
              <InstallNote slug={slug} />
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

function InstallNote({ slug }: { slug: string }) {
  const plan = installPlan(slug)
  if (!plan || (plan.also.length === 0 && plan.packages.length === 0)) {
    return null
  }

  return (
    <p>
      {plan.also.length > 0 ? (
        <>
          Also writes <InstallList pieces={plan.also} />.{" "}
        </>
      ) : null}
      {plan.packages.length > 0 ? <>Installs {joinList(plan.packages)}.</> : null}
    </p>
  )
}

function InstallList({ pieces }: { pieces: InstallPiece[] }) {
  return pieces.map((piece, index) => (
    <span key={`${piece.label}-${index}`}>
      {separator(index, pieces.length)}
      {piece.href ? <Link href={piece.href}>{piece.label}</Link> : piece.label}
    </span>
  ))
}

function separator(index: number, length: number) {
  if (index === 0) return null
  if (index === length - 1) return length === 2 ? " and " : ", and "
  return ", "
}
