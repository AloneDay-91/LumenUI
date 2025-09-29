import React from "react";
import type { Metadata } from "next";
import DocsNav from "@/components/docs/DocsNav";
import DocsAside from "@/components/docs/DocsAside";
import DocsTOCProvider from "@/components/docs/DocsTOCContext";
import { Header } from "@/components/docs/Header";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-card">
      {/* Header fixe */}
      <Header />

      <div className="flex">
        {/* Left sidebar - Navigation principale */}
        <aside className="hidden md:flex w-64 flex-col bg-card sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            <DocsNav />
          </div>
        </aside>

        {/* Main content area */}
        <DocsTOCProvider>
          <main className="flex-1 min-w-0 border border-border bg-background m-2 rounded-lg">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="docs-prose">{children}</div>
            </div>
          </main>
        </DocsTOCProvider>

        {/* Right sidebar - Table des matières */}
        <aside className="hidden xl:flex w-80 flex-col sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            <DocsAside />
          </div>
        </aside>
      </div>
    </div>
  );
}
