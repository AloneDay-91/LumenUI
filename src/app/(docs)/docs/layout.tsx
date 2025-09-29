import React from "react";
import DocsAside from "@/components/docs/DocsAside";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative">
      <div className="flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DocsAside />
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:gap-10">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
