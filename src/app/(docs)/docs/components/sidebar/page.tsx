import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { SidebarExamples, SidebarHeroDemo } from "@/components/docs/SidebarExamples"

export default function SidebarPage() {
  return (
    <ComponentDocs
      name="Sidebar"
      description="Collapsible application shell. Expanded, icon, or off-canvas — and a drawer below the md breakpoint."
      previewClassName="flex-col items-stretch gap-4"
      preview={<SidebarHeroDemo />}
      usage={`import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/Sidebar"

<SidebarProvider>
  <Sidebar variant="inset" collapsible="icon">
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Playground">
              <span>Playground</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>`}
      extraHeadings={[
        { id: "variants", text: "Variants", level: 2 },
        { id: "collapsible", text: "Collapsible", level: 2 },
        { id: "expand-on-hover", text: "Expand on hover", level: 2 },
        { id: "side", text: "Side", level: 2 },
        { id: "header", text: "Header", level: 2 },
        { id: "footer", text: "Footer", level: 2 },
        { id: "group", text: "Group", level: 2 },
        { id: "collapsible-group", text: "Collapsible group", level: 2 },
        { id: "menu", text: "Menu", level: 2 },
        { id: "menu-action", text: "Menu action", level: 2 },
        { id: "submenu", text: "Submenu", level: 2 },
        { id: "badge", text: "Badge", level: 2 },
        { id: "skeleton", text: "Skeleton", level: 2 },
        { id: "separator", text: "Separator", level: 2 },
        { id: "controlled", text: "Controlled", level: 2 },
        { id: "width", text: "Width", level: 2 },
      ]}
      extra={<SidebarExamples />}
    />
  )
}
