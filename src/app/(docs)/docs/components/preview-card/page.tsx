"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from "@/components/ui/PreviewCard"

export default function PreviewCardPage() {
  return (
    <ComponentDocs
      name="Preview Card"
      description="Destination preview on link hover. Built on @base-ui/react/preview-card."
      preview={
        <p className="text-sm">
          Discover{" "}
          <PreviewCard>
            <PreviewCardTrigger
              href="https://base-ui.com"
              className="underline underline-offset-4"
            >
              Base UI
            </PreviewCardTrigger>
            <PreviewCardContent>
              <p className="text-sm font-medium">Base UI</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Accessible, unstyled components.
              </p>
            </PreviewCardContent>
          </PreviewCard>
          .
        </p>
      }
      usage={`import { PreviewCard, PreviewCardTrigger, PreviewCardContent } from "@/components/ui/PreviewCard"

<PreviewCard>
  <PreviewCardTrigger href="https://base-ui.com">Base UI</PreviewCardTrigger>
  <PreviewCardContent>Preview</PreviewCardContent>
</PreviewCard>`}
    />
  )
}
