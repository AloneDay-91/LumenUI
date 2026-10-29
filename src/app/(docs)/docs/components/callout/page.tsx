import { InfoIcon, TriangleAlertIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Callout, CalloutIcon, CalloutText } from "@/components/ui/Callout"

const notice = "You will need admin privileges to install and access this application."

export default function CalloutPage() {
  return (
    <ComponentDocs
      name="Callout"
      description="A short notice. An icon, a line of text, and a hue when the message should stand apart from the page."
      preview={
        <Callout className="max-w-md">
          <CalloutIcon>
            <InfoIcon />
          </CalloutIcon>
          <CalloutText>{notice}</CalloutText>
        </Callout>
      }
      usage={`import { InfoIcon } from "lucide-react"
import { Callout, CalloutIcon, CalloutText } from "@/components/ui/Callout"

<Callout>
  <CalloutIcon>
    <InfoIcon />
  </CalloutIcon>
  <CalloutText>
    You will need admin privileges to install and access this application.
  </CalloutText>
</Callout>`}
      extraHeadings={[
        { id: "variant", text: "Variant", level: 2 },
        { id: "color", text: "Color", level: 2 },
        { id: "size", text: "Size", level: 2 },
      ]}
      extra={
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <h2 id="variant">Variant</h2>
            <p>
              <code>soft</code> is a wash. <code>surface</code> adds a line.{" "}
              <code>outline</code> keeps only the line.
            </p>
            <Preview className="flex-col gap-3">
              <Callout variant="soft">
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
              <Callout variant="surface">
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
              <Callout variant="outline">
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
            </Preview>
            <CodeBlock code={`<Callout variant="outline">...</Callout>`} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 id="color">Color</h2>
            <p>
              <code>color</code> tints the wash and the type.{" "}
              <code>highContrast</code> deepens it. Use <code>role=&quot;alert&quot;</code>{" "}
              when the reader has to hear it immediately.
            </p>
            <Preview className="flex-col gap-3">
              <Callout color="indigo">
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
              <Callout color="jade">
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
              <Callout color="crimson" role="alert">
                <CalloutIcon>
                  <TriangleAlertIcon />
                </CalloutIcon>
                <CalloutText>
                  Access denied. Ask an admin to open this page.
                </CalloutText>
              </Callout>
              <Callout color="indigo" highContrast>
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
            </Preview>
            <CodeBlock
              code={`<Callout color="crimson" role="alert">
  <CalloutIcon>
    <TriangleAlertIcon />
  </CalloutIcon>
  <CalloutText>Access denied.</CalloutText>
</Callout>`}
            />
          </section>

          <section className="flex flex-col gap-4">
            <h2 id="size">Size</h2>
            <p>
              <code>sm</code> tightens the padding. <code>lg</code> gives the
              sentence more room.
            </p>
            <Preview className="flex-col gap-3">
              <Callout size="sm">
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
              <Callout size="lg">
                <CalloutIcon>
                  <InfoIcon />
                </CalloutIcon>
                <CalloutText>{notice}</CalloutText>
              </Callout>
            </Preview>
            <CodeBlock code={`<Callout size="sm">...</Callout>`} />
          </section>
        </div>
      }
    />
  )
}
