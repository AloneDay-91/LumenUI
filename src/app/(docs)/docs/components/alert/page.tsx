import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"

export default function AlertPage() {
  return (
    <ComponentDocs
      name="Alert"
      description="Status message. Info, warning, success, and destructive use the shared hues. Only destructive interrupts with role alert."
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
            <Alert variant="info">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>Components live in your repo.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <AlertTitle>Deploy complete</AlertTitle>
              <AlertDescription>The preview is live.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Review the diff</AlertTitle>
              <AlertDescription>Two tokens changed since the last publish.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Save failed</AlertTitle>
              <AlertDescription>The server did not respond.</AlertDescription>
            </Alert>
          </div>
        </section>
      }
    />
  )
}
