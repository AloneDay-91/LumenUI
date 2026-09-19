"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
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
    <ComponentDocs
      name="Select"
      description="Base UI dropdown. Portal, positioner, keyboard. This is no longer a native select."
      preview={
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
      }
      usage={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select"

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
  )
}
