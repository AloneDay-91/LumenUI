"use client";

import { ArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function ScrollToTop() {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Back to top"
      onClick={() => {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
    >
      <ArrowUpIcon className="size-4" />
    </Button>
  );
}
