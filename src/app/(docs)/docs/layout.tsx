import * as React from "react";
import { DocsSidebarNav } from "@/components/docs/DocsSidebarNav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <p className="mb-4 font-semibold text-lg">COMPONENTS</p>
          <DocsSidebarNav />
        </div>
      </aside>
      {children}
    </div>
  );
}
