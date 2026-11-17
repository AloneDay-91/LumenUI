import { PreviewCard, PreviewCardContent, PreviewCardTrigger } from "lumen-ui"

export const Open = () => (
  <div className="flex justify-center" style={{ minHeight: 260, paddingTop: 48 }}>
    <p className="text-sm">
      Discover{" "}
      <PreviewCard defaultOpen>
        <PreviewCardTrigger href="https://base-ui.com" className="underline underline-offset-4">
          Base UI
        </PreviewCardTrigger>
        <PreviewCardContent>
          <p className="text-sm font-medium">Base UI</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Accessible, unstyled components. Lumen draws the chrome on top.
          </p>
        </PreviewCardContent>
      </PreviewCard>
      , the primitives under every Lumen overlay.
    </p>
  </div>
)
