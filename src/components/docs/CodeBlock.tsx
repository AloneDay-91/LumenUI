"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { highlight } from "sugar-high"
import { lang } from "sugar-high/lang"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/Card"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const html = React.useMemo(() => {
    const resolved = lang(language) ?? "plaintext"
    return highlight(code.trimEnd(), { lang: resolved })
  }, [code, language])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Card size="sm" className="relative gap-0 overflow-hidden py-0">
      {(filename || language) && (
        <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border py-2">
          <span className="font-mono text-xs text-muted-foreground">
            {filename ?? language}
          </span>
          {filename ? <Badge variant="outline">{language}</Badge> : null}
        </CardHeader>
      )}
      <CardContent className="relative px-0">
        <pre className="docs-code overflow-x-auto p-4 text-xs leading-relaxed">
          <code
            className="font-mono"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </pre>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className={cn("absolute top-2 right-2 size-7 bg-background")}
          title={copied ? "Copié" : "Copier"}
        >
          {copied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
