import {
  ChevronDownIcon,
  FrameIcon,
  MousePointerClickIcon,
  PlusIcon,
  SquareTerminalIcon,
  TableIcon,
} from "lucide-react"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { SidebarExamples } from "@/components/docs/SidebarExamples"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible"
import { Separator } from "@/components/ui/Separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/Sidebar"

export default function SidebarPage() {
  return (
    <ComponentDocs
      name="Sidebar"
      description="Collapsible application shell. Expanded, icon, or off-canvas — and a drawer below the md breakpoint."
      previewClassName="overflow-hidden p-0"
      preview={
        <div className="h-112 w-full">
          <SidebarProvider className="h-full min-h-0">
            <Sidebar variant="inset" collapsible="icon">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Studio">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[10px]">LU</AvatarFallback>
                      </Avatar>
                      <span>Studio</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive tooltip="Playground">
                          <SquareTerminalIcon />
                          <span>Playground</span>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#" isActive>
                              History
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#">Starred</SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Components">
                          <FrameIcon />
                          <span>Components</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>56</SidebarMenuBadge>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel
                      className="[&[data-panel-open]>svg]:rotate-180"
                      render={<CollapsibleTrigger />}
                    >
                      Library
                      <ChevronDownIcon className="ml-auto transition-transform" />
                    </SidebarGroupLabel>
                    <CollapsiblePanel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Button">
                              <MousePointerClickIcon />
                              <span>Button</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton tooltip="Table">
                              <TableIcon />
                              <span>Table</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsiblePanel>
                    <SidebarGroupAction aria-label="Add a file">
                      <PlusIcon />
                    </SidebarGroupAction>
                  </SidebarGroup>
                </Collapsible>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Camille R.">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[10px]">CR</AvatarFallback>
                      </Avatar>
                      <span>Camille R.</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
            <SidebarInset>
              <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" />
                <p className="text-sm font-medium">Playground</p>
              </header>
              <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
                Collapse to icons, or press ⌘B.
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      }
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
