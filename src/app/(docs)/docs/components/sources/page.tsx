import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { SourcesDemo } from "@/components/docs/AiExamples"

export default function SourcesPage() {
  return (
    <ComponentDocs
      name="Sources"
      description="The links the agent used for a reply, folded under a count. Each site gets a letter tile, so the list makes no favicon requests."
      preview={<SourcesDemo />}
      usage={`import { Sources } from "@/components/ui/Sources"

<Sources
  sources={[
    { href: "https://lumen-ui.dev/docs/components/split-button", title: "Split Button" },
    { href: "https://developer.mozilla.org/…", title: "ARIA: menu role" },
  ]}
/>`}
    />
  )
}
