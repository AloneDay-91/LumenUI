"use client";

import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useToastManager } from "@/components/ui/Toast";
import { useCopy } from "@/lib/use-copy";

const COMMAND = "npx @aloneday/lumenui@latest init";

export function CopyCommand() {
  const { copied, copy } = useCopy();
  const toast = useToastManager();

  async function onClick() {
    const ok = await copy(COMMAND);
    toast.add({
      title: ok ? "Copied" : "Could not copy",
      description: COMMAND,
    });
  }

  return (
    <>
      <Button
        type="button"
        className="w-full max-w-full justify-center gap-2 font-mono sm:w-auto"
        aria-label={`Copy install command: ${COMMAND}`}
        onClick={onClick}
      >
        <span aria-hidden className="text-primary-foreground/60">
          $
        </span>
        <span className="min-w-0 truncate">{COMMAND}</span>
        {copied ? (
          <CheckIcon data-icon="inline-end" className="size-3.5" />
        ) : (
          <CopyIcon data-icon="inline-end" className="size-3.5" />
        )}
      </Button>
      <span className="sr-only" role="status">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}
