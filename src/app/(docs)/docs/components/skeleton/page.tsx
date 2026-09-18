import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Skeleton } from "@/components/ui/Skeleton"

export default function SkeletonPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "skeleton", text: "Skeleton", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Skeleton"
          description="Placeholder de chargement. Reprenez la forme du contenu, pas un spinner générique."
        />
        <Preview className="items-start">
          <div className="w-full max-w-sm space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock
            code={`import { Skeleton } from "@/components/ui/Skeleton"

<Skeleton className="h-4 w-1/3" />
<Skeleton className="h-4 w-full" />`}
          />
        </section>
      </div>
    </>
  )
}
