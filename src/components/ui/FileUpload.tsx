"use client"

import * as React from "react"
import { FileIcon, UploadIcon, XIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

type FileRejection = { file: File; reason: "type" | "size" }

function matchesAccept(file: File, accept?: string) {
  if (!accept) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith(".")) return name.endsWith(rule)
      if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
      return type === rule
    })
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const units = ["KB", "MB", "GB"]
  let size = bytes / 1024
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit += 1
  }
  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unit]}`
}

function FileUpload({
  className,
  accept,
  multiple = false,
  maxSize,
  disabled,
  name,
  id,
  onFilesChange,
  onReject,
  children,
  ...props
}: Omit<React.ComponentProps<"label">, "onChange"> & {
  accept?: string
  multiple?: boolean
  /** Largest accepted file, in bytes. */
  maxSize?: number
  disabled?: boolean
  name?: string
  onFilesChange?: (files: File[]) => void
  onReject?: (rejections: FileRejection[]) => void
}) {
  const [dragging, setDragging] = React.useState(false)
  const depth = React.useRef(0)

  function handle(list: FileList | null) {
    if (!list || disabled) return
    const accepted: File[] = []
    const rejected: FileRejection[] = []
    for (const file of Array.from(list)) {
      if (!matchesAccept(file, accept)) rejected.push({ file, reason: "type" })
      else if (maxSize !== undefined && file.size > maxSize)
        rejected.push({ file, reason: "size" })
      else accepted.push(file)
    }
    const files = multiple ? accepted : accepted.slice(0, 1)
    if (files.length > 0) onFilesChange?.(files)
    if (rejected.length > 0) onReject?.(rejected)
  }

  return (
    <label
      data-slot="file-upload"
      data-dragging={dragging ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      onDragEnter={(event) => {
        event.preventDefault()
        depth.current += 1
        if (!disabled) setDragging(true)
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => {
        depth.current -= 1
        if (depth.current <= 0) {
          depth.current = 0
          setDragging(false)
        }
      }}
      onDrop={(event) => {
        event.preventDefault()
        depth.current = 0
        setDragging(false)
        handle(event.dataTransfer.files)
      }}
      className={cn(
        "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[min(var(--radius-4xl),24px)] border border-dashed border-border bg-input/20 px-6 py-8 text-center text-xs text-muted-foreground transition-colors",
        "hover:bg-input/40 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/30",
        "data-dragging:border-ring data-dragging:bg-input/50",
        "data-disabled:pointer-events-none data-disabled:opacity-50 dark:bg-input/10",
        className
      )}
      {...props}
    >
      <input
        id={id}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(event) => {
          handle(event.target.files)
          event.target.value = ""
        }}
      />
      {children ?? (
        <>
          <UploadIcon aria-hidden className="size-5 text-foreground" />
          <span>
            <span className="font-medium text-foreground">Click to upload</span>{" "}
            or drag and drop
          </span>
        </>
      )}
    </label>
  )
}

function FileUploadList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="file-upload-list"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function FileUploadItem({
  className,
  file,
  onRemove,
  removeLabel = `Remove ${file.name}`,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  file: File
  onRemove?: () => void
  removeLabel?: string
}) {
  return (
    <li
      data-slot="file-upload-item"
      className={cn(
        "flex items-center gap-2.5 rounded-2xl bg-card px-3 py-2 text-xs ring-1 ring-foreground/5 dark:ring-foreground/10",
        className
      )}
      {...props}
    >
      <FileIcon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1 truncate font-medium">{file.name}</span>
      <span className="shrink-0 font-mono text-muted-foreground tabular-nums">
        {formatBytes(file.size)}
      </span>
      {children}
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-xs" }),
            "text-muted-foreground hover:text-foreground"
          )}
        >
          <XIcon />
        </button>
      ) : null}
    </li>
  )
}

export { FileUpload, FileUploadList, FileUploadItem, formatBytes }
export type { FileRejection }
