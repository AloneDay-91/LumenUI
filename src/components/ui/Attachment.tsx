"use client"

import * as React from "react"
import { FileIcon, FileTextIcon, ImageIcon, XIcon } from "lucide-react"

import { formatBytes } from "@/components/ui/FileUpload"
import { cn } from "@/lib/utils"

function AttachmentList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="attachment-list"
      className={cn("m-0 flex list-none flex-wrap gap-1.5 p-0", className)}
      {...props}
    />
  )
}

function TypeIcon({ type }: { type?: string }) {
  if (type?.startsWith("image/")) return <ImageIcon aria-hidden className="size-4" />
  if (type?.startsWith("text/") || type === "application/pdf")
    return <FileTextIcon aria-hidden className="size-4" />
  return <FileIcon aria-hidden className="size-4" />
}

/**
 * A file on its way into a message: a thumbnail for images, an icon for the
 * rest, the name, the size, and a remove button.
 */
function Attachment({
  className,
  name,
  type,
  size,
  previewUrl,
  onRemove,
  removeLabel = `Remove ${name}`,
  ...props
}: Omit<React.ComponentProps<"li">, "children"> & {
  name: string
  /** MIME type. Picks the icon. */
  type?: string
  /** Bytes. */
  size?: number
  /** An object URL or remote URL; images show it as a thumbnail. */
  previewUrl?: string
  onRemove?: () => void
  removeLabel?: string
}) {
  return (
    <li
      data-slot="attachment"
      className={cn(
        "group/attachment relative flex h-10 max-w-56 items-center gap-2 rounded-xl border border-border bg-card ps-1 pe-2 text-xs",
        className
      )}
      {...props}
    >
      <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
        {previewUrl && type?.startsWith("image/") ? (
          // eslint-disable-next-line @next/next/no-img-element -- object URLs, not optimisable
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <TypeIcon type={type} />
        )}
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-medium">{name}</span>
        {size !== undefined ? (
          <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
            {formatBytes(size)}
          </span>
        ) : null}
      </span>
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="absolute -end-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-foreground text-background opacity-0 ring-2 ring-background transition-opacity outline-none group-hover/attachment:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <XIcon className="size-3" />
        </button>
      ) : null}
    </li>
  )
}

export { Attachment, AttachmentList }
