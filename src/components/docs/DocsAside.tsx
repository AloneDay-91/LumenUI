"use client";
import React from "react";
import { useDocsTOC } from "./DocsTOCContext";

export default function DocsAside() {
  const { headings } = useDocsTOC();

  return (
    <div className="space-y-6">
      {/* Table des matières */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">On this page</h3>
        <nav className="space-y-2">
          {headings && headings.length > 0 ? (
            headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`block text-sm text-muted-foreground hover:text-foreground transition-colors ${
                  heading.level === 1 ? "ml-0" : "ml-4"
                } py-1`}
              >
                {heading.text}
              </a>
            ))
          ) : (
            <>
              <a href="#introduction" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                Introduction
              </a>
              <a href="#who-should-use" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                Who should use Medusa
              </a>
              <a href="#quick-start" className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                Quick start
              </a>
            </>
          )}
        </nav>
      </div>

      {/* Actions rapides */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick actions</h3>
        <div className="space-y-3">
          <button className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit this page
          </button>
          <button className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View source
          </button>
          <button className="flex items-center w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ask AI Assistant
          </button>
        </div>
      </div>

      {/* Informations contextuelles */}
      <div className="p-4 bg-card rounded-lg border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0018 10c0-4.42-3.58-8-8-8z" clipRule="evenodd" />
            </svg>
            GitHub Repository
          </a>
          <a href="#" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Community Discord
          </a>
          <a href="#" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            API Reference
          </a>
        </div>
      </div>

      {/* Version et statut */}
      <div className="text-xs text-muted-foreground border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span>Version 1.0.0</span>
          <div className="flex items-center">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}
