"use client"

import { CheckIcon, CopyIcon } from "lucide-react"

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/components/ui/DataList"
import { useCopy } from "@/lib/use-copy"

const recordId = "u_2J89JSA4GJ"

const labelColors = ["indigo", "cyan", "orange", "crimson"] as const

function ColorColumn({ highContrast = false }: { highContrast?: boolean }) {
  return (
    <DataList orientation="vertical" className="w-full max-w-xs">
      {labelColors.map((color) => (
        <DataListItem key={color}>
          <DataListLabel color={color} highContrast={highContrast}>
            Name
          </DataListLabel>
          <DataListValue className="capitalize">{color}</DataListValue>
        </DataListItem>
      ))}
    </DataList>
  )
}

const linkClassName = "underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"

function CopyValue({ value }: { value: string }) {
  const { copied, copy } = useCopy()
  const Icon = copied ? CheckIcon : CopyIcon

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      aria-label={copied ? "Copied" : "Copy value"}
      onClick={() => copy(value)}
    >
      <Icon />
    </Button>
  )
}

function RecordList() {
  return (
    <DataList className="w-full max-w-md">
      <DataListItem align="center">
        <DataListLabel minWidth="5.5rem">Status</DataListLabel>
        <DataListValue>
          <Badge color="jade">Authorized</Badge>
        </DataListValue>
      </DataListItem>
      <DataListItem align="center">
        <DataListLabel minWidth="5.5rem">ID</DataListLabel>
        <DataListValue>
          <span className="font-mono text-xs">{recordId}</span>
          <CopyValue value={recordId} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel minWidth="5.5rem">Name</DataListLabel>
        <DataListValue>Ada Lovelace</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel minWidth="5.5rem">Email</DataListLabel>
        <DataListValue>
          <a href="mailto:ada@lumen.studio" className={linkClassName}>
            ada@lumen.studio
          </a>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel minWidth="5.5rem">Company</DataListLabel>
        <DataListValue>
          <a
            href="https://github.com/AloneDay-91/LumenUI"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            Lumen
          </a>
        </DataListValue>
      </DataListItem>
    </DataList>
  )
}

export default function DataListPage() {
  return (
    <ComponentDocs
      name="Data List"
      description="A record as label and value pairs. The label column lines up. A value can be text, a badge, a link, or an action."
      preview={<RecordList />}
      usage={`import { Badge } from "@/components/ui/Badge"
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/components/ui/DataList"

<DataList>
  <DataListItem align="center">
    <DataListLabel minWidth="5.5rem">Status</DataListLabel>
    <DataListValue>
      <Badge color="jade">Authorized</Badge>
    </DataListValue>
  </DataListItem>
  <DataListItem>
    <DataListLabel minWidth="5.5rem">Name</DataListLabel>
    <DataListValue>Ada Lovelace</DataListValue>
  </DataListItem>
  <DataListItem>
    <DataListLabel minWidth="5.5rem">Email</DataListLabel>
    <DataListValue>
      <a href="mailto:ada@lumen.studio">ada@lumen.studio</a>
    </DataListValue>
  </DataListItem>
</DataList>`}
      extraHeadings={[
        { id: "orientation", text: "Orientation", level: 2 },
        { id: "size", text: "Size", level: 2 },
        { id: "color", text: "Color", level: 2 },
      ]}
      extra={
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <h2 id="orientation">Orientation</h2>
            <p>
              Horizontal keeps the label beside the value. Vertical stacks the
              label above it, for a sentence or a narrow column.
            </p>
            <Preview>
              <DataList orientation="vertical" className="w-full max-w-sm">
                <DataListItem>
                  <DataListLabel>Name</DataListLabel>
                  <DataListValue>Ada Lovelace</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Email</DataListLabel>
                  <DataListValue>
                    <a href="mailto:ada@lumen.studio" className={linkClassName}>
                      ada@lumen.studio
                    </a>
                  </DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Company</DataListLabel>
                  <DataListValue>Lumen</DataListValue>
                </DataListItem>
              </DataList>
            </Preview>
            <CodeBlock
              code={`<DataList orientation="vertical">
  <DataListItem>
    <DataListLabel>Email</DataListLabel>
    <DataListValue>
      <a href="mailto:ada@lumen.studio">ada@lumen.studio</a>
    </DataListValue>
  </DataListItem>
</DataList>`}
            />
          </section>

          <section className="flex flex-col gap-4">
            <h2 id="size">Size</h2>
            <p>
              <code>sm</code> tightens the rows. <code>lg</code> raises the
              label to the same size as the value. <code>minWidth</code> on the
              label sets the shared column.
            </p>
            <Preview className="gap-10">
              <DataList size="sm" className="w-full max-w-xs">
                <DataListItem>
                  <DataListLabel>Name</DataListLabel>
                  <DataListValue>Ada Lovelace</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Company</DataListLabel>
                  <DataListValue>Lumen</DataListValue>
                </DataListItem>
              </DataList>
              <DataList size="lg" className="w-full max-w-xs">
                <DataListItem>
                  <DataListLabel>Name</DataListLabel>
                  <DataListValue>Ada Lovelace</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Company</DataListLabel>
                  <DataListValue>Lumen</DataListValue>
                </DataListItem>
              </DataList>
            </Preview>
            <CodeBlock code={`<DataList size="sm">...</DataList>`} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 id="color">Color</h2>
            <p>
              <code>color</code> tints the label. <code>highContrast</code>{" "}
              uses the full ink of that hue. Gray stays the default.
            </p>
            <Preview className="gap-12">
              <ColorColumn />
              <ColorColumn highContrast />
            </Preview>
            <CodeBlock
              code={`<DataList orientation="vertical">
  <DataListItem>
    <DataListLabel color="indigo">Name</DataListLabel>
    <DataListValue>Indigo</DataListValue>
  </DataListItem>
  <DataListItem>
    <DataListLabel color="crimson" highContrast>Name</DataListLabel>
    <DataListValue>Crimson</DataListValue>
  </DataListItem>
</DataList>`}
            />
          </section>
        </div>
      }
    />
  )
}
