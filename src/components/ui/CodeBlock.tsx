"use client"

import * as React from "react"

import { CopyButton } from "@/components/ui/CopyButton"
import { cn } from "@/lib/utils"

/**
 * Code on a muted panel with a header for the file name and a copy button.
 * No highlighter is bundled: pass highlighted nodes as children, or a plain
 * string as `code`. `code` is also what the copy button copies.
 */
function CodeBlock({
  className,
  code,
  title,
  language,
  lineNumbers = false,
  wrap = false,
  maxHeight,
  copyable = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  code: string
  /** File name or label in the header. */
  title?: React.ReactNode
  /** Shown in the header when there is no title. */
  language?: string
  lineNumbers?: boolean
  /** Wrap long lines instead of scrolling sideways. */
  wrap?: boolean
  /** Any CSS length. The body scrolls past it. */
  maxHeight?: string
  copyable?: boolean
}) {
  const label = title ?? language
  const lines = code.replace(/\n$/, "").split("\n")

  return (
    <div
      data-slot="code-block"
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-muted/40 text-xs",
        className
      )}
      {...props}
    >
      {label || copyable ? (
        <div className="flex h-9 items-center justify-between gap-2 border-b border-border ps-3 pe-1.5">
          <span className="min-w-0 truncate font-mono text-[11px] text-muted-foreground">{label}</span>
          {copyable ? <CopyButton value={code} size="icon-xs" label="Copy code" /> : null}
        </div>
      ) : null}
      <pre
        data-slot="code-block-body"
        tabIndex={0}
        className={cn(
          "m-0 overflow-auto p-3 font-mono text-[12px] leading-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:ring-inset",
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
        )}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {children ? (
          children
        ) : lineNumbers ? (
          <code className="grid grid-cols-[auto_1fr] gap-x-4">
            {lines.map((line, index) => (
              <React.Fragment key={index}>
                <span aria-hidden className="text-end text-muted-foreground/60 select-none tabular-nums">
                  {index + 1}
                </span>
                <span>{line || " "}</span>
              </React.Fragment>
            ))}
          </code>
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </div>
  )
}

export { CodeBlock }
