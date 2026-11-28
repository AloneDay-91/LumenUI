"use client"

import { InfoIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, type ReactNode } from "react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { Callout, CalloutIcon, CalloutText } from "@/components/ui/Callout"
import { useFramework } from "@/lib/use-framework"
import { vueInstallCommand } from "@/lib/vue-components"

type VueExample = { item: string; usage: string }

function revealUsage() {
  const heading = document.getElementById("usage")
  if (!heading) return
  const rect = heading.getBoundingClientRect()
  const low = rect.top > window.innerHeight * 0.45
  const above = rect.bottom < 120
  if (!low && !above) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  heading.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
}

/** The install command for the framework picked in the sidebar. */
export function FrameworkInstall({ react, vueItem }: { react: string; vueItem?: string }) {
  const [picked] = useFramework()
  const code = picked === "vue" && vueItem ? vueInstallCommand(vueItem) : react
  return (
    <div key={picked} className="docs-framework-swap">
      <CodeBlock language="bash" code={code} />
    </div>
  )
}

/** React usage, or the Vue example when the sidebar is set to Vue. */
export function FrameworkUsage({
  slug,
  react,
  vue,
}: {
  slug: string
  react: ReactNode
  vue?: VueExample
}) {
  const [picked] = useFramework()
  const skipScroll = useRef(true)

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false
      return
    }
    revealUsage()
  }, [picked])

  const sample =
    picked !== "vue" ? (
      react
    ) : vue ? (
      <CodeBlock language="html" filename={`${slug}.vue`} code={vue.usage} />
    ) : (
      <div className="space-y-4">
        <Callout color="orange" variant="surface">
          <CalloutIcon>
            <InfoIcon aria-hidden />
          </CalloutIcon>
          <CalloutText>
            This component is not available for Vue yet. The React version is
            below — see the{" "}
            <Link href="/docs/vue#components">Vue guide</Link> for available
            components.
          </CalloutText>
        </Callout>
        {react}
      </div>
    )

  return (
    <div key={picked} className="docs-framework-swap">
      {sample}
    </div>
  )
}
