"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
} from "@/components/ui/Tabs"

export default function TabsPage() {
  return (
    <ComponentDocs
      name="Tabs"
      description="Bascule entre des panneaux liés. Construit sur @base-ui/react/tabs."
      preview={
        <Tabs defaultValue="tokens" className="w-64">
          <TabsList>
            <TabsTab value="tokens">Tokens</TabsTab>
            <TabsTab value="cva">CVA</TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanels>
            <TabsPanel value="tokens">Variables CSS sémantiques.</TabsPanel>
            <TabsPanel value="cva">Variants déclaratifs.</TabsPanel>
          </TabsPanels>
        </Tabs>
      }
      usage={`import { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanels, TabsPanel } from "@/components/ui/Tabs"

<Tabs defaultValue="tokens">
  <TabsList>
    <TabsTab value="tokens">Tokens</TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanels>
    <TabsPanel value="tokens">Contenu</TabsPanel>
  </TabsPanels>
</Tabs>`}
    />
  )
}
