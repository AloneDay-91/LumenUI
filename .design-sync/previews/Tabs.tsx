import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsPanels, TabsTab } from "lumen-ui"

export const Default = () => (
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
)

export const Line = () => (
  <Tabs defaultValue="account">
    <TabsList variant="line">
      <TabsTab value="account">Account</TabsTab>
      <TabsTab value="documents">Documents</TabsTab>
      <TabsTab value="settings">Settings</TabsTab>
      <TabsIndicator />
    </TabsList>
    <TabsPanels>
      <TabsPanel value="account">Make changes to your account.</TabsPanel>
      <TabsPanel value="documents">Access and update your documents.</TabsPanel>
      <TabsPanel value="settings">Edit your profile or update contact information.</TabsPanel>
    </TabsPanels>
  </Tabs>
)

export const Color = () => (
  <div className="flex flex-col gap-4">
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
  </div>
)
