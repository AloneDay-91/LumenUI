"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import DocsNav from "./DocsNav";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>

      {/* Mobile navigation overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Navigation panel */}
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold">Navigation</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="p-4">
              <DocsNav />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
