"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import {
  BlocksHeaderLinks,
  BlocksHeaderNav,
} from "@/components/blocks/BlocksHeaderNav";
import { KitSelect } from "@/components/blocks/KitProvider";
import { SiteNavMenu } from "@/components/blocks/SiteNavMenu";
import { ThemeControls } from "@/components/theme/ThemeControls";
import { AskLumen } from "@/components/docs/AskLumen";
import { DocsCommandMenu } from "@/components/docs/DocsCommandMenu";
import { DocsContents } from "@/components/docs/DocsContents";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { SiteLogo } from "@/components/marketing/SiteLogo";
import { Button } from "@/components/ui/Button";
import { formatDocsVersion } from "@/lib/site";
import { cn } from "@/lib/utils";

// The blocks registry is heavy: it loads with the blocks menu, not with every docs page.
const BlocksNav = dynamic(() =>
  import("@/components/blocks/BlocksSidebar").then((module) => module.BlocksNav),
);

function HeaderFrame({
  blocks,
  children,
}: {
  blocks: boolean;
  children: React.ReactNode;
}) {
  if (!blocks) return children;
  return <BlocksHeaderNav>{children}</BlocksHeaderNav>;
}

export function DocsHeader() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);
  const pathname = usePathname();
  const blocks = pathname.startsWith("/blocks");
  const customize = pathname === "/customize";

  const [openedOn, setOpenedOn] = React.useState(pathname);

  // Close the mobile nav when the route changes.
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const { body } = document;
    const scrollY = window.scrollY;

    html.setAttribute("data-docs-nav-open", "");
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.removeAttribute("data-docs-nav-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "z-40 border-b border-border bg-background",
        blocks ? "shrink-0" : "sticky top-[var(--update-banner-height)]",
      )}
    >
      <HeaderFrame blocks={blocks}>
        <div className="relative z-10 flex h-14 items-center gap-3 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-expanded={open}
                aria-controls="docs-mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((current) => !current)}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </Button>
              <SiteLogo onClick={close} />
            </div>
            {blocks ? <BlocksHeaderLinks /> : null}
            {blocks ? null : customize ? (
              <span className="hidden text-xs text-muted-foreground md:inline">
                Customize
              </span>
            ) : (
              <span className="hidden text-xs text-muted-foreground lg:inline">
                Documentation
              </span>
            )}
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="mr-1 hidden font-mono text-[11px] text-muted-foreground sm:inline">
              {formatDocsVersion()}
            </span>
            <AskLumen />
            <DocsCommandMenu />
            <SiteNavMenu />
          </div>
        </div>
      </HeaderFrame>
      {open ? (
        <div
          id="docs-mobile-nav"
          className="fixed inset-x-0 top-[calc(var(--update-banner-height)+3.5rem)] bottom-0 z-40 space-y-4 overflow-y-auto overscroll-contain border-t border-border bg-background px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden"
        >
          {blocks ? (
            <>
              <KitSelect className="w-full" />
              <BlocksNav onNavigate={close} />
            </>
          ) : customize ? (
            <ThemeControls onNavigate={close} />
          ) : (
            <>
              <DocsSearch className="max-w-none" />
              <DocsContents onNavigate={close} />
            </>
          )}
        </div>
      ) : null}
    </header>
  );
}
