"use client";

import { ComponentDocs } from "@/components/docs/ComponentDocs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export default function SelectPage() {
  return (
    <ComponentDocs
      name="Select"
      description="Base UI dropdown. Portal, positioner, keyboard. This is no longer a native select."
      preview={
        <div className="grid w-full items-center justify-center gap-2">
          <Select defaultValue="next">
            <SelectTrigger id="framework" className="w-48">
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
  );
}
