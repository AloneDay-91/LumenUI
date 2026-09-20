import { CommandIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { Kbd, KbdGroup } from "@/components/ui/Kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip"

export default function KbdPage() {
  return (
    <ComponentDocs
      name="Kbd"
      description="Keycap for a keyboard shortcut. Mono type, flat surface, no shadow."
      preview={
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      }
      usage={`import { Kbd, KbdGroup } from "@/components/ui/Kbd"

<Kbd>Ctrl</Kbd>`}
      extraHeadings={[
        { id: "composition", text: "Composition", level: 2 },
        { id: "variants", text: "Variants", level: 2 },
        { id: "sizes", text: "Sizes", level: 2 },
        { id: "group", text: "Group", level: 2 },
        { id: "button", text: "Button", level: 2 },
        { id: "tooltip", text: "Tooltip", level: 2 },
        { id: "rtl", text: "RTL", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="composition">Composition</h2>
            <CodeBlock
              language="text"
              code={`Kbd
KbdGroup
├── Kbd
└── Kbd`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="variants">Variants</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Kbd>⌘</Kbd>
              <Kbd variant="outline">⌘</Kbd>
              <Kbd variant="ghost">⌘</Kbd>
            </div>
            <CodeBlock
              code={`<Kbd>⌘</Kbd>
<Kbd variant="outline">⌘</Kbd>
<Kbd variant="ghost">⌘</Kbd>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="sizes">Sizes</h2>
            <p>
              <code>default</code> is <code>h-6</code> at <code>text-xs</code>,
              the same type size as a Button. <code>sm</code> drops to{" "}
              <code>h-5</code> to sit inside dense rows, <code>lg</code> pairs
              with a <code>lg</code> Button. A size set on <code>KbdGroup</code>{" "}
              cascades to the keys it wraps.
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <Kbd size="sm">⌘</Kbd>
              <Kbd>⌘</Kbd>
              <Kbd size="lg">⌘</Kbd>
            </div>
            <p>
              An icon inside a key is sized to the exact value of the text beside
              it, so the two read at the same weight at every size.
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <Kbd size="sm">
                <CommandIcon />K
              </Kbd>
              <Kbd>
                <CommandIcon />K
              </Kbd>
              <Kbd size="lg">
                <CommandIcon />K
              </Kbd>
            </div>
            <CodeBlock
              code={`<Kbd size="sm">⌘</Kbd>
<Kbd>⌘</Kbd>
<Kbd size="lg">⌘</Kbd>

<Kbd>
  <CommandIcon />K
</Kbd>

<KbdGroup size="lg">
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="group">Group</h2>
            <p>
              <code>KbdGroup</code> lays out several keys. Separators stay plain
              text so screen readers read the shortcut, not the decoration.
            </p>
            <div className="flex flex-col gap-3">
              <KbdGroup>
                <Kbd>⇧</Kbd>
                <Kbd>⌘</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </KbdGroup>
              <KbdGroup>
                <Kbd>G</Kbd>
                <span>then</span>
                <Kbd>D</Kbd>
              </KbdGroup>
            </div>
            <CodeBlock
              code={`<KbdGroup>
  <Kbd>⇧</Kbd>
  <Kbd>⌘</Kbd>
  <Kbd>P</Kbd>
</KbdGroup>

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>B</Kbd>
</KbdGroup>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="button">Button</h2>
            <p>
              Inside a Button, use <code>ghost</code>. It tints the Button&apos;s
              own text colour at 10%, so one variant covers every Button:
              dark keys on a light surface, light keys on a dark one. The{" "}
              <code>default</code> variant is for keys standing on the page, not
              on a coloured surface.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline">
                Search
                <Kbd variant="ghost" size="sm">
                  ⌘K
                </Kbd>
              </Button>
              <Button variant="secondary">
                Save
                <KbdGroup size="sm">
                  <Kbd variant="ghost">⌘</Kbd>
                  <Kbd variant="ghost">S</Kbd>
                </KbdGroup>
              </Button>
              <Button>
                Send
                <KbdGroup size="sm">
                  <Kbd variant="ghost">⌘</Kbd>
                  <Kbd variant="ghost">↵</Kbd>
                </KbdGroup>
              </Button>
            </div>
            <CodeBlock
              code={`<Button variant="outline">
  Search
  <Kbd variant="ghost" size="sm">⌘K</Kbd>
</Button>

<Button variant="secondary">
  Save
  <KbdGroup size="sm">
    <Kbd variant="ghost">⌘</Kbd>
    <Kbd variant="ghost">S</Kbd>
  </KbdGroup>
</Button>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="tooltip">Tooltip</h2>
            <p>
              A tooltip is the usual place to surface the shortcut of an icon
              button. The popup surface sits close to <code>secondary</code>, so
              the default key would vanish on it — <code>ghost</code> tints the
              popup&apos;s own text colour instead.
            </p>
            <div className="flex justify-center rounded-2xl border border-foreground/5 p-6 dark:border-foreground/10">
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>
                  Search
                </TooltipTrigger>
                <TooltipContent className="flex items-center gap-2">
                  Search the docs
                  <Kbd variant="ghost" size="sm">
                    ⌘K
                  </Kbd>
                </TooltipContent>
              </Tooltip>
            </div>
            <CodeBlock
              code={`<Tooltip>
  <TooltipTrigger render={<Button variant="outline" />}>Search</TooltipTrigger>
  <TooltipContent className="flex items-center gap-2">
    Search the docs
    <Kbd variant="ghost" size="sm">⌘K</Kbd>
  </TooltipContent>
</Tooltip>`}
            />
          </section>

          <section className="space-y-4">
            <h2 id="rtl">RTL</h2>
            <p>
              Both parts lay out with flex and logical spacing, so a{" "}
              <code>dir=&quot;rtl&quot;</code> ancestor mirrors them without any
              extra class.
            </p>
            <div
              dir="rtl"
              className="rounded-2xl border border-foreground/5 p-6 dark:border-foreground/10"
            >
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </KbdGroup>
            </div>
            <CodeBlock
              code={`<div dir="rtl">
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <span>+</span>
    <Kbd>B</Kbd>
  </KbdGroup>
</div>`}
            />
          </section>
        </>
      }
    />
  )
}
