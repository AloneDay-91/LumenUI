import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Button } from "@/components/ui/Button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/ButtonGroup"

export default function ButtonGroupPage() {
  return (
    <ComponentDocs
      name="Button Group"
      description="Joins buttons into a single control. Outer ends keep the pill radius, inner edges square off."
      preview={
        <ButtonGroup>
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      }
      usage={`import { ButtonGroup } from "@/components/ui/ButtonGroup"

<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`}
      extraHeadings={[
        { id: "orientation", text: "Orientation", level: 2 },
        { id: "icons", text: "Icon buttons", level: 2 },
        { id: "separator", text: "Separator", level: 2 },
        { id: "rtl", text: "RTL", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="orientation">Orientation</h2>
            <Preview className="flex-wrap items-start gap-8">
              <ButtonGroup>
                <Button variant="outline">One</Button>
                <Button variant="outline">Two</Button>
              </ButtonGroup>
              <ButtonGroup orientation="vertical">
                <Button variant="outline">One</Button>
                <Button variant="outline">Two</Button>
              </ButtonGroup>
            </Preview>
            <CodeBlock
              code={`<ButtonGroup orientation="vertical">
  <Button variant="outline">One</Button>
  <Button variant="outline">Two</Button>
</ButtonGroup>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="icons">Icon buttons</h2>
            <p>
              A segmented control of icon buttons. Each one still needs its own{" "}
              <code>aria-label</code>, and <code>aria-pressed</code> carries the
              selected state.
            </p>
            <Preview>
              <ButtonGroup>
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Align left"
                  aria-pressed="true"
                >
                  <AlignLeftIcon />
                </Button>
                <Button size="icon" variant="outline" aria-label="Align centre">
                  <AlignCenterIcon />
                </Button>
                <Button size="icon" variant="outline" aria-label="Align right">
                  <AlignRightIcon />
                </Button>
              </ButtonGroup>
            </Preview>
            <CodeBlock
              code={`<ButtonGroup>
  <Button size="icon" variant="outline" aria-label="Align left" aria-pressed>
    <AlignLeftIcon />
  </Button>
  <Button size="icon" variant="outline" aria-label="Align centre">
    <AlignCenterIcon />
  </Button>
</ButtonGroup>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="separator">Separator</h2>
            <p>
              Outline buttons share their borders, so they divide themselves. On
              a filled variant the segments run together — drop a{" "}
              <code>ButtonGroupSeparator</code> between them.
            </p>
            <Preview className="flex-wrap items-center gap-8">
              <ButtonGroup>
                <Button variant="secondary">Copy</Button>
                <ButtonGroupSeparator />
                <Button variant="secondary">Paste</Button>
              </ButtonGroup>
            </Preview>
            <CodeBlock
              code={`<ButtonGroup>
  <Button variant="secondary">Copy</Button>
  <ButtonGroupSeparator />
  <Button variant="secondary">Paste</Button>
</ButtonGroup>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="rtl">RTL</h2>
            <p>
              The end radii are logical, so the group mirrors under{" "}
              <code>dir=&quot;rtl&quot;</code>: the rounded ends stay on the
              outside.
            </p>
            <div
              dir="rtl"
              className="rounded-2xl border border-foreground/5 p-6 dark:border-foreground/10"
            >
              <ButtonGroup>
                <Button variant="outline">يوم</Button>
                <Button variant="outline">أسبوع</Button>
                <Button variant="outline">شهر</Button>
              </ButtonGroup>
            </div>
          </section>
        </>
      }
    />
  )
}
