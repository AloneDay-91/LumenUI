"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { getLatestChangelog } from "@/lib/changelog";
import { formatDocsVersion } from "@/lib/site";
import { dismissUpdateBanner } from "@/lib/update-banner";

export function UpdateBanner() {
  const pathname = usePathname();
  const release = getLatestChangelog();

  useEffect(() => {
    if (pathname === "/docs/changelog") {
      dismissUpdateBanner(release.version);
    }
  }, [pathname, release.version]);

  return (
    <div
      data-slot="update-banner"
      className="sticky top-0 z-90 border-b border-border bg-muted text-xs backdrop-blur-sm"
    >
      <div className="relative flex h-9 items-center justify-center gap-2 px-10">
        <span className="size-1.5 shrink-0 rounded-full bg-new" aria-hidden />
        <p className="min-w-0 truncate text-center">
          <span className="font-medium text-foreground">
            {formatDocsVersion(release.version)} is out
          </span>
          <span className="hidden text-muted-foreground sm:inline">
            {" — "}
            {release.summary}
          </span>
        </p>
        <Link
          href="/docs/changelog"
          onClick={() => dismissUpdateBanner(release.version)}
          className="shrink-0 font-medium text-foreground underline-offset-4 hover:underline"
        >
          Changelog
        </Link>
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
          aria-label="Dismiss update banner"
          onClick={() => dismissUpdateBanner(release.version)}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
