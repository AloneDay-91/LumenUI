import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Skeleton } from "@/components/ui/Skeleton"

export default function SkeletonPage() {
  return (
    <ComponentDocs
      name="Skeleton"
      description="Loading placeholder. Match the content shape, not a generic spinner."
      preview={
        <div className="w-full max-w-sm space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      }
      usage={`import { Skeleton } from "@/components/ui/Skeleton"

<Skeleton className="h-4 w-1/3" />
<Skeleton className="h-4 w-full" />`}
    />
  )
}
