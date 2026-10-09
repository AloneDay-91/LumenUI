"use client";

import type { ReactNode } from "react";

import { DocsHeader } from "@/components/docs/DocsHeader";
import { ThemeControls } from "@/components/theme/ThemeControls";
import { ThemeDraftProvider } from "@/components/theme/theme-draft";

export function CustomizeShell({ children }: { children: ReactNode }) {
  return (
    <ThemeDraftProvider>
      <div className="flex min-h-dvh flex-col bg-background">
        <DocsHeader />
        <div className="flex min-h-0 w-full flex-1">
          <aside className="sticky top-[calc(var(--update-banner-height)+3.5rem)] hidden h-[calc(100dvh-var(--update-banner-height)-3.5rem)] w-72 shrink-0 flex-col border-r border-border md:flex">
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
              <ThemeControls />
            </div>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="sticky top-[calc(var(--update-banner-height)+3.5rem)] z-30 border-b border-border bg-background">
              <div className="flex h-11 items-center px-4 sm:px-6 lg:px-8">
                <p className="text-xs text-muted-foreground">Customize</p>
              </div>
            </div>
            <main
              id="content"
              className="relative min-h-0 min-w-0 flex-1 overflow-auto bg-background"
            >
              <h1 className="sr-only">Customize</h1>
              {children}
            </main>
          </div>
        </div>
      </div>
    </ThemeDraftProvider>
  );
}
