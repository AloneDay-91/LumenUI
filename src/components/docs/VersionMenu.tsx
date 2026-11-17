"use client"

import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon } from "lucide-react"

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLinkItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/Menu"
import { docsVersions } from "@/lib/doc-versions"
import { formatDocsVersion } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * The version in the header, as a menu: this site is the latest docs, older
 * minors open their own deployment, or their tag on GitHub until they have one.
 */
export function VersionMenu({ className }: { className?: string }) {
  return (
    <Menu>
      <MenuTrigger
        aria-label={`Docs version ${formatDocsVersion()}. Change version`}
        className={cn(
          "inline-flex h-7 items-center gap-1 rounded-full px-2 font-mono text-[11px] text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 data-popup-open:bg-muted data-popup-open:text-foreground",
          className,
        )}
      >
        {formatDocsVersion()}
        <ChevronDownIcon aria-hidden className="size-3" />
      </MenuTrigger>
      <MenuContent align="end" className="w-56">
        {docsVersions.map((entry) =>
          entry.latest ? (
            <MenuItem key={entry.minor} className="font-mono">
              <span className="flex-1">v{entry.minor}</span>
              <span className="font-sans text-[11px] text-muted-foreground">Latest</span>
              <CheckIcon aria-hidden className="size-3.5" />
            </MenuItem>
          ) : (
            <MenuLinkItem
              key={entry.minor}
              href={entry.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono"
            >
              <span className="flex-1">v{entry.minor}</span>
              <span className="font-sans text-[11px] text-muted-foreground">
                {entry.archived ? "Docs" : "Source"}
              </span>
              <ArrowUpRightIcon aria-hidden className="size-3.5 text-muted-foreground" />
            </MenuLinkItem>
          ),
        )}
        <MenuSeparator />
        <MenuLinkItem href="/docs/changelog">What changed in each version</MenuLinkItem>
      </MenuContent>
    </Menu>
  )
}
