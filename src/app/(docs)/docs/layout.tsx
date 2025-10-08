import React from "react";
import DocsAside from "@/components/docs/DocsAside";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative">
      <div className="flex-1">
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:gap-10">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
