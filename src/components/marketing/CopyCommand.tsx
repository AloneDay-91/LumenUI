"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

const COMMAND = "npx @aloneday/lumenui@latest init";

export function CopyCommand() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-border bg-card py-1.5 ps-4 pe-1.5 font-mono text-xs text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
    >
      <span className="min-w-0 truncate">{COMMAND}</span>
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full">
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
        <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
      </span>
    </button>
  );
}
