"use client";

import * as React from "react";

import HeadingsSetter from "@/components/docs/HeadingsSetter";
import type { Heading } from "@/components/docs/DocsTOCContext";
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "@/components/ui/Tabs";

type TabValue = "usage" | "api";

function tabFromHash(hash: string): TabValue {
  const id = hash.replace(/^#/, "");
  if (id === "api" || id.startsWith("api-")) {
    return "api";
  }
  return "usage";
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return "";
}

export function DocsPageTabs({
  usage,
  api,
  usageHeadings,
  apiHeadings,
}: {
  usage: React.ReactNode;
  api: React.ReactNode;
  usageHeadings: Heading[];
  apiHeadings: Heading[];
}) {
  const hash = React.useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  const [picked, setPicked] = React.useState<TabValue | null>(null);
  const [pickedOn, setPickedOn] = React.useState(hash);

  // A hash change (link, back button) wins over the last tab clicked.
  if (pickedOn !== hash) {
    setPickedOn(hash);
    setPicked(null);
  }

  const value = picked ?? tabFromHash(hash);

  const onValueChange = (next: string) => {
    const tab = next === "api" ? "api" : "usage";
    setPicked(tab);
    const current = window.location.hash.replace(/^#/, "");
    if (tab === "api" && !current.startsWith("api")) {
      history.replaceState(null, "", "#api");
    }
    if (tab === "usage" && (current === "api" || current.startsWith("api-"))) {
      history.replaceState(null, "", "#usage");
    }
  };

  return (
    <Tabs value={value} onValueChange={onValueChange} className="gap-6">
      <HeadingsSetter
        headings={value === "api" ? apiHeadings : usageHeadings}
      />
      <TabsList variant="line">
        <TabsIndicator />
        <TabsTab value="usage">Usage</TabsTab>
        <TabsTab value="api">API</TabsTab>
      </TabsList>
      <TabsPanels>
        <TabsPanel value="usage" className="space-y-12 [&_h2:first-child]:mt-0">
          {usage}
        </TabsPanel>
        <TabsPanel value="api" className="[&_h2:first-child]:mt-0">
          {api}
        </TabsPanel>
      </TabsPanels>
    </Tabs>
  );
}
