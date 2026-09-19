"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, Maximize2Icon } from "lucide-react"
import { highlight } from "sugar-high"
import { lang } from "sugar-high/lang"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/Card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { cn } from "@/lib/utils"

const COLLAPSE_AFTER_LINES = 16

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const source = code.trimEnd()
  const html = React.useMemo(() => {
    const resolved = lang(language) ?? "plaintext"
    return highlight(source, { lang: resolved })
  }, [source, language])
  const lineCount = source.split("\n").length
  const collapsible = lineCount > COLLAPSE_AFTER_LINES
  const label = filename ?? language

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <Card size="sm" className="relative gap-0 overflow-hidden py-0">
        <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border py-2">
          <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
            {label}
          </span>
          <div className="flex items-center gap-1.5">
            {filename ? <Badge variant="outline">{language}</Badge> : null}
            {collapsible ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpen(true)}
                className="size-7 bg-background"
                title="Open larger"
              >
                <Maximize2Icon className="size-3.5" />
                <span className="sr-only">Open larger</span>
              </Button>
            ) : null}
            <CopyButton copied={copied} onCopy={copyToClipboard} />
          </div>
        </CardHeader>
        <CardContent className="relative px-0">
          <div
            className={cn(
              "relative",
              collapsible && "max-h-72 overflow-hidden"
            )}
          >
            <HighlightedCode html={html} />
            {collapsible ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-28 items-end justify-center bg-linear-to-t from-card via-card/85 to-transparent pb-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-auto bg-background"
                  onClick={() => setOpen(true)}
                >
                  Show more
                </Button>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {collapsible ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="flex max-h-[min(85dvh,52rem)] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl"
          >
            <DialogHeader className="flex flex-row items-center justify-between gap-3 border-b border-border px-4 py-3 pr-12">
              <DialogTitle className="min-w-0 truncate font-mono text-xs font-normal text-muted-foreground">
                {label}
              </DialogTitle>
              <CopyButton copied={copied} onCopy={copyToClipboard} />
            </DialogHeader>
            <div className="min-h-0 flex-1 overflow-auto">
              <HighlightedCode html={html} className="p-5 text-[13px]" />
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  )
}

function HighlightedCode({
  html,
  className,
}: {
  html: string
  className?: string
}) {
  return (
    <pre className={cn("docs-code overflow-x-auto p-4 text-xs leading-5", className)}>
      <code
        className="font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  )
}

function CopyButton({
  copied,
  onCopy,
}: {
  copied: boolean
  onCopy: () => void
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onCopy}
      className="size-7 shrink-0 bg-background"
      title={copied ? "Copied" : "Copy"}
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
    </Button>
  )
}
