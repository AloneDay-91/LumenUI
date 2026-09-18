"use client"

import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PageIntro, Preview } from "@/components/docs/Preview"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"

export default function SelectPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "select", text: "Select", level: 1 },
          { id: "usage", text: "Utilisation", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          eyebrow="Composants"
          title="Select"
          description="Liste déroulante Base UI. Portal, positioner, clavier. Ce n'est plus un select natif."
        />
        <Preview>
          <div className="grid w-full max-w-sm gap-2">
            <Label htmlFor="framework">Stack</Label>
            <Select defaultValue="next">
              <SelectTrigger id="framework" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="vite">Vite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Preview>
        <section className="space-y-4">
          <h2 id="usage">
            Utilisation
          </h2>
          <CodeBlock
            code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select"

<Select defaultValue="next">
  <SelectTrigger className="w-56">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="next">Next.js</SelectItem>
    <SelectItem value="astro">Astro</SelectItem>
  </SelectContent>
</Select>`}
          />
        </section>
      </div>
    </>
  )
}
