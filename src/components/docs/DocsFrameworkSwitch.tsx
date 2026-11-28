"use client";

import { usePathname } from "next/navigation";

import { FrameworkMark } from "@/components/marketing/FrameworkMarks";
import { StackMark } from "@/components/marketing/StackMarks";
import { Tabs, TabsIndicator, TabsList, TabsTab } from "@/components/ui/Tabs";
import { useFramework, type DocsFramework } from "@/lib/use-framework";

const OPTIONS: { value: DocsFramework; label: string }[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

function isDocsFramework(value: unknown): value is DocsFramework {
  return value === "react" || value === "vue";
}

/** Bottom of the docs sidebar: shows component pages in React or Vue. Only on component pages. */
export function DocsFrameworkSwitch() {
  const pathname = usePathname();
  const [framework, setFramework] = useFramework();

  if (!pathname.startsWith("/docs/components")) {
    return null;
  }

  return (
    <div className="shrink-0 border-t border-border px-3 py-3">
      <p
        id="docs-framework-label"
        className="mb-2 text-xs text-muted-foreground"
      >
        Switch framework to see the code in a different language.
      </p>
      <Tabs
        value={framework}
        onValueChange={(value) => {
          if (isDocsFramework(value)) setFramework(value);
        }}
        className="gap-0"
      >
        <TabsList
          variant="line"
          aria-labelledby="docs-framework-label"
          className="w-full"
        >
          <TabsIndicator />
          {OPTIONS.map((option) => (
            <TabsTab
              key={option.value}
              value={option.value}
              className="flex-1 gap-1.5"
            >
              {option.value === "react" ? (
                <StackMark id="react" className="size-3.5" />
              ) : (
                <FrameworkMark id="vue" className="size-3.5" />
              )}
              {option.label}
            </TabsTab>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
