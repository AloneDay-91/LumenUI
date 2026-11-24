import { SignaturePadDemo } from "@/components/docs/AppExamples"
import { ComponentDocs } from "@/components/docs/ComponentDocs"

export default function SignaturePadPage() {
  return (
    <ComponentDocs
      name="Signature Pad"
      description="A box to sign with a mouse, a finger, or a pen, with undo, and a typed mode that signs with the keyboard."
      preview={<SignaturePadDemo />}
      usage={`import { SignaturePad } from "@/components/ui/SignaturePad"

<SignaturePad onValueChange={(png) => setSignature(png)} />`}
      extraHeadings={[
        { id: "value", text: "Value", level: 2 },
        { id: "drawing", text: "Drawing", level: 2 },
        { id: "accessibility", text: "Accessibility", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="value">Value</h2>
            <p>
              <code>onValueChange</code> gets a transparent PNG data URL with dark ink, whatever the theme on screen, or <code>null</code> once cleared. The second argument says whether it was drawn or typed, and the typed name.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="drawing">Drawing</h2>
            <p>
              Pen pressure thickens the line; mice draw at a steady width set by <code>strokeWidth</code>. Strokes are smoothed and redrawn on resize. Undo removes the last stroke.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="accessibility">Accessibility</h2>
            <p>
              Drawing needs a pointer, so <code>allowTyped</code> (on by default) adds a Type mode: the name is written in the serif face and exported the same way. Keep it on wherever a signature is required.
            </p>
          </section>
        </>
      }
    />
  )
}
