"use client"

import { useRouter } from "next/navigation"
import { Fragment } from "react"

import { ScrollArea } from "@/components/ui/ScrollArea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import { docsVersions } from "@/lib/doc-versions"
import { cn } from "@/lib/utils"

const latest = docsVersions[0]
const CHANGELOG = "changelog"

/**
 * The docs version, as a Select: this site is the latest docs, older minors
 * open their own deployment, or their tag on GitHub until they have one.
 * The value stays on the latest; picking another version navigates away.
 */
export function VersionMenu({ className }: { className?: string }) {
  const router = useRouter()

  const onValueChange = (value: string | null) => {
    if (!value || value === latest.minor) return
    if (value === CHANGELOG) {
      router.push("/docs/changelog")
      return
    }
    const entry = docsVersions.find((version) => version.minor === value)
    if (entry) window.open(entry.url, "_blank", "noopener,noreferrer")
  }

  return (
    <Select value={latest.minor} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        aria-label="Docs version"
        className={cn("gap-1 text-[11px]", className)}
      >
        <SelectValue>
          {(value: string) => (
            <span>
              <span className="text-muted-foreground">Version: </span>
              <span className="font-mono">{value}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false} className="w-40 min-w-40 p-1">
        <ScrollArea className="h-56">
          <div className="pr-3">
            {docsVersions.map((entry, index) => (
              <Fragment key={entry.minor}>
                {index > 0 && <Separator className="my-1" />}
                <SelectItem value={entry.minor} className="font-mono">
                  <span className="flex-1">{entry.minor}</span>
                  <span className="font-sans text-[11px] text-muted-foreground">
                    {entry.latest ? "Latest" : entry.archived ? "Docs" : "Source"}
                  </span>
                </SelectItem>
              </Fragment>
            ))}
          </div>
        </ScrollArea>
        <Separator className="my-1" />
        <SelectItem value={CHANGELOG}>Changelog</SelectItem>
      </SelectContent>
    </Select>
  )
}
