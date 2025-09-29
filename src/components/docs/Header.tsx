"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo et navigation principale */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <MobileNav />
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-semibold text-lg">Lumen UI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Get Started
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Components
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Guides
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              Reference
            </a>
          </nav>
        </div>

        {/* Actions de droite */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <div className="relative">
              <input
                type="search"
                placeholder="Search documentation..."
                className="w-64 px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0018 10c0-4.42-3.58-8-8-8z" clipRule="evenodd" />
            </svg>
          </Button>

          <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}