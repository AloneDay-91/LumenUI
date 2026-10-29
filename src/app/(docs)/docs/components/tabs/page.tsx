"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Preview } from "@/components/docs/Preview"
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
      description="Switch between linked panels. Built on @base-ui/react/tabs."
      preview={
        <Tabs defaultValue="tokens" className="w-64">
          <TabsList>
            <TabsTab value="tokens">Tokens</TabsTab>
            <TabsTab value="cva">CVA</TabsTab>
            <TabsIndicator />
          </TabsList>
          <TabsPanels>
            <TabsPanel value="tokens">Semantic CSS variables.</TabsPanel>
            <TabsPanel value="cva">Declarative variants.</TabsPanel>
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
    <TabsPanel value="tokens">Content</TabsPanel>
  </TabsPanels>
</Tabs>`}
      extraHeadings={[
        { id: "line", text: "Line", level: 2 },
        { id: "color", text: "Color", level: 2 },
      ]}
      extra={
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <h2 id="line">Line</h2>
            <p>
              <code>variant=&quot;line&quot;</code> drops the pill. The active
              tab keeps a sliding underline.
            </p>
            <Preview>
              <Tabs defaultValue="account">
                <TabsList variant="line">
                  <TabsTab value="account">Account</TabsTab>
                  <TabsTab value="documents">Documents</TabsTab>
                  <TabsTab value="settings">Settings</TabsTab>
                  <TabsIndicator />
                </TabsList>
                <TabsPanels>
                  <TabsPanel value="account">Make changes to your account.</TabsPanel>
                  <TabsPanel value="documents">
                    Access and update your documents.
                  </TabsPanel>
                  <TabsPanel value="settings">
                    Edit your profile or update contact information.
                  </TabsPanel>
                </TabsPanels>
              </Tabs>
            </Preview>
          </section>
          <section className="flex flex-col gap-4">
            <h2 id="color">Color</h2>
            <p>
              <code>color</code> tints the underline and the active label.{" "}
              <code>highContrast</code> deepens that hue.
            </p>
            <Preview className="flex-col gap-4">
              {(["indigo", "cyan", "orange", "crimson"] as const).map((color) => (
                <Tabs key={color} defaultValue="account">
                  <TabsList variant="line" color={color}>
                    <TabsTab value="account">Account</TabsTab>
                    <TabsTab value="documents">Documents</TabsTab>
                    <TabsTab value="settings">Settings</TabsTab>
                    <TabsIndicator />
                  </TabsList>
                </Tabs>
              ))}
              <Tabs defaultValue="account">
                <TabsList variant="line" color="indigo" highContrast>
                  <TabsTab value="account">Account</TabsTab>
                  <TabsTab value="documents">Documents</TabsTab>
                  <TabsTab value="settings">Settings</TabsTab>
                  <TabsIndicator />
                </TabsList>
              </Tabs>
            </Preview>
          </section>
        </div>
      }
    />
  )
}
