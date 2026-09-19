import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"

export default function AlertPage() {
  return (
    <ComponentDocs
      name="Alert"
      description="Status message. Variants stay in the monochrome family: no saturated pastels."
      preview={
        <Alert className="max-w-md">
          <AlertTitle>Deploy complete</AlertTitle>
          <AlertDescription>
            The preview is live. Dark tokens follow the .dark class.
          </AlertDescription>
        </Alert>
      }
      usage={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert"

<Alert>
  <AlertTitle>Deploy complete</AlertTitle>
  <AlertDescription>The preview is live.</AlertDescription>
</Alert>`}
      extraHeadings={[{ id: "variants", text: "Variants", level: 2 }]}
      extra={
        <section className="space-y-4">
          <h2 id="variants">Variants</h2>
          <div className="space-y-3">
            <Alert variant="destructive">
              <AlertTitle>Save failed</AlertTitle>
              <AlertDescription>The server did not respond.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>Components live in your repo.</AlertDescription>
            </Alert>
          </div>
        </section>
      }
    />
  )
}
