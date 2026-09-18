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
      description="Aperçu d’une destination au survol d’un lien. Construit sur @base-ui/react/preview-card."
      preview={
        <p className="text-sm">
          Découvrir{" "}
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
                Composants accessibles, non stylés.
              </p>
            </PreviewCardContent>
          </PreviewCard>
          .
        </p>
      }
      usage={`import { PreviewCard, PreviewCardTrigger, PreviewCardContent } from "@/components/ui/PreviewCard"

<PreviewCard>
  <PreviewCardTrigger href="https://base-ui.com">Base UI</PreviewCardTrigger>
  <PreviewCardContent>Aperçu</PreviewCardContent>
</PreviewCard>`}
    />
  )
}
