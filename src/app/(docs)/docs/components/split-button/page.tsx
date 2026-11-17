"use client"

import { CalendarClockIcon, EyeIcon, SendIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { MenuItem, MenuSeparator } from "@/components/ui/Menu"
import { SplitButton, SplitButtonAction, SplitButtonMenu } from "@/components/ui/SplitButton"
import { useToastManager } from "@/components/ui/Toast"

function PublishDemo({ variant }: { variant?: "default" | "outline" | "secondary" }) {
  const toast = useToastManager()
  return (
    <SplitButton variant={variant}>
      <SplitButtonAction onClick={() => toast.add({ type: "success", title: "Published" })}>
        <SendIcon data-icon="inline-start" />
        Publish
      </SplitButtonAction>
      <SplitButtonMenu label="More publish options">
        <MenuItem onClick={() => toast.add({ title: "Scheduled for 9:00" })}>
          <CalendarClockIcon />
          Schedule
        </MenuItem>
        <MenuItem>
          <EyeIcon />
          Publish as preview
        </MenuItem>
        <MenuSeparator />
        <MenuItem>Save as draft</MenuItem>
      </SplitButtonMenu>
    </SplitButton>
  )
}

export default function SplitButtonPage() {
  return (
    <ComponentDocs
      name="Split Button"
      description="A main action joined to a menu of related ones. Button Group, Button, and Menu composed, with the variant and size set once."
      preview={<PublishDemo />}
      usage={`import { MenuItem } from "@/components/ui/Menu"
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonMenu,
} from "@/components/ui/SplitButton"

<SplitButton>
  <SplitButtonAction onClick={publish}>Publish</SplitButtonAction>
  <SplitButtonMenu label="More publish options">
    <MenuItem onClick={schedule}>Schedule</MenuItem>
    <MenuItem>Save as draft</MenuItem>
  </SplitButtonMenu>
</SplitButton>`}
      extraHeadings={[
        { id: "variants", text: "Variants", level: 2 },
        { id: "when", text: "When to use it", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="variants">Variants</h2>
            <p>
              <code>variant</code>, <code>size</code>, and <code>disabled</code>{" "}
              go on <code>SplitButton</code> and reach both halves. Filled
              variants draw a hairline between them.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <PublishDemo />
              <PublishDemo variant="secondary" />
              <PublishDemo variant="outline" />
            </div>
            <CodeBlock
              code={`<SplitButton variant="secondary">…</SplitButton>
<SplitButton variant="outline">…</SplitButton>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="when">When to use it</h2>
            <p>
              One action is the obvious one and the others are variants of it:
              publish now or later, export as CSV or PDF. When the actions are
              unrelated, use a Menu on its own; when there are two equal choices,
              use two Buttons.
            </p>
          </section>
        </>
      }
    />
  )
}
